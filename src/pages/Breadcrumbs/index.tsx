import { useState } from 'react';
import PageWrap from 'components/PageWrap';
import Playground from 'components/common/Playground';
import ApiTable from 'components/common/ApiTable';
import UIBreadcrumbs from 'components/UI/Breadcrumbs';
import codeBreadcrumbs from 'components/UI/Breadcrumbs/code';
import apiJSON from 'pages/Breadcrumbs/api.json';
import optionsJSON from 'pages/Breadcrumbs/options.json';
import parametersJSON from 'pages/Breadcrumbs/parameters.json';
import { setValue } from 'helpers/playground';
import type { TypeCrumb } from 'components/UI/Breadcrumbs/types';
import type { TypeApiTable } from 'components/common/ApiTable/types';
import type { TypeParameter } from 'components/common/Playground/types';

const api: TypeApiTable = apiJSON;
const options: TypeCrumb[] = optionsJSON;
const parameters: TypeParameter = parametersJSON;
const gitLink: string = 'https://github.com/code-build-project/sham-ui/blob/main/src/components/UI/ShBreadcrumbs/index.vue';

type TypeState = {
    size: string,
}

function Breadcrumbs() {
    const [state, setState] = useState<TypeState>({
        size: 'medium',
    });

    return (
        <PageWrap>
            {{
                title: 'Breadcrumbs',
                text:
                    <>
                        Компонент <b>sh-breadcrumbs</b> является компонентом навигации.
                    </>,
                playground:
                    <Playground
                        parameters={parameters}
                        codeTemplate={codeBreadcrumbs}
                        parameterValues={state}
                        gitLink={gitLink}
                        onChange={(event) => setValue(event, state, setState)}
                    >
                        <UIBreadcrumbs
                            size={state.size}
                            items={options}
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

export default Breadcrumbs;