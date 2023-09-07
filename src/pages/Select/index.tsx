import { useState } from 'react';
import PageWrap from 'components/PageWrap';
import Playground from 'components/common/Playground';
import ApiTable from 'components/common/ApiTable';
import UISelect from 'components/UI/Select';
import styles from 'pages/Select/styles.module.sass';
import codeSelect from 'components/UI/Select/code';
import apiJSON from 'pages/Select/api.json';
import optionsJSON from 'pages/Select/options.json';
import parametersJSON from 'pages/Select/parameters.json';
import { setValue } from 'helpers/playground';
import type { TypeOption } from 'components/UI/Select/types';
import type { TypeApiTable } from 'components/common/ApiTable/types';
import type { TypeParameter, TypeChangeData } from 'components/common/Playground/types';

const api: TypeApiTable = apiJSON;
const options: TypeOption[] = optionsJSON;
const parameters: TypeParameter = parametersJSON;
const gitLink: string = 'https://github.com/code-build-project/sham-ui-react/blob/main/src/components/UI/Select/index.tsx';

type TypeState = {
    placeholder: string,
    disabled: boolean,
    clear: boolean,
    label: string,
    message: string,
    size: string,
    variant: string,
    error: boolean,
    multiple: boolean,
}

function Select() {
    const [selectedValue, setSelectedValue] = useState<string | string[]>('');

    const [state, setState] = useState<TypeState>({
        placeholder: 'My Select',
        disabled: false,
        clear: false,
        label: '',
        message: '',
        size: 'medium',
        variant: 'default',
        error: false,
        multiple: false,
    });

    const setParameterDecorator = (event: TypeChangeData) => {
        if (event.key === parameters.multiple.id) {
            if (event.value) {
                setSelectedValue([]);
            } else {
                setSelectedValue('');
            }
        }

        setValue(event, state, setState);
    };

    return (
        <PageWrap>
            {{
                title: 'Select',
                text:
                    <>
                        Компонент <b>sh-select</b> используются для сбора предоставленной
                        пользователем информации из списка опций.
                    </>,
                playground:
                    <Playground
                        parameters={parameters}
                        codeTemplate={codeSelect}
                        parameterValues={state}
                        gitLink={gitLink}
                        onChange={setParameterDecorator}
                    >
                        <UISelect
                            className={styles['select']}
                            value={selectedValue}
                            placeholder={state.placeholder}
                            isDisabled={state.disabled}
                            isClearable={state.clear}
                            message={state.message}
                            size={state.size}
                            variant={state.variant}
                            isError={state.error}
                            isMultiple={state.multiple}
                            options={options}
                            updateValue={setSelectedValue}
                        >
                            {state.label}
                        </UISelect>
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

export default Select;