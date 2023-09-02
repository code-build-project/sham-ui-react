import { useState } from 'react';
import PageWrap from 'components/PageWrap';
import Playground from 'components/common/Playground';
import ApiTable from 'components/common/ApiTable';
import UIFileInput from 'components/UI/FileInput';
import codeFileInput from 'components/UI/FileInput/code';
import styles from 'pages/FileInput/styles.module.sass';
import apiJSON from 'pages/FileInput/api.json';
import parametersJSON from 'pages/FileInput/parameters.json';
import { setValue } from 'helpers/playground';
import type { TypeApiTable } from 'components/common/ApiTable/types';
import type { TypeParameter } from 'components/common/Playground/types';

const api: TypeApiTable = apiJSON;
const parameters: TypeParameter = parametersJSON;
const gitLink: string = 'https://github.com/code-build-project/sham-ui/blob/main/src/components/UI/ShFileInput/index.vue';

type TypeState = {
    label: string,
    multiple: boolean,
    disabled: boolean,
    error: boolean,
    message: string,
    placeholder: string,
    accept: string,
}

function FileInput() {
    const [fileValue, setFileValue] = useState<{ [key: string]: any }[]>([{}]);

    const [state, setState] = useState<TypeState>({
        label: 'FileInput',
        multiple: false,
        disabled: false,
        error: false,
        message: '',
        placeholder: 'My FileInput',
        accept: '',
    });

    return (
        <PageWrap>
            {{
                title: 'FileInput',
                text:
                    <>
                        Компонент <b>sh-file-input</b> - это специализированный инструмент ввода,
                        который обеспечивает понятный интерфейс для выбора файлов.
                    </>,
                playground:
                    <Playground
                        parameters={parameters}
                        codeTemplate={codeFileInput}
                        parameterValues={state}
                        gitLink={gitLink}
                        onChange={(event) => setValue(event, state, setState)}
                    >
                        <UIFileInput
                            className={styles['file-input']}
                            value={fileValue}
                            placeholder={state.placeholder}
                            isMultiple={state.multiple}
                            isDisabled={state.disabled}
                            isError={state.error}
                            accept={state.accept}
                            message={state.message}
                            updateValue={setFileValue}
                        >
                            {state.label}
                        </UIFileInput>
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

export default FileInput;