import React, { useState, useRef, Fragment } from 'react';
import Switch from 'components/common/Switch';
import InputTitle from 'components/common/InputTitle';
import RadioButton from 'components/common/RadioButton';
import { ReactComponent as IconBulb } from 'assets/icons/bulb.svg';
import { ReactComponent as IconCode } from 'assets/icons/code.svg';
import { ReactComponent as IconGithub } from 'assets/icons/github.svg';
import { ReactComponent as IconResize } from 'assets/icons/resize.svg';
import styles from 'components/common/Playground/styles.module.sass';
import type { TypeParameter, TypeParameterValue, TypeChangeData } from 'components/common/Playground/types';

type Props = {
    parameters?: TypeParameter,
    codeTemplate?: string,
    parameterValues?: TypeParameterValue,
    gitLink?: string,
    children?: React.ReactNode,
    onChange?: (data: TypeChangeData) => void,
}

function Playground(prevProps: Props): JSX.Element {
    const props = {
        parameters: {},
        codeTemplate: '',
        parameterValues: {},
        gitLink: '',
        onChange: () => {},
        ...prevProps,
    };

    // BLOCK "parameters"
    type TypeKey = string | number;
    type TypeValue = string | boolean | number;
    type TypeCorrectValue = string | number | boolean | string[];

    const setParameter = <T extends string | boolean>(key: TypeKey, value: TypeValue): void => {
        props.onChange({ key: key as string, value: value as T });
    };

    const getValueCorrectType = <T extends unknown>(value: TypeCorrectValue): T => {
        return value as T;
    };

    // BLOCK "code show"
    const [isCodeShow, setCodeShow] = useState<boolean>(false);

    const codeClasses = `
        ${styles['code']}
        ${isCodeShow && styles['code_open']}
    `;

    const showCode = (): void => {
        setCodeShow(!isCodeShow);
    };
    
    // BLOCK "field theme change"
    const [isLight, setLight] = useState<boolean>(false);

    const setTheme = (): void => {
        setLight(!isLight);
    };

    const fieldClasses = `
        ${styles['field']}
        ${isLight && styles['field-dark']}
    `;

    // BLOCK "field resize"
    const refField = useRef<HTMLInputElement>(null);

    const drag = (e: React.MouseEvent): void => {
        let dragX = e.clientX;
    
        document.onmousemove = function onMouseMove(e: MouseEvent): void {
            if (!refField.current) {
                return;
            }
    
            const maxWidthField = 768;
            const newWidth = refField.current.offsetWidth + e.clientX - dragX;
    
            if (newWidth < maxWidthField) {
                refField.current.style.width = newWidth + 'px';
                dragX = e.clientX;
            }
        };
    
        document.onmouseup = function onMouseLeave(): void {
            document.onmousemove = document.onmouseup = null;
        };
    };

    return (
        <div className={styles['playground']}>
            <div className={styles['header']}>
                Playground

                <div className={styles['header-icons']}>
                    <IconBulb
                        className={styles['icon-bulb']}
                        onClick={setTheme}
                    />
                    <a
                        className={styles['icon-git-link']}
                        href={props.gitLink}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <IconGithub className={styles['icon-git']} />
                    </a>
                    <IconCode
                        className={styles['icon-code']}
                        onClick={showCode}
                    />
                </div>
            </div>

            <div
                className={fieldClasses}
                ref={refField}
            >
                {props.children}

                <div className={styles['field-resize']}>
                    <IconResize
                        className={styles['icon-resize']}
                        onMouseDown={drag}
                    />
                </div>
            </div>

            <div className={codeClasses}>
                <div
                    className={styles['code-template']}
                    dangerouslySetInnerHTML={{ __html: props.codeTemplate || '' }}
                />
            </div>

            <div className={styles['parameters']}>
                {Object.keys(props.parameters).map((key, index) =>
                    <Fragment key={props.parameters[key].id}>
                        {(index !== 0 && !props.parameters[key].isInline) &&
                            <div className={styles['new-string']} />
                        }

                        {props.parameters[key].elementType === 'radio' &&
                            <RadioButton
                                className={styles['parameters-radio']}
                                value={getValueCorrectType(props.parameterValues[key])}
                                keyField={props.parameters[key].id}
                                radioList={props.parameters[key].variantList}
                                updateValue={(event) => setParameter(key, event)}
                            >
                                {props.parameters[key].title}
                            </RadioButton>
                        }

                        {props.parameters[key].elementType === 'switch' &&
                            <Switch
                                className={styles['parameters-switch']}
                                value={getValueCorrectType(props.parameterValues[key])}
                                keyField={props.parameters[key].id}
                                updateValue={(event) => setParameter(key, event)}
                            >
                                {props.parameters[key].title}
                            </Switch>
                        }

                        {props.parameters[key].elementType === 'input' &&
                            <InputTitle
                                className={styles['parameters-input']}
                                value={getValueCorrectType(props.parameterValues[key])}
                                placeholder={props.parameters[key].placeholder}
                                updateValue={(event) => setParameter(key, event)}
                            >
                                {props.parameters[key].title}
                            </InputTitle>
                        }
                    </Fragment>,
                )}
            </div>
        </div>
    );
}

export default Playground;