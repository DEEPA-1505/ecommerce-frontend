import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchHandler = () => {
        navigate('/search?keyword=' + keyword)
    }

    return (
        <div className="flex w-full max-w-md mx-auto">
            <input
                type="text"
                id="search_field"
                onChange={(e) => setKeyword(e.target.value)}
                className="input-field rounded-r-none focus:ring-blue-500 focus:border-blue-500"
                onBlur={searchHandler}
                placeholder="Enter Product Name ..."
            />
            <button 
                onClick={searchHandler} 
                id="search_btn" 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-l-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </div>
    )
}