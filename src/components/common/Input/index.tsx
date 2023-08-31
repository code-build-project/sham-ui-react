import React, { useState, useRef } from 'react';
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
    onClick?: React.MouseEventHandler,
    onFocus?: () => void,
    onBlur?: () => void,
    onInput?: (event: InputChangeEvent) => void,
    updateValue?: (value: number | string) => void,
}

function Input(prevProps: Props): JSX.Element {
    const props = {
        value: '',
        type: 'text',
        placeholder: '',
        isDisabled: false,
        isReadonly: false,
        maxlength: undefined,
        autocomplete: 'on',
        onFocus: () => {},
        onBlur: () => {},
        onInput: () => {},
        updateValue: () => {},
        ...prevProps,
    };

    // BLOCK "focus and blur"
    const [isFocus, setFocus] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const clickInput = () => {
        inputRef.current?.focus();
    };

    const onFocus = () => {
        setFocus(true);
        props.onFocus();
    };

    const onBlur = () => {
        setFocus(false);
        props.onBlur();
    };

    // BLOCK "input"
    const inputClasses = `
        ${styles['input']}
        ${isFocus && styles['input_focused']}
        ${props.isDisabled && styles['disabled']}
        ${props.className}
    `;

    const onInput = (event: InputChangeEvent): void => {
        props.onInput(event);
        props.updateValue(event.target.value);
    };

    return (
        <div
            className={inputClasses}
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