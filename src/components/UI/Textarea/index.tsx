import React, { useState } from 'react';
import styles from 'components/UI/Textarea/styles.module.sass';

type Props = {
    className?: string,
    value?: string,
    label?: string,
    placeholder?: string,
    isDisabled?: boolean,
    isReadonly?: boolean,
    isSpellcheck?: boolean,
    resize?: string,
    maxlength?: number,
    children?: string,
    onFocus?: () => void,
    onBlur?: () => void,
    updateValue?: (value: string) => void,
}

function Textarea(prevProps: Props): JSX.Element {
    const props = {
        value: '',
        label: '',
        placeholder: '',
        isDisabled: false,
        isReadonly: false,
        isSpellcheck: false,
        resize: 'both',
        maxlength: undefined,
        children: '',
        onFocus: () => {},
        onBlur: () => {},
        updateValue: () => {},
        ...prevProps,
    };

    const onInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.updateValue(event.target.value);
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
        setFocus(false);
        props.onBlur();
    };

    // BLOCK "classes"
    const componentClasses = `
        ${styles['textarea']}
        ${styles['resize-'+ props.resize]}
        ${isFocus && styles['textarea-focused']}
        ${props.isDisabled && styles['disabled']}
    `;

    return (
        <div className={`${styles['textarea-wrap']} ${props.className}`}>
            {isLabel &&
                <div className={styles['label']}>
                    {props.children || props.label}
                </div>
            }

            <textarea
                className={componentClasses}
                value={props.value}
                placeholder={props.placeholder}
                readOnly={props.isReadonly}
                maxLength={props.maxlength}
                spellCheck={props.isSpellcheck}
                onBlur={onBlur}
                onFocus={onFocus}
                onInput={onInput}
            />
        </div>
    );
}

export default Textarea;