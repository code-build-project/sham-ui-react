import styles from 'components/common/RadioButton/styles.module.sass';

interface TypeRadio {
    id: string | number,
    name: string,
}

type Props = {
    className?: string,
    modelValue?: number | string,
    radioList?: TypeRadio[],
    keyField: string,
    children?: string,
    updateValue?: (value: number | string) => void,
}
 
const defaultProps: Props = {
    modelValue: '',
    radioList: [],
    keyField: '',
    children: 'Название радиокнопки',
};

function RadioButton(prevProps: Props): JSX.Element {
    const props = { ...defaultProps, ...prevProps };

    const updateValue = (value: number | string): void => {
        props.updateValue?.(value);
    };

    return (
        <div className={props.className}>
            <div className={styles['title']}>
                {props.children}
            </div>

            <div className={styles['button-group']}>
                {props.radioList?.map(item =>
                    <div
                        className={styles['button']}
                        key={props.keyField + item.id}
                    >
                        <input
                            className={styles['input']}
                            id={props.keyField + item.id}
                            type="radio"
                            value={item.id}
                            checked={props.modelValue === item.id}
                            name={props.keyField + item.id}
                            onChange={() => updateValue(item.id)}
                        />

                        <label
                            className={styles['label']}
                            htmlFor={props.keyField + item.id}
                        />

                        <div
                            className={styles['name']}
                            onClick={() => updateValue(item.id)}
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