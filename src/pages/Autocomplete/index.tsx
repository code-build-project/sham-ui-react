import { useState } from 'react';
import PageWrap from 'components/PageWrap';
import Playground from 'components/common/Playground';
import ApiTable from 'components/common/ApiTable';
import UIAutocomplete from 'components/UI/Autocomplete';
import styles from 'pages/Autocomplete/styles.module.sass';
import codeAutocomplete from 'components/UI/Autocomplete/code';
import apiJSON from 'pages/Autocomplete/api.json';
import optionsJSON from 'pages/Autocomplete/options.json';
import parametersJSON from 'pages/Autocomplete/parameters.json';
import { setValue } from 'helpers/playground';
import type { TypeApiTable } from 'components/common/ApiTable/types';
import type { TypeParameter } from 'components/common/Playground/types';

const api: TypeApiTable = apiJSON;
const options: string[] = optionsJSON;
const parameters: TypeParameter = parametersJSON;
const gitLink: string = 'https://github.com/code-build-project/sham-ui-react/blob/main/src/components/UI/Autocomplete/index.tsx';

type TypeState = {
    value: string,
    placeholder: string,
    disabled: boolean,
    clear: boolean,
    label: string,
    message: string,
    size: string,
    variant: string,
    error: boolean,
    listHide: boolean,
}

function Autocomplete() {
    const [state, setState] = useState<TypeState>({
        value: '',
        placeholder: 'My Autocomplete',
        disabled: false,
        clear: false,
        label: '',
        message: '',
        size: 'medium',
        variant: 'default',
        error: false,
        listHide: true,
    });

    const updateValue = (value: number | string): void => {
        const event = {
            key: 'value',
            value: value as string,
        };

        setValue(event, state, setState);
    };

    return (
        <PageWrap>
            {{
                title: 'Autocomplete',
                text:
                    <>
                        Компонент <b>sh-autocomplete</b> представляет функциональность
                        предопределённого варианта выбора для пользователя.
                        Пользователь может выбрать опцию из списка вместо того, чтобы вводить её вручную.
                    </>,
                playground:
                    <Playground
                        parameters={parameters}
                        codeTemplate={codeAutocomplete}
                        parameterValues={state}
                        gitLink={gitLink}
                        onChange={(event) => setValue(event, state, setState)}
                    >
                        <UIAutocomplete
                            className={styles['autocomplete']}
                            value={state.value}
                            placeholder={state.placeholder}
                            isDisabled={state.disabled}
                            isClearable={state.clear}
                            message={state.message}
                            size={state.size}
                            variant={state.variant}
                            isError={state.error}
                            isListWithoutValue={state.listHide}
                            options={options}
                            updateValue={updateValue}
                        >
                            {state.label}
                        </UIAutocomplete>
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

export default Autocomplete;