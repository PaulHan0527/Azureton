import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";



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
            <div className="key-container">
                <h1 className="key-title">Open AI API Token</h1>

                <input className="key-input" onChange={handleOpenAIChange} onKeyDown={handleKeyDown} value={input}/>
                <button className="key-button"onClick={handleSubmit} >확인</button>
            </div>

            <div className="instruction-container">
                <div><a href="https://platform.openai.com/" target="_blank">OpenAI</a> 플랫폼으로 이동하여 로그인하여 API Token을 생성해주시고 넣어주세요.</div>
            </div>
        </Container>

    )
}
export default Api;

const Container = styled.div`
    /* border: 2px dashed red; */
    height: 80vh;
    width: 80vw;
    margin: auto;

    .key-container {
        /* border: 2px dashed yellow; */
        margin: 5%;
        height: 40vh;
    }
    .key-title {
        margin-top: 2%;
        margin-bottom: 2%;
    }
    .key-input {
        width: 100%;
        height: 5vh;
    }
    .key-button {
        float: right;
        margin-top: 2%;
    }

    .instruction-container {
        border: 2px solid black;
        height: 30vh;
        padding: 3%;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
        border-radius: 10px;
    }
`;