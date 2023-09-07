import { useState } from 'react';
import PageWrap from 'components/PageWrap';
import Playground from 'components/common/Playground';
import ApiTable from 'components/common/ApiTable';
import UITabs from 'components/UI/Tabs';
import codeTabs from 'components/UI/Tabs/code';
import apiJSON from 'pages/Tabs/api.json';
import optionsJSON from 'pages/Tabs/options.json';
import parametersJSON from 'pages/Tabs/parameters.json';
import { setValue } from 'helpers/playground';
import type { TypeApiTable } from 'components/common/ApiTable/types';
import type { TypeParameter } from 'components/common/Playground/types';

const api: TypeApiTable = apiJSON;
const tabs: { id: string, title: string }[]  = optionsJSON;
const parameters: TypeParameter = parametersJSON;
const gitLink: string = 'https://github.com/code-build-project/sham-ui-react/blob/main/src/components/UI/Tabs/index.tsx';

type TypeState = {
    value: string,
    column: boolean,
}

function Tabs() {
    const [state, setState] = useState<TypeState>({
        value: tabs[0].id,
        column: false,
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
                title: 'Tabs',
                text:
                    <>
                        Компонент <b>sh-tabs</b> может быть использован
                        в качестве псевдонавигации для страницы, где вкладки
                        являются ссылками, а элементы вкладок - содержимым.
                    </>,
                playground:
                    <Playground
                        parameters={parameters}
                        codeTemplate={codeTabs}
                        parameterValues={state}
                        gitLink={gitLink}
                        onChange={(event) => setValue(event, state, setState)}
                    >
                        <UITabs
                            value={state.value}
                            tabs={tabs}
                            isColumn={state.column}
                            updateValue={updateValue}
                        />
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

export default Tabs;