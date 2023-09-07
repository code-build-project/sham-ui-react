import { useState } from 'react';
import PageWrap from 'components/PageWrap';
import Playground from 'components/common/Playground';
import ApiTable from 'components/common/ApiTable';
import UITextarea from 'components/UI/Textarea';
import styles from 'pages/Textarea/styles.module.sass';
import codeTextarea from 'components/UI/Textarea/code';
import apiJSON from 'pages/Textarea/api.json';
import parametersJSON from 'pages/Textarea/parameters.json';
import { setValue } from 'helpers/playground';
import type { TypeApiTable } from 'components/common/ApiTable/types';
import type { TypeParameter } from 'components/common/Playground/types';

const api: TypeApiTable = apiJSON;
const parameters: TypeParameter = parametersJSON;
const gitLink: string = 'https://github.com/code-build-project/sham-ui-react/blob/main/src/components/UI/Textarea/index.tsx';

type TypeState = {
    value: string,
    label: string,
    placeholder: string,
    readonly: boolean,
    disabled: boolean,
    spellcheck: boolean,
    resize: string,
}

function Textarea() {
    const [state, setState] = useState<TypeState>({
        value: '',
        label: '',
        placeholder: 'My Textarea',
        readonly: false,
        disabled: false,
        spellcheck: false,
        resize: 'both',
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
                title: 'Textarea',
                text:
                    <>
                        Компонент <b>sh-textarea</b> используются для сбора больших объемов текстовых данных.
                    </>,
                playground:
                    <Playground
                        parameters={parameters}
                        codeTemplate={codeTextarea}
                        parameterValues={state}
                        gitLink={gitLink}
                        onChange={(event) => setValue(event, state, setState)}
                    >
                        <UITextarea
                            className={styles['textarea']}
                            value={state.value}
                            placeholder={state.placeholder}
                            isReadonly={state.readonly}
                            isDisabled={state.disabled}
                            isSpellcheck={state.spellcheck}
                            resize={state.resize}
                            label={state.label}
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

export default Textarea;