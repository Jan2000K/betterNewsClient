export interface genericStateProp<T> {
    setter: React.Dispatch<React.SetStateAction<T>>
    value: T
}

export enum newsCategory {
    World,
    Slovenia,
    Sport,
    Technology,
    Other,
    All,
}

export interface newsArticle {
    title: string
    description: string
    link: string
    category: newsCategory
}
