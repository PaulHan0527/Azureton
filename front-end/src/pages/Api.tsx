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
        height: 20vh;
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
`;