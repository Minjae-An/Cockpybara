import React, { useState } from 'react';
import './AddRecipe2.css'

function AddRecipe2() {
    const [recipeTitle, setRecipeTitle] = useState("");
    const [stepList, setStepList] = useState([<input key={0} />]);
    const [ingredientList, setIngredientList] = useState([]);
    const [isInputClicked, setIsInputClicked] = useState(false);
    const [recipeDescription, setRecipeDescription] = useState("");
    const [ingredientDescription, setIngredientDescription] = useState("");

    const MAX_DESCRIPTION_LENGTH = 300; // 최대 길이
    const MAX_INGREDIENT_DESCRIPTION_LENGTH = 50; // 최대 길이

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
        setStepList([...stepList, <input key={stepList.length} />]);
    };

    const addIngredient = (e) => {
        e.preventDefault();
        setIngredientList([...ingredientList,
        <div className="detail-ingredient" key={ingredientList.length}>
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
        ]);
    };


    return (
        <div className="addrecipe-mainFrame">
            <div className="addrecipe-subFrame">
                <div className="recipe-title">당신의 레시피를 소개해 주세요!</div>
                <form>
                    <div className="add-detail">
                        <div className="add-photo"></div>
                        <div className="add-title">
                            <p>레시피 제목<span>*</span></p>
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
                            <p>레시피 설명<span>*</span></p>
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
                            <p>재료<span>*</span></p>
                            <div className="detail-ingredient">
                                재료 디테일 입니다.
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
                                {ingredientList.map((ingredient, index) => (
                                    <div key={index}>
                                        {ingredient}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <button onClick={addIngredient}>+</button>
                            </div>
                        </div>
                        <div className="add-step">
                            <p>단계<span>*</span></p>
                            {stepList.map((step, index) => (
                                <div key={index}>
                                    {step}
                                </div>
                            ))}
                            <div><button onClick={addStep}>+</button></div>
                        </div>
                        <div className="add-type">
                            <p>종류</p>
                            <select>
                                <option>기타</option>
                                <option>일반 음료</option>
                                <option>홈메이드</option>
                                <option>펀치</option>
                                <option>커피/차</option>
                                <option>칵테일</option>
                                <option>소다</option>
                                <option>샷</option>
                                <option>코코아</option>
                                <option>밀크셰이크</option>
                                <option>맥주</option>
                            </select>
                        </div>
                        <div className="add-flavor">
                            <p>맛<span>*</span></p>
                            <div className="flavor-top">
                                <button>상큼한 맛</button>
                                <button>달달한 맛</button>
                                <button>부드러운 맛</button>
                                <button>새콤한 맛</button>
                            </div>
                            <div className="flavor-bottom">
                                <button>쓸쓸한 맛</button>
                                <button>짠 맛</button>
                                <button>톡 쏘는 맛</button>
                            </div>
                        </div>
                    </div>
                    <div className="add-button">
                        <button type="submit">올리기</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRecipe2;


