import styled from "styled-components";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReactComponent as ScrewbarLogo } from "../public/logo.svg";

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
          <ScrewbarLogo />
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
      {/* <div className="sign-in-container">
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
      </div> */}
    </Container>
  );
};

export default Signin;

// const Container = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 90vh;
//   .sign-in-container {
//     /* border: 2px dashed black; */
//     height: 50vh;
//     width: 60vw;
//     .sign-in-field {
//       /* border: 2px dashed red; */
//       display: flex;
//       align-items: center;
//       height: 10%;
//     }
//     .submit-button {
//       margin-top: 3ch;
//       float: right;
//       scale: 1.6;
//       border-color: #e8e8e8;
//       border-radius: 21px;
//       background-color: white;
//       cursor: pointer;
//       outline: none;
//       &:hover {
//         box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
//       }
//     }
//     input {
//       margin-bottom: 3%;
//       height: 12%;
//       width: 100%;
//       padding-left: 20px;
//       font-size: large;
//     }
//   }
// `;

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
