import React, { useState } from 'react';
import Input from 'components/common/Input';
import CheckBox from 'components/common/CheckBox';
import { ReactComponent as IconClearField } from 'assets/icons/clearField.svg';
import { ReactComponent as IconChevron } from 'assets/icons/chevron.svg';
import styles from 'components/UI/Select/styles.module.sass';
import type { TypeOption } from 'components/UI/Select/types';

type TypeModelValue = string | string[];

type Props = {
    className?: string,
    value?: TypeModelValue,
    label?: string,
    placeholder?: string,
    isDisabled?: boolean,
    isClearable?: boolean,
    message?: string,
    size?: string,
    variant?: string,
    isError?: boolean,
    isMultiple?: boolean,
    options?: TypeOption[],
    children?: string,
    onFocus?: () => void,
    onBlur?: () => void,
    updateValue?: (id: TypeModelValue) => void,
}

function Select(prevProps: Props): JSX.Element {
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
        isMultiple: true,
        options: [],
        children: '',
        onFocus: () => {},
        onBlur: () => {},
        updateValue: () => {},
        ...prevProps,
    };

    // BLOCK "label"
    const isLabel = props.children || props.label;

    // BLOCK "focus and blur"
    const [listStates, setListStates] = useState<{ [key: string]: boolean }>({
        isOpen: false,
        isFocus: false,
    });

    const clickInput = () => {
        setListStates((prevListStates) => {
            const newListStates = { ...prevListStates };
            newListStates.isOpen = !newListStates.isOpen;

            return newListStates;
        });
    };

    const onBlur = () => {
        setTimeout(() => {    
            setListStates((prevListStates) => {
                if (props.isMultiple && prevListStates.isFocus) {
                    return prevListStates;
                }
    
                return {
                    ...prevListStates,
                    isOpen: false,
                };
            });
            props.onBlur();
        }, 100);
    };

    const handleFocus = () => {
        if (!props.isMultiple) {
            return;
        }

        setListStates(() => ({
            ...listStates,
            isFocus: true,
        }));
    };

    const handleFocusOut = () => {
        if (!props.isMultiple) {
            return;
        }

        setListStates(() => ({
            ...listStates,
            isFocus: false,
        }));
        onBlur();
    };

    // BLOCK "classes"
    const componentClasses = `
        ${styles['size-' + props.size]}
        ${styles['variant-' + props.variant]}
        ${props.isError && styles['error']}
        ${listStates.isOpen && styles['focus']}
    `;

    const iconChevronClasses = `
        ${styles['icon-chevron']}
        ${listStates.isOpen && styles['icon-chevron-invert']}
    `;


    // BLOCK "show and update value"
    const valueInput = (() => {
        if (props.isMultiple && Array.isArray(props.value)) {
            let values: string[] = [];
        
            props.value.forEach(value => {
                const newItem = props.options.find((item) => value === item.id);
                if (newItem) {
                    values.push(newItem.value);
                }
            });
    
            return values.join(', ');
        }
    
        const item = props.options.find((item) => props.value === item.id);
        return item?.value || '';
    })();

    const updateValue = (id: string) => {
        if (props.isMultiple) {
            let array: string[] = props.value.slice() as string[];

            if (array.includes(id)) {
                array.splice(array.indexOf(id), 1);
            } else {
                array.push(id);
            }
    
            props.updateValue(array.slice());
        } else {
            props.updateValue(id);
        }
    };

    // BLOCK "clear"
    const isIconClear = props.isClearable && !!props.value.length;

    const clearField = (event: React.MouseEvent) => {
        event.stopPropagation();
        
        if (props.isMultiple) {
            props.updateValue([]);
        } else {
            props.updateValue('');
        }
    };

    return (
        <div className={`${styles['select']} ${props.className}`}>
            {isLabel &&
                <div className={styles['label']}>
                    {props.children || props.label}
                </div>
            }
            {isIconClear}
            <Input
                className={componentClasses}
                value={valueInput}
                placeholder={props.placeholder}
                isDisabled={props.isDisabled}
                isReadonly
                onBlur={onBlur}
                onFocus={props.onFocus}
                onClick={clickInput}
            >
                {{ right: isIconClear &&
                    <>
                        <IconClearField
                            className={styles['icon-clear']}
                            onClick={clearField}
                        />
                        <IconChevron className={iconChevronClasses} />
                    </>,
                }}

            </Input>

            {props.message &&
                <div className={styles['message']}>
                    {props.message}
                </div>
            }

            {listStates.isOpen &&
                <ul
                    className={styles['list']}
                    onFocus={handleFocus}
                    onBlur={handleFocusOut}
                    tabIndex={0}
                >
                    {props.options.map(option =>
                        <li
                            className={styles['item']}
                            key={option.id}
                            onClick={() => updateValue(option.id)}
                        >
                            {props.isMultiple &&
                                <CheckBox
                                    value={props.value.includes(option.id)}
                                    keyField={option.id}
                                >
                                    {option.value}
                                </CheckBox>
                            }
                            {!props.isMultiple &&
                                <div>{option.value}</div>
                            }
                        </li>,
                    )}
                </ul>
            }
        </div>
    );
}

export default Select;