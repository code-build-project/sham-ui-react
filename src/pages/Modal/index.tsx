import { useState } from 'react';
import PageWrap from 'components/PageWrap';
import Playground from 'components/common/Playground';
import ApiTable from 'components/common/ApiTable';
import UIModal from 'components/UI/Modal';
import codeModal from 'components/UI/Modal/code';
import styles from 'pages/Modal/styles.module.sass';
import apiJSON from 'pages/Modal/api.json';
import parametersJSON from 'pages/Modal/parameters.json';
import { setValue } from 'helpers/playground';
import type { TypeApiTable } from 'components/common/ApiTable/types';
import type { TypeParameter } from 'components/common/Playground/types';

const api: TypeApiTable = apiJSON;
const parameters: TypeParameter = parametersJSON;
const gitLink: string = 'https://github.com/code-build-project/sham-ui/blob/main/src/components/UI/ShModal/index.vue';

type TypeState = {
    value: boolean,
    title: string,
    text: string,
}

function Modal() {
    const [state, setState] = useState<TypeState>({
        value: false,
        title: 'Modal',
        text: 'Modal text',
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
                title: 'Modal',
                text:
                    <>
                        Компонент <b>sh-file-input</b> - это специализированный инструмент ввода,
                        который обеспечивает понятный интерфейс для выбора файлов.
                    </>,
                playground:
                    <Playground
                        parameters={parameters}
                        codeTemplate={codeModal}
                        parameterValues={state}
                        gitLink={gitLink}
                        onChange={(event) => setValue(event, state, setState)}
                    >
                        {state.value &&
                            <UIModal
                                title={state.title}
                                text={state.text}
                                onClose={() => updateValue(false)}
                            />
                        }

                        <div
                            className={styles['element']}
                            onClick={() => updateValue(true)}
                        >
                            Click me! 
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

export default Modal;