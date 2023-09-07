import { useState } from 'react';
import PageWrap from 'components/PageWrap';
import Playground from 'components/common/Playground';
import ApiTable from 'components/common/ApiTable';
import UICheckbox from 'components/UI/Checkbox';
import codeCheckbox from 'components/UI/Checkbox/code';
import apiJSON from 'pages/Checkbox/api.json';
import parametersJSON from 'pages/Checkbox/parameters.json';
import { setValue } from 'helpers/playground';
import type { TypeApiTable } from 'components/common/ApiTable/types';
import type { TypeParameter } from 'components/common/Playground/types';

const api: TypeApiTable = apiJSON;
const parameters: TypeParameter = parametersJSON;
const gitLink: string = 'https://github.com/code-build-project/sham-ui-react/blob/main/src/components/UI/Checkbox/index.tsx';

type TypeState = {
    value: boolean,
    text: string,
    disabled: boolean,
    size: string,
}

function Checkbox() {
    const [state, setState] = useState<TypeState>({
        value: false,
        text: 'My Checkbox',
        disabled: false,
        size: 'medium',
    });

    const updateValue = (value: boolean): void => {
        const event = {
            key: 'value',
            value,
        };

        setValue(event, state, setState);
    };

    return (
        <PageWrap>
            {{
                title: 'Checkbox',
                text:
                    <>
                        Компонент <b>sh-checkbox</b> представляет флаг для выбора опции.
                    </>,
                playground:
                    <Playground
                        parameters={parameters}
                        codeTemplate={codeCheckbox}
                        parameterValues={state}
                        gitLink={gitLink}
                        onChange={(event) => setValue(event, state, setState)}
                    >
                        <UICheckbox
                            value={state.value}
                            keyField="checkbox"
                            isDisabled={state.disabled}
                            size={state.size}
                            updateValue={updateValue}
                        >
                            {state.text}
                        </UICheckbox>
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

export default Checkbox;