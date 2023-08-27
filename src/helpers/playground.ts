import type { TypeParameterValue, TypeChangeData } from 'components/common/Playground/types';

export function setValue(data: TypeChangeData, playgroundValues: TypeParameterValue, setState: Function): void {
    const newState = Object.assign({}, playgroundValues);
    newState[data.key] = data.value;

    setState(newState);
}