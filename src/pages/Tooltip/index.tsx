import { useState } from 'react';
import PageWrap from 'components/PageWrap';
import Playground from 'components/common/Playground';
import ApiTable from 'components/common/ApiTable';
import UITooltip from 'components/UI/Tooltip';
import styles from 'pages/Tooltip/styles.module.sass';
import codeTooltip from 'components/UI/Tooltip/code';
import apiJSON from 'pages/Tooltip/api.json';
import parametersJSON from 'pages/Tooltip/parameters.json';
import { setValue } from 'helpers/playground';
import type { TypeApiTable } from 'components/common/ApiTable/types';
import type { TypeParameter } from 'components/common/Playground/types';

const api: TypeApiTable = apiJSON;
const parameters: TypeParameter = parametersJSON;
const gitLink: string = 'https://github.com/code-build-project/sham-ui-react/blob/main/src/components/UI/Tooltip/index.tsx';

type TypeState = {
    text: string,
    show: boolean,
    position: string,
}

function Tooltip() {
    const [state, setState] = useState<TypeState>({
        text: 'Tooltip',
        show: false,
        position: 'right',
    });

    return (
        <PageWrap>
            {{
                title: 'Tooltip',
                text:
                    <>
                        Компонент <b>sh-tooltip</b> полезен для передачи информации,
                        когда пользователь наводит курсор мыши на элемент.
                    </>,
                playground:
                    <Playground
                        parameters={parameters}
                        codeTemplate={codeTooltip}
                        parameterValues={state}
                        gitLink={gitLink}
                        onChange={(event) => setValue(event, state, setState)}
                    >
                        <div className={styles['element']}>
                            <UITooltip
                                isShow={state.show || undefined}
                                position={state.position}
                            >
                                {state.text || 'Tooltip'}
                            </UITooltip>
                            Hover me!
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

export default Tooltip;