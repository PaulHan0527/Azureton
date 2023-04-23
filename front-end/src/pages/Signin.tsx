import styled from "styled-components";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Props {
  loggedIn: boolean;
  setLoggedIn: Function;
};

const Signin = (props : Props) => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);

  const handleIDChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    if(e.target.value.length === 0) {
      setFailed(false);
    }

  }
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const submit = async () => {
    if(await authenticate(id, password)) {
      props.setLoggedIn(true);
      setFailed(false);
      navigate('/home');
      return;
    }
    else {
      setFailed(true)
    }
  }

  const authenticate = async (id: string, password: string) : Promise<boolean> => {
    const body = {
      id,
      password,
    };
    const { user, loggedIn } = await axios.post("http://localhost:3001/api/login", body)
      .then((res) => {
        return res.data.data;
      }).catch((e) => {
        console.error(e);
      });

    if (loggedIn) {
      return true;
    }
    return false;
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === 'Enter') {
      submit();
    }
  }

  return (
    <Container>
      <div className="sign-in-container">
        <div className="sign-in-field">아이디</div>
        <input type="text" className='form-input' 
               id='username' placeholder="아이디" 
               onChange={handleIDChange} value={id}
               onKeyDown={handleKeyDown}/>
        {
          failed ? <div style={{color: "red", marginBottom: "2%"}}>해당 아이디는 존재하지 않습니다!</div> : <></>
        }
        <div className="sign-in-field">비밀번호</div>
        <input type="password" className='form-input' 
               id='password' placeholder="비밀번호" 
               onChange={handlePasswordChange} value={password}
               onKeyDown={handleKeyDown}/>
        

        <button className="submit-button" onClick={submit}>로그인</button>
      </div>
    </Container>
  );
};

export default Signin;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  .sign-in-container {
    /* border: 2px dashed black; */
    height: 50vh;
    width: 60vw;
    .sign-in-field {
      /* border: 2px dashed red; */
      display: flex;
      align-items: center;
      height: 10%;
    }
    .submit-button {
      margin-top: 3ch;
      float: right;
      scale: 1.6;
      border-color: #e8e8e8;
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
      }
    }
    input {
      margin-bottom: 3%;
      height: 12%;
      width: 100%;
      padding-left: 20px;
      font-size: large;
    }
  }
`;