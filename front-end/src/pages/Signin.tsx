import styled from "styled-components";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import screwbarLogo from "../public/logo.jpg";

interface Props {
  loggedIn: boolean;
  setLoggedIn: Function;
  openAiKey: string;
  setUser: Function;
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
      
      navigate("/api");
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
    props.setUser(user);
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
      <div className="signin-form-wrapper">
        <div className='signin-form-logo-wrapper'>
          <img src={screwbarLogo} alt="logo" />
        </div>
        <div className='input-wrapper'>
          <div className='input-title'>
            아이디
          </div>
          <input
            className='text-input'
            type='text'
            name='username'
            placeholder='아이디'
            value={id}
            onChange={handleIDChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        {
          failed ? <div style={{color: "red", marginBottom: "2%"}}>해당 아이디는 존재하지 않습니다!</div> : <></>
        }
        <div className='input-wrapper'>
          <div className='input-title'>
            비밀번호
          </div>
          <input
            className='text-input'
            type='password'
            name='password'
            placeholder='비밀번호'
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className='input-wrapper'>
          <button onClick={submit}>로그인</button>
        </div>
      </div>
    </Container>
  );
};

export default Signin;

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .signin-form-wrapper {
    width: 60vh;
    /* height: 500px; */
    border: 1px solid black;
    border-radius: 4px;
    margin-top: 16px;
    padding: 20px;

    .signin-form-logo-wrapper{
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
      .input-error {
        position: relative;
        font-size: 16px;
        color: red;
        float: right;
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
  }
`;
