import React from 'react';
import Input from 'components/common/Input';
import { ReactComponent as IconSearch } from 'assets/icons/search.svg';
import styles from 'components/common/InputSearch/styles.module.sass';

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

type Props = {
    className?: string,
    value?: number | string,
    placeholder?: string,
    onInput?: (event: InputChangeEvent) => void,
}

function InputSearch(prevProps: Props): JSX.Element {
    const props = {
        value: '',
        placeholder: '',
        onInput: () => {},
        ...prevProps,
    };

    const onInput = (event: InputChangeEvent): void => {
        props.onInput(event);
    };

    return (
        <Input
            className={props.className}
            value={props.value}
            placeholder={props.placeholder}
            onInput={onInput}
        >
            {{ left: <IconSearch className={styles['icon']} /> }}
        </Input>
    );
}

export default InputSearch;