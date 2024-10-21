import { useEffect, useState } from "react"
import { PrevArticles } from "../utils/interface";

export default function ReadArticle(){
    const [prevArticles, setPrevArticles] = useState<PrevArticles>([]);

    useEffect(() => {
        const jsonPrev = localStorage.getItem('prevArticles');
        if (jsonPrev){
            const prevArticles = JSON.parse(localStorage.getItem('prevArticles') ?? '') ?? [];
            console.log(prevArticles);
            setPrevArticles(prevArticles);
        }
    }, [])

    return (
        <div className={`flex flex-col gap-2 ${prevArticles.length === 0 ? 'hidden' : ''}`}>
            <span className="text-2xl font-semibold">Previously Read Articles</span>
            <div className="h-[1px] w-full bg-secondary"></div>
            <div className="grid grid-cols-5 gap-4 pt-4">
                {prevArticles.map((article) => (
                    <a href={article.url} key={article.title} className="flex flex-col flex-1 gap-4 mb-8 rounded-lg ">
                        <img alt="article" src={article.urlToImage} className="object-cover w-full h-full rounded-lg" />
                        <span className="text-lg font-semibold">{article.title}</span>
                    </a>
                ))}
            </div>
        </div>
    )
}