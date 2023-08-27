interface TypeVariant {
    id: string | number,
    name: string,
}

export interface TypeParameter {
    [name: string]: {
        id: string,
        elementType: string,
        title: string,
        placeholder?: string,
        variantList?: TypeVariant[],
        isInline?: boolean,
    }
}

export interface TypeParameterValue {
    [name: string]: string | number | boolean | string[],
}

export interface TypeChangeData {
    key: string,
    value: string | boolean,
}