import styles from 'components/UI/Tabs/styles.module.sass';

type Props = {
    value?: string,
    tabs: { id: string, title: string }[],
    isColumn?: boolean,
    children?: { [name: string]: (value: string) => string },
    updateValue?: (value: string) => void,
}

function Tabs(prevProps: Props): JSX.Element {
    const props = {
        value: '',
        isColumn: false,
        children: {},
        updateValue: () => {},
        ...prevProps,
    };

    const componentClasses = `
        ${styles['tabs']}
        ${props.isColumn && styles['tabs-column']}
    `;

    const getActiveClass = (id: string) => {
        return `
            ${styles['tab']}
            ${props.value === id && styles['tab-active']}
        `;
    };

    const setActiveTab = (tab: string) => {
        props.updateValue(tab);
    };

    return (
        <div className={componentClasses}>
            {props.tabs.map(tab =>
                <div
                    className={getActiveClass(tab.id)}
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                >
                    {
                        (props.children[tab.id] && props.children[tab.id](tab.title)) || tab.title
                    }
                </div>,
            )}
        </div>
    );
}

export default Tabs;