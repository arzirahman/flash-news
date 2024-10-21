import React, { useCallback, useEffect, useState } from 'react';

interface TopBarProps {
    onSearch?: (search: string) => void;
}

export default function TopBar(props: Readonly<TopBarProps>) {
    const [isDark, setIsDark] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        toggleTheme()
    }, []);

    const toggleTheme = useCallback(() => {
        const storedTheme = localStorage.getItem('theme') ?? 'light';

        const newTheme = storedTheme === 'dark' ? 'light' : 'dark';
        setIsDark(storedTheme === 'dark')
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    }, []);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSearch && props.onSearch(search)
    }

    return (
        <div className='sticky top-0 flex items-center justify-end w-full gap-4 px-12 py-4 glass'>
            <label className="cursor-pointer label">
                <span className="hidden">Theme</span>
                <input
                    type="checkbox"
                    className="toggle toggle-secondary"
                    checked={isDark}
                    onChange={toggleTheme}
                />
            </label>
            <form onSubmit={handleSearch}>
                <label className="flex items-center gap-2 input input-bordered input-sm text-secondary">
                    <span className="hidden">Search</span>
                    <input 
                        onChange={(e) => { setSearch(e.target.value) }} 
                        type="text" 
                        className="grow" 
                        placeholder="Search" 
                        value={search}
                    />
                    <button type='submit'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 opacity-70"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" 
                            />
                        </svg>
                    </button>
                </label>
            </form>
        </div>
    );
}