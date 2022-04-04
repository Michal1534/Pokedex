export type Type = {
    slot: number,
    type: {
        name: string,
        url: string
    }
}


export type Pokemon = {
    id: number,
    name: string,
    url: string,
    types: Type[],
    sprites: {
        front_default: string
    },
    height: number,
    weight: number
}