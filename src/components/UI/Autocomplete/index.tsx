import Input from 'components/common/Input';
import styles from 'components/UI/Autocomplete/styles.module.sass';

type Props = {
    className?: string,
    value?: string,
    label?: string,
    placeholder?: string,
    isDisabled?: boolean,
    isClearable?: boolean,
    message?: string,
    size?: string,
    variant?: string,
    isError?: boolean,
    isListWithoutValue?: boolean,
    options?: string[],
    children?: { label: string },
    updateValue?: (value: boolean) => void,
}

function Autocomplete(prevProps: Props): JSX.Element {
    const props = {
        value: '',
        label: '',
        placeholder: '',
        isDisabled: false,
        isClearable: false,
        message: '',
        size: 'medium',
        variant: 'default',
        isError: false,
        isListWithoutValue: true,
        options: [],
        children: { label: '' },
        updateValue: () => {},
        ...prevProps,
    };

    const componentClasses = `
        ${styles['size-' + props.size]}
        ${styles['variant-' + props.variant]}
        ${props.isError && styles['error']}
    `;

    // BLOCK "label"
    const isLabel: boolean = !!props.label;

    return (
        <div className={`${styles['autocomplete']} ${props.className}`}>
            {isLabel &&
                <div className={styles['label']}>
                    {props.label}
                </div>
            }
            <Input
                className={componentClasses}
                value={props.value}
                placeholder={props.placeholder}
                isDisabled={props.isDisabled}
            />
        </div>
    );
}

export default Autocomplete;