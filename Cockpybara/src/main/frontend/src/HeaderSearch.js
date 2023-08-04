import './HeaderSearch.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchImage from "./photo/Search.png";

const HeaderSearch = () => {
    const [searchValue, setSearchValue] = useState('');
    const [isLoggedIn] = useState(false); // Add isLoggedIn state
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = () => {
        // 현재 경로를 확인하여 /recipe 페이지인지 검사합니다.
        const currentPath = window.location.pathname;
        if (currentPath === '/recipe') {
            // /recipe 페이지일 경우, URL 파라미터로 칵테일 검색 쿼리를 넘겨줍니다.
            const queryParams = new URLSearchParams(window.location.search);
            const searchQuery = queryParams.get('search');
            if (searchQuery && searchQuery !== searchValue) {
                navigate(`/recipe?search=${encodeURIComponent(searchValue)}`);
            } else {
                // 현재 검색 쿼리와 이전 검색 쿼리가 같으면 검색 쿼리를 리셋합니다.
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
