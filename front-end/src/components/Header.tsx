import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";


interface IProps {
  loggedIn: boolean;
  setLoggedIn: Function;
  setOpenAiKey: Function;
};

const Header: React.FC<IProps> = (props: IProps) => {
  const navigate = useNavigate();

  const handleLogOutButton = () => {
    props.setLoggedIn(false);
    props.setOpenAiKey("");
    console.log(props.loggedIn);
    navigate("/");
  }

  const handleLogInButton = () => {
    navigate('/');
  }
  return (
    <Container>
      <div className="header-logo-wrapper">
        <div className="header-logo">Logo</div>
      </div>
      <div className="header-auth-buttons">
        {
          props.loggedIn ? <></> : <button type="button" className="header-signup-button" onClick={() => navigate('/signup')}>회원가입</button>
        }
        {
          props.loggedIn ? 
          <button type="button" className="header-signin-button" onClick={handleLogOutButton}>로그아웃</button>
          :
          <button type="button" className="header-signin-button" onClick={handleLogInButton}>로그인</button>
        }
        
      </div>
    </Container>
  )
};

export default Header;

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;
  
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    .header-logo {
      margin-right: 6px;
    }
  }

  .header-auth-buttons {
    .header-signup-button {
      height: 42px;
      margin-right: 8px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      text-decoration: none;
      &:hover {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
      }
    }
    .header-signin-button {
      height: 42px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
      }
    }
  }
`;