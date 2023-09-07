import { useState } from 'react';
import PageWrap from 'components/PageWrap';
import Playground from 'components/common/Playground';
import ApiTable from 'components/common/ApiTable';
import UIDatepicker from 'components/UI/Datepicker';
import codeDatepicker from 'components/UI/Datepicker/code';
import styles from 'pages/Datepicker/styles.module.sass';
import apiJSON from 'pages/Datepicker/api.json';
import parametersJSON from 'pages/Datepicker/parameters.json';
import { setValue } from 'helpers/playground';
import type { TypeApiTable } from 'components/common/ApiTable/types';
import type { TypeParameter } from 'components/common/Playground/types';

const api: TypeApiTable = apiJSON;
const parameters: TypeParameter = parametersJSON;
const gitLink: string = 'https://github.com/code-build-project/sham-ui-react/blob/main/src/components/UI/Datepicker/index.tsx';

type TypeState = {
    value: string,
    label: string,
    placeholder: string,
    readonly: boolean,
    disabled: boolean,
    error: boolean,
    message: string,
}

function Datepicker() {
    const [state, setState] = useState<TypeState>({
        value: '',
        label: 'Datapicker',
        placeholder: 'My Datapicker',
        readonly: false,
        disabled: false,
        error: false,
        message: '',
    });

    const updateValue = (value: string): void => {
        const event = {
            key: 'value',
            value,
        };

        setValue(event, state, setState);
    };

    return (
        <PageWrap>
            {{
                title: 'Datepicker',
                text:
                    <>
                        Компонент <b>sh-datepicker</b> является полем ввода даты.
                        Значение даты можно ввести вручную, либо выбрать из выпадающего списка.
                    </>,
                playground:
                    <Playground
                        parameters={parameters}
                        codeTemplate={codeDatepicker}
                        parameterValues={state}
                        gitLink={gitLink}
                        onChange={(event) => setValue(event, state, setState)}
                    >
                        <UIDatepicker
                            className={styles['datepicker']}
                            value={state.value}
                            placeholder={state.placeholder}
                            isReadonly={state.readonly}
                            isDisabled={state.disabled}
                            isError={state.error}
                            message={state.message}
                            updateValue={updateValue}
                        >
                            {state.label}
                        </UIDatepicker>
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

export default Datepicker;