import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

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

interface IProps {
  loggedIn: boolean;
  setLoggedIn: Function;
};

const Header: React.FC<IProps> = (props: IProps) => {
  const navigate = useNavigate();


  const handleLogInButton = () => {
    if(props.loggedIn) {
      // logout
      props.setLoggedIn(false);
      navigate("/signin");
    }
    else {
      // login
      navigate("/signin");
    }
  }
  return (
    <Container>
      <div className="header-logo-wrapper">
        <Link className="header-logo" to="/">Logo</Link>
      </div>
      <div className="header-auth-buttons">
        <button type="button" className="header-signup-button" onClick={() => navigate('/signup')}>회원가입</button>
        <button type="button" className="header-signin-button" onClick={handleLogInButton}>{props.loggedIn ? "로그아웃" : "로그인"}</button>
      </div>
    </Container>
  )
};

export default Header;
