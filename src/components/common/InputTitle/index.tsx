import Input from 'components/common/Input';
import styles from 'components/common/InputTitle/styles.module.sass';

type Props = {
    className?: string,
    value?: number | string,
    type?: string,
    placeholder?: string,
    children?: string,
    updateValue?: (value: number | string) => void,
}

function InputTitle(prevProps: Props): JSX.Element {
    const props = {
        value: '',
        type: 'text',
        placeholder: '',
        children: 'Title',
        updateValue: () => {},
        ...prevProps,
    };

    const updateValue = (value: number | string): void => {
        props.updateValue(value);
    };

    return (
        <div className={props.className}>
            <div className={styles.title}>{props.children}</div>

            <Input
                className={styles.input}
                value={props.value}
                type={props.type}
                placeholder={props.placeholder}
                updateValue={updateValue}
            />
        </div>
    );
}

export default InputTitle;