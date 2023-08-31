import React from 'react';
import styles from 'components/common/Button/styles.module.sass';

type Props = {
    className?: string,
    children?: React.ReactNode,
    onClick?: React.MouseEventHandler,
}

function Button(prevProps: Props): JSX.Element {
    const props = {
        children: 'Button',
        ...prevProps,
    };

    return (
        <button
            className={`${styles['button']} ${props.className}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

export default Button;