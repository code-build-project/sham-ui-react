import React, { useState, useMemo, useRef } from 'react';
import styles from 'components/common/Input/styles.module.sass';

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

type Props = {
    className?: string,
    value?: number | string,
    type?: string,
    placeholder?: string,
    isDisabled?: boolean,
    isReadonly?: boolean,
    maxlength?: number,
    autocomplete?: string,
    children?: { left?: React.ReactNode, right?: React.ReactNode },
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    onFocus?: () => void,
    onBlur?: () => void,
    onInput?: (event: InputChangeEvent) => void,
    updateValue?: (value: number | string) => void,
}
 
const defaultProps: Props = {
    value: '',
    type: 'text',
    placeholder: '',
    isDisabled: false,
    isReadonly: false,
    maxlength: undefined,
    autocomplete: 'on',
};

function Input(prevProps: Props): JSX.Element {
    const props = { ...defaultProps, ...prevProps };

    // BLOCK "focus and blur"
    const [isFocus, setFocus] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const clickInput = () => {
        inputRef.current?.focus();
    };

    const onFocus = () => {
        setFocus(true);
        props.onFocus?.();
    };

    const onBlur = () => {
        setFocus(false);
        props.onBlur?.();
    };

    // BLOCK "input"
    const inputClasses = useMemo(() => {
        const focusClass = isFocus ? 'input_focused' : '';
        const disabledClass = props.isDisabled ? 'input_focused' : '';

        return focusClass + disabledClass;
    }, [isFocus, props.isDisabled]);

    const onInput = (event: InputChangeEvent): void => {
        props.onInput?.(event);
        props.updateValue?.(event.target.value);
    };

    return (
        <div
            className={`${styles['input']} ${styles[inputClasses]} ${props.className}`}
            onClick={clickInput}
        >
            {props.children?.left}

            <input
                className={styles['field']}
                ref={inputRef}
                value={props.value}
                type={props.type}
                placeholder={props.placeholder}
                readOnly={props.isReadonly}
                maxLength={props.maxlength}
                autoComplete={props.autocomplete}
                onFocus={onFocus}
                onBlur={onBlur}
                onInput={onInput}
            />

            {props.children?.right}

        </div>
    );
}

export default Input;