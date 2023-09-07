import React from 'react';
import Input from 'components/common/Input';
import { ReactComponent as IconClearField } from 'assets/icons/clearField.svg';
import styles from 'components/UI/TextField/styles.module.sass';
import formatters from 'helpers/formatters';

type Props = {
    className?: string,
    value?: number | string,
    label?: string,
    type?: string,
    placeholder?: string,
    isDisabled?: boolean,
    isReadonly?: boolean,
    maxlength?: number,
    autocomplete?: string,
    size?: string,
    variant?: string,
    isError?: boolean,
    message?: string,
    isClearable?: boolean,
    isPassword?: boolean,
    format?: string,
    children?: string,
    onFocus?: () => void,
    onBlur?: () => void,
    onInput?: (event: React.ChangeEvent) => void,
    updateValue?: (value: number | string) => void,
}

function TextField(prevProps: Props): JSX.Element {
    const props = {
        value: '',
        label: '',
        type: 'text',
        placeholder: '',
        isDisabled: false,
        isReadonly: false,
        maxlength: undefined,
        autocomplete: 'on',
        size: 'medium',
        variant: 'default',
        isError: false,
        message: '',
        isClearable: false,
        isPassword: false,
        format: '',
        children: '',
        onFocus: () => {},
        onBlur: () => {},
        onInput: () => {},
        updateValue: () => {},
        ...prevProps,
    };

    const componentClasses = `
        ${styles['size-'+ props.size]}
        ${styles['variant-'+ props.variant]}
        ${props.isError && styles['error']}
    `;

    // BLOCK "label"
    const isLabel = props.children || props.label;

    // BLOCK "input"
    const onInput = (event: React.ChangeEvent) => {
        const target = event.target as HTMLInputElement;

        if (props.format) {
            target.value = formatters[props.format](target.value);
        }

        props.updateValue(target.value);
        props.onInput(event);
    };

    // BLOCK "clear"
    const isIconClear = props.isClearable && !!props.value;

    const clearField = () => {
        props.updateValue('');
    };

    return (
        <div className={`${styles['input-wrap']} ${props.className}`}>
            {isLabel &&
                <div className={styles['label']}>
                    {props.children || props.label}
                </div>
            }

            <Input
                className={componentClasses}
                value={props.value}
                type={props.isPassword ? 'password' : props.type}
                placeholder={props.placeholder}
                isDisabled={props.isDisabled}
                isReadonly={props.isReadonly}
                maxlength={props.maxlength}
                onBlur={props.onBlur}
                onFocus={props.onFocus}
                onInput={onInput}
            >
                {{ right: isIconClear &&
                    <IconClearField
                        className={styles['icon']}
                        onClick={clearField}
                    />,
                }}
            </Input>

            {props.message &&
                <div className={styles['message']}>
                    {props.message}
                </div>
            }
        </div>
    );
}

export default TextField;