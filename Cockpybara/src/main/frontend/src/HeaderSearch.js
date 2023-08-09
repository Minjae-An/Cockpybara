import './HeaderSearch.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchImage from "./photo/Search.png";

const HeaderSearch = () => {
    const [searchValue, setSearchValue] = useState('');
    const [isLoggedIn] = useState(false); 
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = () => {
        const currentPath = window.location.pathname;
        if (currentPath === '/recipe') {
            const queryParams = new URLSearchParams(window.location.search);
            const searchQuery = queryParams.get('search');
            if (searchQuery && searchQuery !== searchValue) {
                navigate(`/recipe?search=${encodeURIComponent(searchValue)}`);
            } else {
                setSearchValue('');
            }
        } else {
            // Home 페이지일 경우, /recipe 페이지로 네비게이션하면서 칵테일 검색 쿼리를 함께 넘겨줍니다.
            navigate(`/recipe?search=${encodeURIComponent(searchValue)}`);
        }
    };

    return (
            <div className="search-container">
                <input
                    type="text"
                    style={{ fontSize: "20px" }}
                    value={searchValue}
                    onChange={handleSearchChange}
                />
                <img
                    src={searchImage}
                    alt="검색"
                    onClick={handleSearch}
                />
            </div>
    );
};

export default HeaderSearch; 