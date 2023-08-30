import styles from 'components/UI/Button/styles.module.sass';

type Props = {
    className?: string,
    isLoading?: boolean,
    isDisabled?: boolean,
    size?: string,
    variant?: string,
    type?: string,
    children?: string,
    onClick?: () => void,
}

function Button(prevProps: Props): JSX.Element {
    const props = {
        isLoading: false,
        isDisabled: false,
        size: 'medium',
        variant: 'default',
        type: 'primary',
        children: 'Button',
        onClick: () => {},
        ...prevProps,
    };

    const componentClasses = `
        ${styles['button']}
        ${styles['size-' + props.size]}
        ${styles['variant-' + props.variant]}
        ${styles['type-' + props.type]}
        ${props.isLoading && styles['loading']}
        ${props.isDisabled && styles['disabled']}
    `;
    
    const onClick = () => {
        if (props.isLoading || props.isDisabled) {
            return;
        }

        props.onClick();
    };

    return (
        <button
            className={componentClasses}
            onClick={onClick}
        >
            {props.isLoading &&
                <div className={styles['loader']}>
                    <div className={styles['loader-circle']} />
                </div>
            }

            <div className={styles['text']}>
                {props.children}
            </div>
        </button>
    );
}

export default Button;