import { createPortal } from 'react-dom';
import { ReactComponent as IconClearField } from 'assets/icons/clearField.svg';
import styles from 'components/UI/Modal/styles.module.sass';

type Props = {
    className?: string,
    title?: string,
    text?: string,
    textNo?: string,
    textOk?: string,
    children?: string,
    onClose?: () => void,
    onNo?: () => void,
    onOk?: () => void,
}

function Modal(prevProps: Props): JSX.Element {
    const props = {
        value: [],
        title: 'Modal',
        text: 'Modal text',
        textNo: 'No',
        textOk: 'Ok',
        children: '',
        onClose: () => {},
        onNo: () => {},
        onOk: () => {},
        ...prevProps,
    };

    return (
        <>
            {createPortal(
                <div
                    className={styles['modal-wrap']}
                    onClick={props.onClose}
                >
                    <div className={styles['modal']}>
                        <div className={styles['header']}>
                            <div className={styles['title']}>
                                {props.title}
                            </div>

                            <IconClearField
                                className={styles['icon']}
                                onClick={props.onClose}
                            />
                        </div>

                        <div className={styles['text']}>
                            {props.children || props.text}
                        </div>

                        <div className={styles['footer']}>
                            <div
                                className={styles['button-no']}
                                onClick={props.onNo}
                            >
                                {props.textNo}
                            </div>

                            <div
                                className={styles['button-ok']}
                                onClick={props.onOk}
                            >
                                {props.textOk}
                            </div>
                        </div>
                    </div>
                </div>,
                document.body,
            )}
        </>
    );
}

export default Modal;