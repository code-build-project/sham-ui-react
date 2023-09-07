import styles from 'components/UI/Tooltip/styles.module.sass';

type Props = {
    isShow?: boolean | undefined,
    position?: string,
    children?: string,
}

function Tooltip(prevProps: Props): JSX.Element {
    const props = {
        isShow: undefined,
        position: 'right',
        children: '',
        ...prevProps,
    };

    const componentClasses = `
        ${styles['tooltip']}
        ${styles['position-'+ props.position]}
        ${(props.isShow !== undefined && props.isShow) && styles['show']}
        ${(props.isShow === false) && styles['hide']}
    `;

    return (
        <div className={styles['tooltip-wrap']}>
            <div className={componentClasses}>
                {props.children || 'Tooltip'}
            </div>
        </div>
    );
}

export default Tooltip;