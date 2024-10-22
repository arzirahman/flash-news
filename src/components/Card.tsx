import { formatDate } from "../utils/general";
import { Article, PrevArticles } from "../utils/interface";

interface CardProps extends Article {
    className?: string;
    loading?: boolean;
}

export default function Card({loading, ...props}: Readonly<CardProps>){
    const handleSave = (article: Article) => {
        const jsonPrev = localStorage.getItem('prevArticles');
        if (jsonPrev){
            const prevArticles: PrevArticles = JSON.parse(localStorage.getItem('prevArticles') ?? '') ?? [];
            prevArticles.push(article);
            localStorage.setItem('prevArticles', JSON.stringify(prevArticles));
        } else {
            localStorage.setItem('prevArticles', JSON.stringify([article]));
        }
    }

    return(
        <a href={props.url ?? ''} 
            onClick={() => { handleSave(props) }}
            style={{direction: 'ltr'}}
            className={`
                rounded-lg flex mb-8 flex-col gap-4 flex-1
                ${!loading ? 'cursor-pointer' : 'cursor-default'} 
                ${props.className ?? ''}
            `}>
            {!loading ? <>
                <img alt="article" src={props.urlToImage} className="object-cover w-full h-full rounded-lg" />
                <div className="flex flex-col gap-2">
                    <span className="text-lg font-semibold">{props.title}</span>
                    <span className="mb-2 text-sm">{props.description}</span>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col">
                            <span className="font-semibold text-secondary">{props.author}</span>
                            <span className="text-xs font-semibold opacity-50">{props.source?.name ? props.source?.name : "-"}</span>
                        </div>
                        <span className="text-sm text-end">{props.publishedAt ? formatDate(props.publishedAt) : "-"}</span>
                    </div>
                </div>
            </> : <div className="flex flex-col w-full h-full gap-4">
                <div className="w-full h-full skeleton min-h-32"></div>
                <div className="w-full h-4 skeleton"></div>
                <div className="w-full h-4 skeleton"></div>
                <div className="w-full h-4 skeleton"></div>
            </div>}
        </a>
    )
}