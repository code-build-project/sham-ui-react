import { useState } from 'react';
import PageWrap from 'components/PageWrap';
import Playground from 'components/common/Playground';
import ApiTable from 'components/common/ApiTable';
import UIPagination from 'components/UI/Pagination';
import codePagination from 'components/UI/Pagination/code';
import apiJSON from 'pages/Pagination/api.json';
import parametersJSON from 'pages/Pagination/parameters.json';
import { setValue } from 'helpers/playground';
import type { TypeApiTable } from 'components/common/ApiTable/types';
import type { TypeParameter } from 'components/common/Playground/types';

const api: TypeApiTable = apiJSON;
const parameters: TypeParameter = parametersJSON;
const gitLink: string = 'https://github.com/code-build-project/sham-ui-react/blob/main/src/components/UI/Pagination/index.tsx';

type TypeState = {
    stepsLength: number,
}

function Pagination() {
    const [stepValue, setStepValue] = useState<number>(1);

    const [state, setState] = useState<TypeState>({
        stepsLength: 5,
    });

    const updateValue = (value: number): void => {
        setStepValue(value);
    };

    return (
        <PageWrap>
            {{
                title: 'Pagination',
                text:
                    <>
                        Компонент <b>sh-pagination</b> используется для разделения длинных наборов данных,
                        чтобы пользователю было проще использовать информацию.
                    </>,
                playground:
                    <Playground
                        parameters={parameters}
                        codeTemplate={codePagination}
                        parameterValues={state}
                        gitLink={gitLink}
                        onChange={(event) => setValue(event, state, setState)}
                    >
                        <UIPagination
                            value={stepValue}
                            stepsLength={state.stepsLength}
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

export default Pagination;