import React from 'react';
import styles from 'components/UI/Checkbox/styles.module.sass';

type Props = {
    className?: string,
    value?: boolean,
    keyField: string,
    isDisabled?: boolean,
    size?: string,
    children?: string,
    updateValue?: (value: boolean) => void,
}

function Checkbox(prevProps: Props): JSX.Element {
    const props = {
        value: false,
        isDisabled: false,
        size: 'medium',
        children: 'Button',
        updateValue: () => {},
        ...prevProps,
    };

    const componentClasses = `
        ${styles['checkbox']}
        ${styles['size-' + props.size]}
        ${props.isDisabled && styles['disabled']}
    `;
    
    const onChecked = (event: React.MouseEvent | React.ChangeEvent) => {
        event.preventDefault();

        if (props.isDisabled) {
            return;
        }

        props.updateValue(!props.value);
    };

    return (
        <div
            className={componentClasses}
            onClick={onChecked}
        >
            <input
                className={styles['input']}
                id={props.keyField}
                type="checkbox"
                checked={props.value}
                disabled={props.isDisabled}
                onChange={onChecked}
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

export default Checkbox;