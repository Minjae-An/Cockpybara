import React, { useState } from 'react';
import './AddRecipe.css';

const AddRecipe = () => {
  //초기값 세팅
  const [title, setTitle] = React.useState("");
  const [explan, setExplan] = React.useState("");
  const [inexplan, setInexplan] = React.useState("");

  //재료 추가 버튼 
  const [showExtraIngredients, setShowExtraIngredients] = useState(false);
  const [additionalIngredients, setAdditionalIngredients] = useState([]);

  // 단계 정보를 배열로 관리합니다.
  const [steps, setSteps] = useState(['']);

  //파일 업로드 상태 추가 
  const [selectedFile, setSelectedFile] = useState(null);

  // 맛을 선택할 수 있는 옵션들
  const [flavors, setFlavors] = useState([]);

  // 오류메세지 상태 저장
  const [titleMessage, setTitleMessage] = React.useState("");
  const [explanMessage, setExplanMessage] = React.useState("");
  const [inexplanMessage, setInexplanMessage] = React.useState("");

  // 유효성 검사
  const [isTitle, setIsTitle] = React.useState(false);
  const [isExplan, setIsExplan] = React.useState(false);
  const [isInexplan, setIsInexplan] = React.useState(false);

  //재료 옵션 
  const options = [
    { value: 'option1', label: '단위1' },
    { value: 'option2', label: '단위2' },
  ];

  //단계 추가 
  const [inputs, setInputs] = useState([{ value: '' }]);

  const handleAddInput = () => {
    setInputs((prevInputs) => [...prevInputs, { value: '' }]);
  };
  //단계 추가 함수 
  const handleChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].value = event.target.value;
    setInputs(newInputs);
  };


  //유효성 검사 함수 
  const onChangeTitle = (e) => {
    const currentTitle = e.target.value;
    setTitle(currentTitle);

    if (currentTitle.length > 30) {
      setTitleMessage("최대 30자까지만 입력 가능합니다.");
      setIsTitle(false);
    } else {
      setTitleMessage("");
      setIsTitle(true);
    }
  };

  const onChangeExplan = (e) => {
    const currentExplan = e.target.value;
    setExplan(currentExplan);

    if (currentExplan.length > 300) {
      setExplanMessage("최대 300자까지만 입력 가능합니다.");
      setIsExplan(false);
    } else {
      setExplanMessage("");
      setIsExplan(true);
    }
  };

  const onChangeInexplan = (e) => {
    const currentInexplan = e.target.value;
    setInexplan(currentInexplan);

    if (currentInexplan.length > 50) {
      setInexplanMessage("최대 50자까지만 입력 가능합니다.");
      setIsInexplan(false);
    } else {
      setInexplanMessage("");
      setIsInexplan(true);
    }
  };

  // 새로운 입력 필드를 추가하는 함수
  const handleAddStep = () => {
    setSteps([...steps, '']);
  };

  // 맛을 선택하는 함수
  const handleFlavorSelection = (flavor) => {
    // 이미 선택한 맛인지 확인
    const isFlavorSelected = flavors.includes(flavor);

    if (isFlavorSelected) {
      // 이미 선택된 맛이라면 제거
      setFlavors(flavors.filter((selectedFlavor) => selectedFlavor !== flavor));
    } else {
      // 선택되지 않은 맛이라면 추가 (최대 3개까지만 가능)
      if (flavors.length < 3) {
        setFlavors([...flavors, flavor]);
      }
    }
  };

  //파일 선택 처리 함수 
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  //재료 추가 버튼 함수 
  {/*
 const handleToggleExtraIngredients = () => {
    setShowExtraIngredients(!showExtraIngredients);
  };
  const handleAddIngredient = () => {
    setAdditionalIngredients([...additionalIngredients, { name: '', amount: '', unit: '' }]);
  };
*/}

  const handleAddIngredient = () => {
    setAdditionalIngredients([...additionalIngredients, { name: '', amount: '', unit: '' }]);
  };



  return (
    <div className="receipe">
      <div className="welcome-title">당신의 레시피를 소개해주세요!</div>
      <div className="form">
        <div className="receipe-detail">
          <div className="receipe-photo-box">


            <div className="receipe-photo">
              <label htmlFor="file-upload" className="file-upload-label">
              </label>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />

              사진 넣기 기능 구현해야돼
            </div>






          </div>
          <div className="receipe-detail-box">

            <div className="receipe-title-box">
              <div className="receipe-title-text">레시피 제목 <span>*</span></div>
              <div className="receipe-title-input">
                <input id="title" name="title" value={title} onChange={onChangeTitle} maxLength={30} placeholder="제목을 입력해 주세요. (최대 30자)" />
                <p className="titlemessage">{titleMessage}</p>
              </div>
            </div>

            <div className="receipe-explan-box">
              <div className="receipe-explan-text">레시피 설명 <span>*</span></div>
              <div className="receipe-explan-input">
                <input id="explan" name="explan" value={explan} onChange={onChangeExplan} maxLength={300} placeholder="설명을 입력해 주세요. (최대 300자)" />
                <p className="explanmessage">{explanMessage}</p>
              </div>
            </div>



            <div className="receipe-ingredient-box">
              <div className="receipe-ingredient-text">재료 <span>*</span></div>
              <div className="receipe-ingredient-detail-box">

                <div className="receipe-ingredient-name-box">
                  <div className="receipe-ingredient-name-text">
                    이름
                  </div>
                  <div className="receipe-ingredient-name-input">
                    <input id="ingredient-name" name="ingredient-name" placeholder="이름을 입력해 주세요.">
                    </input>
                  </div>
                </div>

                <div className="receipe-ingredient-amount-box">
                  <div className="receipe-ingredient-amount-text">
                    용량
                  </div>
                  <div className="receipe-ingredient-amount-input">
                    <input id="inamount" name="inamount" placeholder="용량을 입력해 주세요."></input>
                    <select>
                      <option>단위1</option>
                      <option>단위2</option>
                    </select>
                  </div>
                </div>

                {/* 추가 재료 입력 */}
                {additionalIngredients.map((ingredient, index) => (
                  <React.Fragment key={index}>
                    <div className="receipe-ingredient-name-box">
                      <div className="receipe-ingredient-name-text">
                        이름
                      </div>
                      <div className="receipe-ingredient-name-input">
                        <input
                          name={`ingredient-name-${index}`}
                          placeholder="이름을 입력해 주세요."
                          value={ingredient.name}
                          onChange={(e) => {
                            const updatedIngredients = [...additionalIngredients];
                            updatedIngredients[index].name = e.target.value;
                            setAdditionalIngredients(updatedIngredients);
                          }}
                        />
                      </div>
                    </div>

                    <div className="receipe-ingredient-amount-box">
                      <div className="receipe-ingredient-amount-text">
                        용량
                      </div>
                      <div className="receipe-ingredient-amount-input">
                        <input
                          name={`ingredient-amount-${index}`}
                          placeholder="용량을 입력해 주세요."
                          value={ingredient.amount}
                          onChange={(e) => {
                            const updatedIngredients = [...additionalIngredients];
                            updatedIngredients[index].amount = e.target.value;
                            setAdditionalIngredients(updatedIngredients);
                          }}
                        />
                        <select
                          name={`ingredient-unit-${index}`}
                          value={ingredient.unit}
                          onChange={(e) => {
                            const updatedIngredients = [...additionalIngredients];
                            updatedIngredients[index].unit = e.target.value;
                            setAdditionalIngredients(updatedIngredients);
                          }}
                        >
                          <option>단위1</option>
                          <option>단위2</option>
                        </select>
                      </div>
                    </div>
                  </React.Fragment>
                ))}

                {/* 추가 재료 추가 버튼 */}
                <button className="plusbutton" onClick={handleAddIngredient}>재료 추가</button>
              </div>
            </div>


            <div className="receipe-step-box">
              <div className="receipe-step-text">단계 <span>*</span></div>
              <div className="receipe-step-input">
                {inputs.map((input, index) => (
                  <div key={index}>
                    <input
                      placeholder="단계를 입력해 주세요"
                      value={input.value}
                      onChange={(e) => handleChange(index, e)}
                    />
                    {/* 삭제 버튼 */}
                    {index > 0 && (
                      <button onClick={() => {
                        const newInputs = [...inputs];
                        newInputs.splice(index, 1);
                        setInputs(newInputs);
                      }}>삭제 버튼</button>
                    )}
                    <button onClick={handleAddInput}>추가 버튼</button>
                  </div>
                ))}
              </div>
            </div>


<div>
<div>제작 시간</div>
            <select>
              <option>제작 시간1</option>
              <option>제작 시간2</option>
            </select>
</div>
           

            <div>종류</div>
            <select>
              <option>종류1</option>
              <option>종류2</option>
            </select>

            <div>
              <div>맛<span>*</span><span>최대 3개</span></div>
              <div>
                <button
                  onClick={() => handleFlavorSelection('단맛')}
                  className={flavors.includes('단맛') ? 'selected' : ''}
                >
                  상큼한 맛_top
                </button>
              </div>
              <div>

                <button
                  onClick={() => handleFlavorSelection('씁쓸한맛')}
                  className={flavors.includes('씁쓸한맛') ? 'selected' : ''}
                >
                  씁쓸한 맛_bottom
                </button>






                




              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default AddRecipe;