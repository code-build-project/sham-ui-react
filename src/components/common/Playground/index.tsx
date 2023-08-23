import React from 'react';
import Input from 'components/common/Input';
import { ReactComponent as IconBulb } from 'assets/icons/bulb.svg';
import { ReactComponent as IconGithub } from 'assets/icons/github.svg';
import { ReactComponent as IconCode } from 'assets/icons/code.svg';
import styles from 'components/common/Playground/styles.module.sass';

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

type Props = {
    className?: string,
    gitLink?: string,
    onInput?: (event: InputChangeEvent) => void,
}
 
const defaultProps: Props = {
    gitLink: '',
};

function Playground(prevProps: Props): JSX.Element {
    const props = { ...defaultProps, ...prevProps };

    // BLOCK "code show"
    const showCode = (): void => {
        // isCodeShow.value = !isCodeShow.value;
    };
    
    // BLOCK "field theme change"
    const setTheme = (): void => {
        // isLight.value = !isLight.value;
    };

    return (
        <div className={styles.playground}>
            <div className={styles.header}>
                Playground

                <div className={styles['header-icons']}>
                    Playground

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
        </div>
    );
}

export default Playground;