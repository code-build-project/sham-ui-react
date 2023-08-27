import { useState } from 'react';
import PageWrap from 'components/PageWrap';
import Playground from 'components/common/Playground';
import ApiTable from 'components/common/ApiTable';
import styles from 'pages/Autocomplete/styles.module.sass';
import codeAutocomplete from 'components/UI/ShAutocomplete/code';
import apiJSON from 'pages/Autocomplete/api.json';
import parametersJSON from 'pages/Autocomplete/parameters.json';
import { setValue } from 'helpers/playground';
import type { TypeApiTable } from 'components/common/ApiTable/types';
import type { TypeParameter } from 'components/common/Playground/types';

const api: TypeApiTable = apiJSON;
const parameters: TypeParameter = parametersJSON;
const gitLink: string = 'https://github.com/code-build-project/sham-ui/blob/main/src/components/UI/ShAutocomplete/index.vue';

type TypeState = {
    modelValue: string,
    placeholder: string,
    disabled: boolean,
    clear: boolean,
    label: string,
    message: string,
    size: string,
    variant: string,
    error: boolean,
    listHide: boolean,
}

function Autocomplete() {
    const [state, setState] = useState<TypeState>({
        modelValue: '',
        placeholder: 'My Autocomplete',
        disabled: false,
        clear: false,
        label: '',
        message: '',
        size: 'medium',
        variant: 'default',
        error: false,
        listHide: true,
    });

    return (
        <PageWrap>
            {{
                title: 'Autocomplete',
                text:
                    <>
                        Компонент <b>sh-autocomplete</b> представляет функциональность
                        предопределённого варианта выбора для пользователя.
                        Пользователь может выбрать опцию из списка вместо того, чтобы вводить её вручную.
                    </>,
                playground:
                    <Playground
                        parameters={parameters}
                        codeTemplate={codeAutocomplete}
                        parameterValues={state}
                        gitLink={gitLink}
                        onChange={(event) => setValue(event, state, setState)}
                    >
                        <div className={styles['autocomplete']}>Тут будет элемент</div>
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

export default Autocomplete;