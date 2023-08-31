import React, { useState } from 'react';
import Input from 'components/common/Input';
import { ReactComponent as IconClearField } from 'assets/icons/clearField.svg';
import styles from 'components/UI/Autocomplete/styles.module.sass';

type Props = {
    className?: string,
    value?: string,
    label?: string,
    placeholder?: string,
    isDisabled?: boolean,
    isClearable?: boolean,
    message?: string,
    size?: string,
    variant?: string,
    isError?: boolean,
    isListWithoutValue?: boolean,
    options?: string[],
    children?: string,
    onFocus?: () => void,
    onBlur?: () => void,
    updateValue?: (value: number | string) => void,
}

function Autocomplete(prevProps: Props): JSX.Element {
    const props = {
        value: '',
        label: '',
        placeholder: '',
        isDisabled: false,
        isClearable: false,
        message: '',
        size: 'medium',
        variant: 'default',
        isError: false,
        isListWithoutValue: true,
        options: [],
        children: '',
        onFocus: () => {},
        onBlur: () => {},
        updateValue: () => {},
        ...prevProps,
    };

    const componentClasses = `
        ${styles['size-' + props.size]}
        ${styles['variant-' + props.variant]}
        ${props.isError && styles['error']}
    `;

    const updateValue = (value: number | string): void => {
        props.updateValue(value);
    };

    // BLOCK "label"
    const isLabel = props.children || props.label;

    // BLOCK "focus and blur"
    const [isFocus, setFocus] = useState<boolean>(false);

    const onFocus = () => {
        setFocus(true);
        props.onFocus();
    };

    const onBlur = () => {
        setTimeout(() => {
            setFocus(false);
            props.onBlur();
        }, 100);
    };

    // BLOCK "list"
    const filteredOptions = props.options.filter((option) => {
        return option.toUpperCase().startsWith(props.value.toUpperCase());
    });

    const isShowList = (() => {
        if (props.isListWithoutValue) {
            return !!(isFocus && filteredOptions.length);
        } else {
            return !!(isFocus && filteredOptions.length && props.value);
        }
    })();

    // BLOCK "clear"
    const isIconClear = props.isClearable && props.value;

    const clearField = (event: React.MouseEvent) => {
        event.stopPropagation();
        updateValue('');
    };

    return (
        <div className={`${styles['autocomplete']} ${props.className}`}>
            {isLabel &&
                <div className={styles['label']}>
                    {props.children || props.label}
                </div>
            }

            <Input
                className={componentClasses}
                value={props.value}
                placeholder={props.placeholder}
                isDisabled={props.isDisabled}
                onBlur={onBlur}
                onFocus={onFocus}
                updateValue={updateValue}
            >
                {{ right: isIconClear &&
                    <IconClearField
                        className={styles['icon-clear']}
                        onClick={clearField}
                    />,
                }}
            </Input>

            {props.message &&
                <div className={styles['message']}>
                    {props.message}
                </div>
            }

            {isShowList &&
                <ul className={styles['list']}>
                    {filteredOptions.map((option, index) =>
                        <li
                            className={styles['item']}
                            key={option + index}
                            onClick={() => updateValue(option)}
                        >
                            {option}
                        </li>,
                    )}
                </ul>
            }
        </div>
    );
}

export default Autocomplete;