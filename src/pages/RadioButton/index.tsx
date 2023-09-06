import { useState } from 'react';
import PageWrap from 'components/PageWrap';
import Playground from 'components/common/Playground';
import ApiTable from 'components/common/ApiTable';
import UIRadioButton from 'components/UI/RadioButton';
import codeRadioButton from 'components/UI/RadioButton/code';
import apiJSON from 'pages/RadioButton/api.json';
import optionsJSON from 'pages/RadioButton/options.json';
import parametersJSON from 'pages/RadioButton/parameters.json';
import { setValue } from 'helpers/playground';
import type { TypeApiTable } from 'components/common/ApiTable/types';
import type { TypeParameter } from 'components/common/Playground/types';

const api: TypeApiTable = apiJSON;
const options: { id: number, name: string }[] = optionsJSON;
const parameters: TypeParameter = parametersJSON;
const gitLink: string = 'https://github.com/code-build-project/sham-ui/blob/main/src/components/UI/ShRadioButton/index.vue';

type TypeState = {
    value: string | number,
    label: string,
    column: boolean,
}

function RadioButton() {
    const [state, setState] = useState<TypeState>({
        value: 1,
        label: '',
        column: false,
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
                title: 'RadioButton',
                text:
                    <>
                        Компонент <b>sh-radio-button</b> представляет собой простой переключатель.
                        Пользователь может выбрать один вариант из предоставляемых опций.
                    </>,
                playground:
                    <Playground
                        parameters={parameters}
                        codeTemplate={codeRadioButton}
                        parameterValues={state}
                        gitLink={gitLink}
                        onChange={(event) => setValue(event, state, setState)}
                    >
                        <UIRadioButton
                            value={state.value}
                            keyField="radio-button"
                            radioList={options}
                            isColumn={state.column}
                            updateValue={updateValue}
                        >
                            {state.label}
                        </UIRadioButton>
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

export default RadioButton;