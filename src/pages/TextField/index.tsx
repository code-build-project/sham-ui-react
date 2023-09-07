import { useState } from 'react';
import PageWrap from 'components/PageWrap';
import Playground from 'components/common/Playground';
import ApiTable from 'components/common/ApiTable';
import UITextField from 'components/UI/TextField';
import styles from 'pages/TextField/styles.module.sass';
import codeTextField from 'components/UI/TextField/code';
import apiJSON from 'pages/TextField/api.json';
import parametersJSON from 'pages/TextField/parameters.json';
import { setValue } from 'helpers/playground';
import type { TypeApiTable } from 'components/common/ApiTable/types';
import type { TypeParameter } from 'components/common/Playground/types';

const api: TypeApiTable = apiJSON;
const parameters: TypeParameter = parametersJSON;
const gitLink: string = 'https://github.com/code-build-project/sham-ui/blob/main/src/components/UI/ShTextField/index.vue';

type TypeState = {
    value: number | string,
    label: string,
    placeholder: string,
    readonly: boolean,
    disabled: boolean,
    clear: boolean,
    message: string,
    size: string,
    variant: string,
    error: boolean,
    password: boolean,
    format: string,
}

function TextField() {
    const [state, setState] = useState<TypeState>({
        value: '',
        label: '',
        placeholder: 'My TextField',
        readonly: false,
        disabled: false,
        clear: false,
        message: '',
        size: 'medium',
        variant: 'default',
        error: false,
        password: false,
        format: '',
    });

    const updateValue = (value: string | number): void => {
        const event = {
            key: 'value',
            value: value as string,
        };

        setValue(event, state, setState);
    };

    return (
        <PageWrap>
            {{
                title: 'TextField',
                text:
                    <>
                        Компонент <b>sh-text-field</b> используются для сбора предоставленной
                        пользователем информации.
                    </>,
                playground:
                    <Playground
                        parameters={parameters}
                        codeTemplate={codeTextField}
                        parameterValues={state}
                        gitLink={gitLink}
                        onChange={(event) => setValue(event, state, setState)}
                    >
                        <UITextField
                            className={styles['text-field']}
                            value={state.value}
                            placeholder={state.placeholder}
                            isReadonly={state.readonly}
                            isDisabled={state.disabled}
                            size={state.size}
                            variant={state.variant}
                            isError={state.error}
                            message={state.message}
                            isClearable={state.clear}
                            isPassword={state.password}
                            format={state.format}
                            updateValue={updateValue}
                        >
                            {state.label}
                        </UITextField>
                    </Playground>,
                apiTable:
                    <ApiTable
                        propList={api.propList}
                        eventList={api.eventList}
                        slotList={api.slotList}
                    />,
            }}
        </PageWrap>
    );
}

export default TextField;