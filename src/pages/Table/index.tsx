import { useState } from 'react';
import PageWrap from 'components/PageWrap';
import Playground from 'components/common/Playground';
import ApiTable from 'components/common/ApiTable';
import UITable from 'components/UI/Table';
import styles from 'pages/Table/styles.module.sass';
import codeTable from 'components/UI/Table/code';
import apiJSON from 'pages/Table/api.json';
import optionsJSON from 'pages/Table/options.json';
import parametersJSON from 'pages/Table/parameters.json';
import { setValue } from 'helpers/playground';
import type { TypeApiTable } from 'components/common/ApiTable/types';
import type { TypeParameter } from 'components/common/Playground/types';

const api: TypeApiTable = apiJSON;
const headers: { id: string, title: string }[]  = optionsJSON.headers;
const items: { [name: string]: string }[]  = optionsJSON.items;
const parameters: TypeParameter = parametersJSON;
const gitLink: string = 'https://github.com/code-build-project/sham-ui/blob/main/src/components/UI/ShTable/index.vue';

type TypeState = {
    height: string,
}

function Table() {
    const [state, setState] = useState<TypeState>({
        height: '',
    });

    return (
        <PageWrap>
            {{
                title: 'Table',
                text:
                    <>
                        Компонент <b>sh-table</b> представляет строки и столбцы
                        предназначенные для структурирования данных.
                    </>,
                playground:
                    <Playground
                        parameters={parameters}
                        codeTemplate={codeTable}
                        parameterValues={state}
                        gitLink={gitLink}
                        onChange={(event) => setValue(event, state, setState)}
                    >
                        <div className={styles['table']}>
                            <UITable
                                headers={headers}
                                items={items}
                                height={state.height}
                            />
                        </div>
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

export default Table;