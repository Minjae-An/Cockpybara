import React, { useState } from 'react';
import './AddRecipe2.css'
import camera from "./photo/camera.png";
import plusImg from "./photo/ingredient-plus.png";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Menu from './components/Menu.js'
import searchImage from "./photo/Search.png";

function AddRecipe2() {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [stepList, setStepList] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [recipeDescription, setRecipeDescription] = useState("");
  const [ingredientDescription, setIngredientDescription] = useState("");
  const [steps, setSteps] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const MAX_DESCRIPTION_LENGTH = 300;
  const MAX_INGREDIENT_DESCRIPTION_LENGTH = 50;
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [ingredientName, setingredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [selectedValue, setselectedValue] = useState("");
  const [step, setstep] = useState("");
  const [selectedType, setselectedType] = useState("");
  const userId = 'YOUR_USER_ID'; // 임시 사용자 ID

  const handleSelectChange = (e) => {
    setselectedValue(e.target.value);
  };

  const handleIngredientAmountChange = (e) => {
    const inputValue = e.target.value;
    setIngredientAmount(inputValue);
  };

  // const handleButtonClick = (flavor) => {
  //     const isSelected = selectedFlavors.includes(flavor);

  //     if (isSelected) {
  //         setSelectedFlavors(selectedFlavors.filter(item => item !== flavor));
  //     } else {
  //         setSelectedFlavors([...selectedFlavors, flavor]);
  //     }
  // };
  const handleButtonClick = (flavor) => {
    setSelectedFlavors(prevSelectedFlavors => {
      const isSelected = prevSelectedFlavors.includes(flavor);

      if (isSelected) {
        return prevSelectedFlavors.filter(item => item !== flavor);
      } else {
        return [...prevSelectedFlavors, flavor];
      }
    });
  };

  const handleTitleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 30) {
      setRecipeTitle(inputValue);
    }
  };

  const handleDescriptionChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= MAX_DESCRIPTION_LENGTH) {
      setRecipeDescription(inputValue);
    }
  };

  const handleIngredientDescriptionChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= MAX_INGREDIENT_DESCRIPTION_LENGTH) {
      setIngredientDescription(inputValue);
    }
  };

  const addStep = (e) => {
    e.preventDefault();
    setStepList([...stepList,
      <div className="step-input" key={stepList.length} style={{marginLeft: "17.50rem", marginTop: "1rem"}}>

        <input/>
      </div>
    ]);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newSelectedFiles = [...selectedFiles];
    const newImageUrls = [...imageUrls];

    for (let i = 0; i < files.length && i + selectedFiles.length < 5; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImageUrls.push(e.target.result);
        setImageUrls([...newImageUrls]);
      };
      reader.readAsDataURL(files[i]);
    }

    setSelectedFiles(newSelectedFiles);
  };

  const addIngredient = (e) => {
    e.preventDefault();
    setIngredientList([...ingredientList,
      <div className="detail-ingredient" key={ingredientList.length} style={{marginLeft: "17.80rem", marginTop: "1rem"}}>
        <div className="detail-ingredient-name">
          <p>이름</p>
          <input
              onFocus={() => {
                setIsInputClicked(true);
              }}
              onBlur={() => {
                setIsInputClicked(false);
              }}
              placeholder={isInputClicked === true ? "" : "이름을 입력해 주세요."}
          />
        </div>
        <div className="detail-ingredient-explan">
          <p>설명</p>
          <input
              onFocus={() => {
                setIsInputClicked(true);
              }}
              onBlur={() => {
                setIsInputClicked(false);
              }}
              placeholder={isInputClicked === true ? "" : "설명을 입력해 주세요. (최대 50자)"}
              value={ingredientDescription}
              onChange={handleIngredientDescriptionChange}
          />
        </div>
        <div className="detail-ingredient-amount">
          <p>용량</p>
          <input
              onFocus={() => {
                setIsInputClicked(true);
              }}
              onBlur={() => {
                setIsInputClicked(false);
              }}
              placeholder={isInputClicked === true ? "" : "용량을 입력해 주세요."}
          />
          <select>
            <option>PIECE</option>
            <option>TBLSP</option>
            <option>TSP</option>
            <option>ML</option>
            <option>COUNT</option>
            <option>OZ</option>
            <option>INCH</option>
            <option>DASH</option>
            <option>GR</option>
            <option>STICK</option>
            <option>FILL</option>
            <option>CUP</option>
            <option>PART</option>
            <option>GLASS</option>
            <option>SCOOP</option>
            <option>SLICE</option>
          </select>
        </div>
      </div>
    ]);
  };

  // 통신 코드
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // 이미지 파일들을 FormData에 추가
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('images', selectedFiles[i]);
    }

    // 다른 데이터들을 FormData에 추가
    formData.append('recipeTitle', recipeTitle);
    formData.append('recipeDescription', recipeDescription);
    formData.append('ingredientName', ingredientName);
    formData.append('ingredientDescription', ingredientDescription);
    formData.append('ingredientAmount', ingredientAmount);
    formData.append('ingredientUnit', selectedValue);
    formData.append('step', step);
    formData.append('selectedType', selectedType);
    formData.append('selectedFlavors', JSON.stringify(selectedFlavors));

    try {
      const response = await fetch(`/user/${userId}/my-recipe`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('레시피가 성공적으로 업로드되었습니다!');
        // 성공적으로 업로드된 경우 수행할 작업 추가
      } else {
        alert('레시피 업로드에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('오류가 발생했습니다.');
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleVectorClick = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen); // 이전 상태 값을 이용하여 토글
  };

  const handleSearch = () => {
    // 현재 검색어를 정리합니다.
    const trimmedSearchValue = searchValue.trim();

    // 검색어가 비어있으면 URL 파라미터에서 검색어를 제거하고 해당 페이지로 이동합니다.
    if (trimmedSearchValue === "") {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.delete("search");
      navigate(`/recipe?${queryParams.toString()}`);
    } else {
      // 검색어가 있는 경우, URL 파라미터에 검색어를 추가하고 해당 페이지로 이동합니다.
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set("search", trimmedSearchValue);
      navigate(`/recipe?${queryParams.toString()}`);
    }
  };

  return (
      <div className="addrecipe-mainFrame">
        <div className="headerContainer">
          <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <div className={`menuBar ${isMenuOpen ? "menuBar-open" : ""}`}>
            <div className="headerbox">
              <svg
                  className="vector"
                  width="35"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handleVectorClick}
              >
                <path
                    d="M0 38.25H37.5V32H0V38.25ZM0 0.75V7H56.25V0.75H0ZM0 22.625H56.25V16.375H0V22.625Z"
                    fill="black"
                />
              </svg>
              <Link to="/about">
                <div className="menuAbout">About</div>
              </Link>
              <Link to="/recipe">
                <div className="menuRecipe">Recipe</div>
              </Link>
              <Link to="/community">
                <div className="menuCommunity">Community</div>
              </Link>
            </div>
            <div className="rightComponent">
              <div className="search-wrap">
                <input
                    type="text"
                    style={{ fontSize: "20px" }}
                    value={searchValue}
                    onChange={handleSearchChange}
                />
                <img src={searchImage} alt="검색" onClick={handleSearch} />
              </div>
              <Link to="/login">
                <button className="detailLogin">로그인</button>
              </Link>
            </div>
          </div>
        </div>
        <div className={`content ${isMenuOpen ? "content-shifted" : ""}`}>
        </div>
        <div className="line"></div>
        <div className="addrecipe-subFrame">
          <div className="recipe-title">당신의 레시피를 소개해 주세요!</div>
          <form>
            <div className="add-detail">
              <div className="add-photo">
                {imageUrls.map((url, index) => (
                    <div key={index} className="add-photo-detail" style={{ position: 'relative' }}>
                      <img
                          src={url}
                          alt={`Uploaded ${index}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            maxWidth: '100%',
                            marginBottom: '10px',
                            borderRadius: '1.25rem'
                          }}
                      />
                    </div>
                ))}
                <label htmlFor="fileInput" style={{ cursor: 'pointer', position: 'relative', top: 60, left: 40 }}>
                  <input type="file" accept="image/*" onChange={handleFileChange} id="fileInput" style={{ display: 'none' }} multiple />
                  +
                </label>
              </div>
              <div className="add-title">
                <p>레시피 제목 <span>*</span></p>
                <input // 클릭될 때 작동
                    onFocus={() => {
                      setIsInputClicked(true);
                    }}
                    // 클릭되어 있지 않을 때 작동input 이외의 영역이 클릭되었을 때)
                    onBlur={() => {
                      setIsInputClicked(false);
                    }}
                    placeholder={isInputClicked === true ? "" : "제목을 입력해 주세요. (최대 30자)"} value={recipeTitle} // 입력한 제목을 보여주기 위해 추가
                    onChange={handleTitleChange} />
              </div>
              <div className="add-explan">
                <p>레시피 설명 <span>*</span></p>
                <input
                    onFocus={() => {
                      setIsInputClicked(true);
                    }}
                    onBlur={() => {
                      setIsInputClicked(false);
                    }}
                    placeholder={isInputClicked === true ? "" : "설명을 입력해 주세요. (최대 300자)"}
                    value={recipeDescription}
                    onChange={handleDescriptionChange}
                />
              </div>
              <div className="add-ingredient">
                <p>재료 <span>*</span></p>
                <div className="detail-ingredient">
                  <div className="detail-ingredient-name">
                    <p>이름</p>
                    <input
                        onFocus={() => {
                          setIsInputClicked(true);
                        }}
                        onBlur={() => {
                          setIsInputClicked(false);
                        }}
                        placeholder={isInputClicked === true ? "" : "이름을 입력해 주세요."}
                        value={ingredientName}
                        onChange={(e) => setingredientName(e.target.value)} // Add this line
                    />
                  </div>
                  <div className="detail-ingredient-explan">
                    <p>설명</p>
                    <input
                        onFocus={() => {
                          setIsInputClicked(true);
                        }}
                        onBlur={() => {
                          setIsInputClicked(false);
                        }}
                        placeholder={isInputClicked === true ? "" : "설명을 입력해 주세요. (최대 50자)"}
                        value={ingredientDescription}
                        onChange={handleIngredientDescriptionChange}
                    />
                  </div>
                  <div className="detail-ingredient-amount">
                    <p>용량</p>
                    <input
                        onFocus={() => {
                          setIsInputClicked(true);
                        }}
                        onBlur={() => {
                          setIsInputClicked(false);
                        }}
                        placeholder={isInputClicked === true ? "" : "용량을 입력해 주세요."}
                        value={ingredientAmount}
                        onChange={handleIngredientAmountChange} // 이벤트 핸들러 추가
                    />
                    <select value={selectedValue} onChange={handleSelectChange}>
                      <option value="PIECE">PIECE</option>
                      <option value="TBLSP">TBLSP</option>
                      <option value="TSP">TSP</option>
                      <option value="ML">ML</option>
                      <option value="COUNT">COUNT</option>
                      <option value="OZ">OZ</option>
                      <option value="INCH">INCH</option>
                      <option value="DASHE">DASH</option>
                      <option value="GR">GR</option>
                      <option value="STICK">STICK</option>
                      <option value="FILL">FILL</option>
                      <option value="CUP">CUP</option>
                      <option value="PART">PART</option>
                      <option value="GLASS">GLASS</option>
                      <option value="SCOOP">SCOOP</option>
                      <option value="SLICE">SLICE</option>
                    </select>
                  </div>
                </div>
                <div className="ingredient-btn">
                  <button onClick={addIngredient}>
                    <img src={plusImg} alt="Plus Icon" />
                  </button>
                </div>
              </div>
              {ingredientList.map((ingredient, index) => (
                  <React.Fragment key={index}>
                    {ingredient}
                  </React.Fragment>
              ))}

              <div className="add-step">
                <p>단계<span>*</span></p>
                <div className="step-input">
                  <input value={step} onChange={(e) => setstep(e.target.value)}></input>
                </div>
                <div>
                  <button onClick={addStep} className="step-btn">
                    <img src={plusImg} alt="Plus Icon" />
                  </button>
                </div>
              </div>
              {stepList.map((step, index) => (
                  <React.Fragment key={index}>
                    {step}
                  </React.Fragment>
              ))}

              <div className="add-type">
                <p>종류</p>
                <select value={selectedType} onChange={handleSelectChange}>
                  <option value="etc">기타</option>
                  <option value="general">일반 음료</option>
                  <option value="homeMade">홈메이드</option>
                  <option value="punch">펀치</option>
                  <option value="coffee">커피/차</option>
                  <option value="cocktail">칵테일</option>
                  <option value="soda">소다</option>
                  <option value="shot">샷</option>
                  <option value="cocoa">코코아</option>
                  <option value="milkShake">밀크셰이크</option>
                  <option value="beer">맥주</option>
                </select>
              </div>

              <div className="add-flavor">
                <p>맛<span>*</span></p>
                <div className="flavor-btn">
                  <div className="flavor-top">
                    <button onClick={() => handleButtonClick('상큼한 맛')} style={{ color: selectedFlavor === '상큼한 맛' ? 'white' : 'black', backgroundColor: selectedFlavor === '상큼한 맛' ? 'black' : 'white' }}>상큼한 맛</button>
                    <button onClick={() => handleButtonClick('달달한 맛')} style={{ color: selectedFlavor === '달달한 맛' ? 'white' : 'black', backgroundColor: selectedFlavor === '달달한 맛' ? 'black' : 'white' }}>달달한 맛</button>
                    <button onClick={() => handleButtonClick('부드러운 맛')} style={{ color: selectedFlavor === '부드러운 맛' ? 'white' : 'black', backgroundColor: selectedFlavor === '부드러운 맛' ? 'black' : 'white' }}>부드러운 맛</button>
                    <button onClick={() => handleButtonClick('새콤한 맛')} style={{ color: selectedFlavor === '새콤한 맛' ? 'white' : 'black', backgroundColor: selectedFlavor === '새콤한 맛' ? 'black' : 'white' }}>새콤한 맛</button>
                  </div>
                  <div className="flavor-bottom">
                    <button onClick={() => handleButtonClick('쓸쓸한 맛')} style={{ color: selectedFlavor === '쓸쓸한 맛' ? 'white' : 'black', backgroundColor: selectedFlavor === '쓸쓸한 맛' ? 'black' : 'white' }}>쓸쓸한 맛</button>
                    <button onClick={() => handleButtonClick('짠 맛')} style={{ color: selectedFlavor === '짠 맛' ? 'white' : 'black', backgroundColor: selectedFlavor === '짠 맛' ? 'black' : 'white' }}>짠 맛</button>
                    <button onClick={() => handleButtonClick('톡 쏘는 맛')} style={{ color: selectedFlavor === '톡 쏘는 맛' ? 'white' : 'black', backgroundColor: selectedFlavor === '톡 쏘는 맛' ? 'black' : 'white' }}>톡 쏘는 맛</button>
                  </div>
                </div>
              </div>
              {/* 밑에 div 건들이지 말기 */}
            </div>

            <div className="add-button">
              <Link to='/recipe'>
                <button onSubmit={handleSubmit} className="submit-button" type="submit">올리기</button>
              </Link>
            </div>
          </form>

        </div>
      </div>
  );
};

export default AddRecipe2;


