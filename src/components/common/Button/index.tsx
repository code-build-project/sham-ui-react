import React from 'react';
import styles from 'components/common/Button/styles.module.sass';

type Props = {
    className?: string,
    children?: React.ReactNode,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
}
 
const defaultProps: Props = {
    children: 'Button',
};

function Button(prevProps: Props): JSX.Element {
    const props = { ...defaultProps, ...prevProps };

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