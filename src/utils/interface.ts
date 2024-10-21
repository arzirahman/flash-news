export interface Article {
    source?: {
        id?: string;
        name?: string;
    },
    author?: string;
    title?: string;
    description?: string;
    url?: string;
    urlToImage?: string;
    publishedAt?: Date;
    content?: string;
}

export interface Response {
    status: string;
    totalResults: number;
    articles: Article[]
}

export type PrevArticles = {
    urlToImage?: string;
    title?: string;
    url?: string;
}[]