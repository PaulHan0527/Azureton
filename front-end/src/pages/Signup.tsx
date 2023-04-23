import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { readFileSync } from 'fs';

const Signup: React.FC = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userExist, setUserExist] = useState(false);
  const navigate = useNavigate();

  const userExists = (id: string) => {
    let users = require('../userInfo/users.json');
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        return true;
      }
    }
    return false;
  }

  const registerUser = () => {
    const data = readFileSync("userInfo/users.json");
    console.log(data);
    // let json = require('../userInfo/users.json');
    // console.log(json);
    // json.push(userInfo);
    // console.log(json);


    // var rawdata = fs.readFileSync('../userInfo/users.json');
    // var info = JSON.parse(rawdata);
    // console.log(info);
    // fs.readFile('../userInfo/users.json', 'utf8', function readFileCallback(err: any, data: any) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     let obj = JSON.stringify(data);
    //     console.log(obj)
    //     console.log(userInfo);
    //     // let obj = JSON.parse(data); //now it an object
    //     // obj.table.push({ id: 2, square: 3 }); //add some data
    //     // let json = JSON.stringify(obj); //convert it back to json
    //     // fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back 
    //   }
    // });
  }

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (userExists(e.target[0].value)) {
      setUserExist(true);
    }
    else {
      setUserInfo({
        id: e.target[0].value,
        password: e.target[1].value,
        info: {
          age: e.target[2].value,
          weight: e.target[3].value,
          height: e.target[4].value,
          gender: e.target[5].value,
        }
      });
      registerUser();

      // navigate('/signin');
    }
  }

  return (
    <Container onSubmit={onSubmit}>
      <div className='signup-form-wrapper'>
        <div className='input-wrapper'>
          <div className='input-title'>
            아이디
          </div>
          <input className='text-input' type='text' name='id' placeholder='아이디' />
        </div>
        {userExist ?
          <div className='input-wrapper'>
            <div className='input-error'>이미 존재하는 아이디입니다.</div>
          </div>
          : <></>}
        <div className='input-wrapper'>
          <div className='input-title'>
            비밀번호
          </div>
          <input className='text-input' type='password' name='password' placeholder='비밀번호' />
        </div>
        <div className='input-wrapper'>
          <div className='input-title'>
            나이
          </div>
          <input className='number-input' type='number' name='age' placeholder='나이' />
          <div className='input-unit'>세</div>
        </div>
        <div className='input-wrapper'>
          <div className='input-title'>
            몸무게
          </div>
          <input className='number-input' type='number' name='weight' placeholder='몸무게(kg)' />
          <div className='input-unit'>kg</div>
        </div>
        <div className='input-wrapper'>
          <div className='input-title'>
            키
          </div>
          <input className='number-input' type='number' name='height' placeholder='키(cm)' />
          <div className='input-unit'>cm</div>
        </div>
        <div className='input-wrapper'>
          <div className='input-title'>
            성별
          </div>
          <select name='gender'>
            <option value="">성별을 선택해주세요.</option>
            <option value="M">남성</option>
            <option value="F">여성</option>
          </select>
        </div>
        <div className='input-wrapper'>
          <button type='submit'>회원가입</button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.form`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .signup-form-wrapper {
    width: 60vh;
    height: 500px;
    border: 1px solid black;
    border-radius: 4px;
    margin-top: 16px;
    padding: 20px;

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
      .input-unit {
        position: relative;
        width: 10%;
        line-height: 40px;
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
      .number-input {
        position: relative;
        width: 75%;
        height: 40px;
        margin-right: 5px;
        padding: 0 10px 0 10px;
        border: 1px solid black;
        border-radius: 4px;
        font-size: 16px;
        outline: none;
      }
      select {
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
        width: 90%;
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

export default Signup;
