import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddRecipe.css'

// 팝업 창 컴포넌트
const NameSearchModal = ({ onClose, onSearch, setIngredient }) => {
  const [name, setName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const dummyNames = [
    '전소진',
    '소진',
    '민재',
    '안민재',
    '지수',
    '김지수',
    '승혜',
    '신승혜',
    // 필요한 만큼 더미 이름을 추가합니다.
  ];

  const handleSearch = () => {
    // 입력된 이름을 기반으로 더미 데이터를 필터링하여 검색 결과를 업데이트합니다.
    const filteredNames = dummyNames.filter((dummyName) =>
      dummyName.includes(name)
    );
    setSearchResults(filteredNames);
  };

  const handleResultClick = (selectedName) => {
    setName(selectedName);
    setSearchResults([]); // Clear search results when a result is selected
    onClose(); // Close the modal when a result is selected

    // 선택한 이름을 ingredient input에 설정합니다.
    setIngredient(selectedName);
  };

  const modalContentStyle = {
    backgroundColor: 'pink',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '0 auto',
  };

  return (
    <div className="modal">
      <div style={modalContentStyle} className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>이름 검색</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
        />
        <button onClick={handleSearch}>검색</button>
        <ul>
          {searchResults.map((result) => (
            <li key={result}>
              {result}
              <button onClick={() => handleResultClick(result)}>사용하기</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [explan, setExplan] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [step, setStep] = useState('');
  const [flavors, setFlavors] = useState([]);
  const [cocktailId, setId] = useState(5); // 시작 아이디 값 설정
  const [showNameSearch, setShowNameSearch] = useState(false);

  const handleFlavorSelection = (selectedFlavor) => {
    if (flavors.includes(selectedFlavor)) {
      // 이미 선택한 맛인 경우, 해당 맛 제거
      setFlavors(flavors.filter((flavor) => flavor !== selectedFlavor));
    } else {
      // 새로운 맛 선택한 경우, 해당 맛 추가
      setFlavors([...flavors, selectedFlavor]);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 모든 입력란이 채워져 있는지 확인하고, 비어있는 경우 폼 제출을 막습니다.
    if (!title || !explan || !ingredient || !step || flavors.length === 0) {
      alert('모든 입력란을 채워주세요!');
      return;
    }

    // 여기서 입력된 값들을 서버로 보내거나 다른 로직을 처리할 수 있습니다.
    console.log('Id:', cocktailId);
    console.log('Title:', title);
    console.log('Explan:', explan);
    console.log('Ingredient:', ingredient);
    console.log('Step:', step);
    console.log('Flavors:', flavors); // 선택된 맛들 출력

    // "CocktailDetail" 페이지로 폼 데이터를 전달하여 이동합니다.
    navigate(`/recipe/detail/${cocktailId}`, {
      state: {
        cocktailId,
        title,
        explan,
        ingredient,
        step,
        flavors,
      },
    });

    setFlavors([]);

    // 아이디 증가시키기
    setId(prevId => prevId + 1);
  };

  const handleNameSearchClick = () => {
    setShowNameSearch(true);
  };

  const handleNameSearchClose = () => {
    setShowNameSearch(false);
  };

  const modalContentStyle = {
    backgroundColor: 'pink',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '0 auto',
  };

  return (
    <div>
      {/* 팝업 렌더링 */}
      {showNameSearch && (
        <NameSearchModal
          onClose={handleNameSearchClose}
          onSearch={(searchResult) => {
            // 검색 결과를 다루는 로직 (필요하면 추가)
            // 여기서는 콘솔에 검색 결과를 출력하는 예시
            console.log('검색 결과:', searchResult);
          }}
          setIngredient={setIngredient} // 추가된 부분: setIngredient 함수 전달
        />
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">레시피제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="explan">레시피설명</label>
          <input
            type="text"
            id="explan"
            value={explan}
            onChange={(e) => setExplan(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="ingredient">재료</label>
          <input
            type="text"
            id="ingredient"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            required
          />
          <button onClick={handleNameSearchClick}>
            이름 검색
          </button>
        </div>
        <div>
          <label htmlFor="step">단계</label>
          <input
            type="text"
            id="step"
            value={step}
            onChange={(e) => setStep(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="flavor">맛</label>
          <button
            type="button"
            onClick={() => handleFlavorSelection('쓴맛')}
            style={{
              backgroundColor: flavors.includes('쓴맛') ? 'green' : 'white', // 선택된 맛에 따라 스타일 변경
            }}
          >
            쓴맛
          </button>
          <button
            type="button"
            onClick={() => handleFlavorSelection('단맛')}
            style={{
              backgroundColor: flavors.includes('단맛') ? 'green' : 'white', // 선택된 맛에 따라 스타일 변경
            }}
          >
            단맛
          </button>
        </div>
        <button type="submit">폼 제출</button>
        <div>
          <label htmlFor="cocktailId">칵테일 ID</label>
          <input
            type="text"
            id="cocktailId"
            value={cocktailId}
            readOnly // 읽기 전용으로 설정
            required
          />
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
