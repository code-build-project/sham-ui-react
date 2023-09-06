import styles from 'components/UI/RadioButton/styles.module.sass';

interface TypeRadio {
    id: string | number,
    name: string,
}

type Props = {
    className?: string,
    value?: number | string,
    keyField: string,
    radioList?: TypeRadio[],
    label?: string,
    isColumn?: boolean,
    children?: string,
    updateValue?: (value: number | string) => void,
}

function RadioButton(prevProps: Props): JSX.Element {
    const props = {
        value: '',
        radioList: [],
        label: '',
        isColumn: false,
        children: '',
        updateValue: () => {},
        ...prevProps,
    };

    const componentClasses = `
        ${styles['button-group']}
        ${props.isColumn && styles['group-column']}
    `;

    const setRadio = (value: number | string) => {
        props.updateValue(value);
    };

    // BLOCK "label"
    const isLabel = props.children || props.label;

    return (
        <div className={styles['radio']}>
            {isLabel &&
                <div className={styles['label']}>
                    {props.children || props.label}
                </div>
            }

            <div className={componentClasses}>
                {props.radioList.map(item =>
                    <div
                        className={styles['button']}
                        key={props.keyField + item.id}
                    >
                        <input
                            className={styles['input-field']}
                            id={props.keyField + item.id}
                            type="radio"
                            value={item.id}
                            checked={props.value === item.id}
                            name={props.keyField + item.id}
                            onChange={() => setRadio(item.id)}
                        />

                        <label
                            className={styles['input-label']}
                            htmlFor={props.keyField + item.id}
                        />

                        <div
                            className={styles['name']}
                            onClick={() => setRadio(item.id)}
                        >
                            {item.name}
                        </div>
                    </div>,
                )}
            </div>
        </div>
    );
}

export default RadioButton;