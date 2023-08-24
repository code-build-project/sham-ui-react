import React, { useState, useRef, useMemo } from 'react';
import { ReactComponent as IconBulb } from 'assets/icons/bulb.svg';
import { ReactComponent as IconGithub } from 'assets/icons/github.svg';
import { ReactComponent as IconCode } from 'assets/icons/code.svg';
import { ReactComponent as IconResize } from 'assets/icons/resize.svg';
import styles from 'components/common/Playground/styles.module.sass';

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

type Props = {
    className?: string,
    codeTemplate?: string,
    gitLink?: string,
    children?: React.ReactNode,
    onInput?: (event: InputChangeEvent) => void,
}
 
const defaultProps: Props = {
    codeTemplate: '',
    gitLink: '',
};

function Playground(prevProps: Props): JSX.Element {
    const props = { ...defaultProps, ...prevProps };

    // BLOCK "code show"
    const [isCodeShow, setCodeShow] = useState<boolean>(false);

    const codeClasses = useMemo(() => {
        return isCodeShow ? 'code_open' : '';
    }, [isCodeShow]);

    const showCode = (): void => {
        setCodeShow(!isCodeShow);
    };
    
    // BLOCK "field theme change"
    const [isLight, setLight] = useState<boolean>(false);

    const setTheme = (): void => {
        setLight(!isLight);
    };

    const fieldClasses = useMemo(() => {
        return isLight ? 'field-dark' : '';
    }, [isLight]);

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
        <div className={styles.playground}>
            <div className={styles.header}>
                Playground

                <div className={styles['header-icons']}>
                    <IconBulb
                        className={styles['icon-bulb']}
                        onClick={setTheme}
                    />
                    <a
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
                className={`${styles.field} ${styles[fieldClasses]}`}
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

            <div className={`${styles.code} ${styles[codeClasses]}`}>
                <div
                    className={styles['code-template']}
                    dangerouslySetInnerHTML={{ __html: props.codeTemplate || '' }}
                />
            </div>
        </div>
    );
}

export default Playground;