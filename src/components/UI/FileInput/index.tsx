import React, { useRef } from 'react';
import { ReactComponent as IconClip } from 'assets/icons/clip.svg';
import { ReactComponent as IconClearField } from 'assets/icons/clearField.svg';
import styles from 'components/UI/FileInput/styles.module.sass';

type Props = {
    className?: string,
    value?: { [key: string]: any }[],
    label?: string,
    isMultiple?: boolean,
    isDisabled?: boolean,
    isError?: boolean,
    message?: string,
    placeholder?: string,
    accept?: string,
    children?: string,
    updateValue?: (files: { [key: string]: any }[]) => void,
}

function FileInput(prevProps: Props): JSX.Element {
    const props = {
        value: [],
        label: '',
        isMultiple: false,
        isDisabled: false,
        isError: false,
        message: '',
        placeholder: '',
        accept: '',
        children: '',
        updateValue: () => {},
        ...prevProps,
    };

    const componentClasses = `
        ${styles['file-input']}
        ${props.isDisabled && styles['disabled']}
        ${props.isError && styles['error']}
        ${props.className}
    `;

    const onLoad = (event: React.ChangeEvent) => {
        const target = event.target as HTMLInputElement;
    
        if (!target.files?.length) {
            return;
        }
    
        let files = [];
    
        for (let i = 0; i < target.files.length; i++) {
            files.push(target.files[i]);
        }
    
        props.updateValue(files);
        target.value = '';
    };

    const nameList = props.value.map(item => item.name || '').join(', ');

    // BLOCK "label"
    const isLabel = props.children || props.label;

    // BLOCK "clip"
    const fieldRef = useRef<HTMLInputElement>(null);

    const clickClip = () => {
        if (!fieldRef.current?.value) {
            return;
        }
    
        fieldRef.current.click();
    };

    // BLOCK "clear"
    const isIconClear = !!nameList;

    const clearField = () => {
        props.updateValue([]);
    };

    return (
        <div className={componentClasses}>
            {isLabel &&
                <div className={styles['label']}>
                    {props.children || props.label}
                </div>
            }

            <div className={styles['field-wrap']}>
                <IconClip
                    className={styles['icon-clip']}
                    onClick={clickClip}
                />

                <div className={styles['field']}>
                    <input
                        className={styles['field-input']}
                        ref={fieldRef}
                        type="file"
                        multiple={props.isMultiple}
                        accept={props.accept}
                        onChange={onLoad}
                    />

                    {nameList &&
                        <p className={styles['name']}>
                            {nameList}
                        </p>
                    }
                    {!nameList &&
                        <p className={styles['placeholder']}>
                            {props.placeholder}
                        </p>
                    }

                    {isIconClear &&
                        <IconClearField
                            className={styles['icon-clear']}
                            onClick={clearField}
                        />
                    }
                </div>
            </div>

            {props.message &&
                <div className={styles['message']}>
                    {props.message}
                </div>
            }
        </div>
    );
}

export default FileInput;