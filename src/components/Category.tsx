import { useCallback, useEffect, useState } from 'react';
import { CATEGORIES } from '../utils/constants';
import { capitalizeFirstLetter, getQueryParam, setQueryParam } from '../utils/general';

interface CategoryProps {
    onCategoryChange?: (category: string) => void;
}

export default function Category(props: Readonly<CategoryProps>) {
    const [selectedCategory, setSelectedCategory] = useState('general');

    useEffect(() => {
        const category = getQueryParam('category') ?? 'general';
        if (category){
            props.onCategoryChange && props.onCategoryChange(category);
            setSelectedCategory(category);
        }
    }, []);

    const handleCategory = useCallback((category: string) => {
        setSelectedCategory(category);
        props.onCategoryChange && props.onCategoryChange(category);
        setQueryParam('category', category);
    }, [])

    return (
        <div className='flex flex-col gap-6 px-12 pt-4 pb-8'>
            <span className="text-5xl">Top Headlines</span>
            <div className="flex items-center gap-2">
                {CATEGORIES.map((category) => (
                    <button 
                        key={category} 
                        onClick={() => { handleCategory(category) }}
                        className={`
                            ${selectedCategory === category ? 'border-secondary text-secondary' : 'border-base-content'} 
                            px-3 py-1 text-sm border-2 rounded-full font-semibold
                        `}>
                        {capitalizeFirstLetter(category)}
                    </button>
                ))}
            </div>
        </div>
    );
}