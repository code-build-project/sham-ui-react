import styles from 'components/common/CheckBox/styles.module.sass';

type Props = {
    className?: string,
    value?: boolean,
    keyField: string,
    children?: string,
    updateValue?: (value: boolean) => void,
}

function CheckBox(prevProps: Props): JSX.Element {
    const props = {
        value: false,
        children: 'Название флажка',
        updateValue: () => {},
        ...prevProps,
    };

    const updateValue = (value: boolean): void => {
        props.updateValue(value);
    };

    return (
        <div className={`${styles['checkbox']} ${props.className}`}>
            <input
                className={styles['input']}
                id={props.keyField}
                type="checkbox"
                checked={props.value}
                onChange={() => updateValue(!props.value)}
            />

            <label
                className={styles['label']}
                htmlFor={props.keyField}
            />

            <div className={styles['name']}>
                {props.children}
            </div>
        </div>
    );
}

export default CheckBox;