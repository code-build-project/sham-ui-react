import { useState } from 'react';
import PageWrap from 'components/PageWrap';
import Playground from 'components/common/Playground';
import ApiTable from 'components/common/ApiTable';
import UIButton from 'components/UI/Button';
import codeButton from 'components/UI/Button/code';
import apiJSON from 'pages/Button/api.json';
import parametersJSON from 'pages/Button/parameters.json';
import { setValue } from 'helpers/playground';
import type { TypeApiTable } from 'components/common/ApiTable/types';
import type { TypeParameter } from 'components/common/Playground/types';

const api: TypeApiTable = apiJSON;
const parameters: TypeParameter = parametersJSON;
const gitLink: string = 'https://github.com/code-build-project/sham-ui/blob/main/src/components/UI/ShButton/index.vue';

type TypeState = {
    text: string,
    loading: boolean,
    disabled: boolean,
    variant: string,
    type: string,
    size: string,
}

function Button() {
    const [state, setState] = useState<TypeState>({
        text: '',
        loading: false,
        disabled: false,
        variant: 'default',
        type: 'primary',
        size: 'medium',
    });

    return (
        <PageWrap>
            {{
                title: 'Button',
                text:
                    <>
                        Компонент <b>sh-button-origin</b> заменяет стандартную
                        html-кнопку и добавляет множество опций.
                        Вы так же можете кастомизировать кнопку добавив компонент-обертку
                        с необходимым функционалом.
                    </>,
                playground:
                    <Playground
                        parameters={parameters}
                        codeTemplate={codeButton}
                        parameterValues={state}
                        gitLink={gitLink}
                        onChange={(event) => setValue(event, state, setState)}
                    >
                        <UIButton
                            variant={state.variant}
                            type={state.type}
                            size={state.size}
                            isLoading={state.loading}
                            isDisabled={state.disabled}
                        >
                            {state.text || 'My button'}
                        </UIButton>
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

export default Button;