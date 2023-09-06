import styles from 'components/UI/Table/styles.module.sass';

type Props = {
    headers: { id: string, title: string }[],
    items: { [name: string]: string }[],
    height?: string,
    children?: { [name: string]: (value: string) => string },
}

function Table(prevProps: Props): JSX.Element {
    const props = {
        height: '',
        children: {},
        ...prevProps,
    };

    return (
        <div
            className={styles['table-wrap']}
            style={{ height: props.height }}
        >
            <table className={styles['table']}>
                <thead className={styles['header']}>
                    <tr className={styles['header-row']}>
                        {props.headers.map(header =>
                            <th
                                className={styles['header-item']}
                                key={header.id}
                            >
                                {header.title}
                            </th>,
                        )}
                    </tr>
                </thead>

                <tbody className={styles['body']}>
                    {props.items.map(item =>
                        <tr
                            className={styles['body-row']}
                            key={item.id}
                        >
                            {props.headers.map(header =>
                                <td
                                    className={styles['body-column']}
                                    key={header.id + 'column'}
                                >
                                    {
                                        (props.children[header.id] && props.children[header.id](item[header.id])) ||
                                            item[header.id]
                                    }
                                </td>,
                            )}
                        </tr>,
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table;