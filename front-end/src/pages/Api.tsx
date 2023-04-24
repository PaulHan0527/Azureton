import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import screwbarLogo from "../public/logo.jpg";

type Props = {
    setOpenAiKey: Function;
}

const Api = (props: Props) => {
    const navigate = useNavigate();
    const [input, setInput] = useState("");


    const handleOpenAIChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
          handleSubmit();
        }
      }

    const handleSubmit = () => {
        props.setOpenAiKey(input)
        navigate('/home');
    }
    return (
        <Container>
            <div className="apikey-form-wrapper">
                <div className='apikey-form-logo-wrapper'>
                    <img src={screwbarLogo} />
                </div>
                <div className='input-wrapper'>
                    <div className='input-title'>
                        Oepn AI API Token
                    </div>
                    <input
                        className='text-input'
                        type='text'
                        placeholder='OpenAI API Token'
                        onChange={handleOpenAIChange}
                        onKeyDown={handleKeyDown}
                        value={input}
                    />
                </div>
                <div className="input-wrapper">
                    <button onClick={handleSubmit}>확인</button>
                </div>
                <div className="apikey-instruction-wrapper">
                    <div className="apikey-instruction">
                        <a href="https://platform.openai.com/" target="_blank">OpenAI</a> 플랫폼으로 이동하여 로그인 후 API Token을 생성해주시고 넣어주세요.
                    </div>
                </div>
            </div>
        </Container>
    )
}
export default Api;

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .apikey-form-wrapper {
    width: 60vh;
    /* height: 500px; */
    border: 1px solid black;
    border-radius: 4px;
    margin-top: 16px;
    padding: 20px;

    .apikey-form-logo-wrapper{
      img {
        width: 400px;
        height: 160px;
      }
    }

    .input-wrapper {
      position: relative;
      margin-bottom: 16px;
      display: flex;
      justify-content: center;

      .input-title {
        width: 90%;
        line-height: 40px;
        margin-bottom: 5px;
        font-size: 16px;
      }
      .text-input {
        position: relative;
        width: 90%;
        height: 40px;
        padding: 0 10px 0 10px;
        border: 1px solid black;
        border-radius: 4px;
        font-size: 16px;
        outline: none;
      }
      button {
        width: 100%;
        height: 40px;
        border: 0;
        border-radius: 4px;
        background-color: #ff5a5f;
        color: white;
        font-size: 16px;
        font-weight: 800;
        outline: none;
        cursor: pointer;
      }
    }

    .apikey-instruction-wrapper {
        border-top: 1px solid black;
        margin-top: 30px;
        padding-top: 10px;
        .apikey-instruction {
            line-height: 24px;
        }
    }
  }
`;