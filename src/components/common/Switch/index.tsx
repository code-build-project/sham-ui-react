import { useMemo } from 'react';
import styles from 'components/common/Switch/styles.module.sass';

type Props = {
    className?: string,
    value?: boolean,
    keyField: string,
    children?: string,
    updateValue?: (value: boolean) => void,
}

function Switch(prevProps: Props): JSX.Element {
    const props = {
        value: false,
        children: 'Название радиокнопки',
        updateValue: () => {},
        ...prevProps,
    };

    const updateValue = (value: boolean): void => {
        props.updateValue(value);
    };

    const componentClasses = useMemo(() => {
        return props.value ? 'input_checked' : '';
    }, [props.value]);

    return (
        <div className={props.className}>
            <div className={styles['title']}>
                {props.children}
            </div>

            <input
                className={`${styles['input']} ${styles[componentClasses]}`}
                id={props.keyField}
                type="checkbox"
                checked={props.value}
                onChange={() => updateValue(!props.value)}
            />

            <label
                className={styles['label']}
                htmlFor={props.keyField}
            />
        </div>
    );
}

export default Switch;