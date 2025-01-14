import { useCallback, useEffect, useState } from "react"
import TopBar from "./components/Topbar"
import axios from "./utils/axios";
import { AxiosError, AxiosResponse } from "axios";
import Card from "./components/Card";
import Category from "./components/Category";
import ReadArticle from "./components/ReadArticle";
import { Article, Response } from "./utils/interface";
import { getQueryParam, removeQueryParam, setQueryParam } from "./utils/general";

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [news, setNews] = useState<Article[]>(Array(10).fill({}));
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const search = getQueryParam('search') ?? 'general';
    if (search){
      setSearch(search)
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if (selectedCategory){
      axios
      .get(search ? "/everything" : "/top-headlines", {
        params: search ? {
          q: search
        } : {
          category: selectedCategory
        }
      })
      .then((response: AxiosResponse<Response>) => {
        const articles = response.data?.articles?.filter(article => 
          article.author && article.content
        )
        setNews(articles);
      })
      .catch((error: AxiosError) => {
        console.log(error.response?.data);
      })
      .finally(() => {
        setLoading(false)
      })
    }
  }, [selectedCategory, search]);

  const handleCategory = useCallback((category: string) => {
    if (category){
      setNews(Array(10).fill({}));
      removeQueryParam('search');
      setSearch('')
      setSelectedCategory(category);
    }
  }, []);

  const handleSearch = useCallback((search: string) => {
    setSearch(search)
    setQueryParam('search', search);
    removeQueryParam('category')
  }, [])

  return (
    <div className="fixed inset-0 flex flex-col w-screen h-screen pb-12 overflow-auto bg-gradient">
      <TopBar onSearch={handleSearch} />
      <Category onCategoryChange={handleCategory} />
      <div className="flex flex-col gap-12 px-6 md:px-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {news.slice(0, 5).map((item, index) => (
            <Card 
              loading={loading}
              key={`${item.author}${index}`} 
              {...item} 
              className={`${index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`} 
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" style={{direction: 'rtl'}}>
          {news.slice(5, 10).map((item, index) => (
            <Card
              loading={loading}
              key={`${item.author}${index}`} 
              {...item} 
              className={`${index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`} 
            />
          ))}
        </div>
        <ReadArticle />
      </div>
    </div>
  )
}

export default App
