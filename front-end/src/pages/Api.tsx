import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as ScrewbarLogo } from "../public/logo.svg";

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
                    <ScrewbarLogo />
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
        // <Container>
        //     <div className="key-container">
        //         <h1 className="key-title">Open AI API Token</h1>

        //         <input className="key-input" onChange={handleOpenAIChange} onKeyDown={handleKeyDown} value={input}/>
        //         <button className="key-button"onClick={handleSubmit} >확인</button>
        //     </div>

        //     <div className="instruction-container">
        //         <div><a href="https://platform.openai.com/" target="_blank">OpenAI</a> 플랫폼으로 이동하여 로그인하여 API Token을 생성해주시고 넣어주세요.</div>
        //     </div>
        // </Container>
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
      svg {
        width: 100%;
        height: 300px;
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

// const Container = styled.div`
//     /* border: 2px dashed red; */
//     height: 80vh;
//     width: 80vw;
//     margin: auto;

//     .key-container {
//         /* border: 2px dashed yellow; */
//         margin: 5%;
//         height: 40vh;
//     }
//     .key-title {
//         margin-top: 2%;
//         margin-bottom: 2%;
//     }
//     .key-input {
//         width: 100%;
//         height: 5vh;
//     }
//     .key-button {
//         float: right;
//         margin-top: 2%;
//     }

//     .instruction-container {
//         border: 2px solid black;
//         height: 30vh;
//         padding: 3%;
//         box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
//         border-radius: 10px;
//     }
// `;