import Header from "./components/Header"
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Api from "./pages/Api";

interface UserProps {
  id: string;
  password: string;
  info: {
    weight: number;
    height: number;
    gender: string;
    age: number;
  };
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [openAiKey, setOpenAiKey] = useState("");
  const [user, setUser] = useState<UserProps|undefined>(undefined);

  return (
    <>
      <Header 
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setOpenAiKey={setOpenAiKey}
        user={user}
      />
      <Routes>
        <Route path="/signup" element={<Signup 
    
        />} />
        <Route path="/" element={<Signin 
               loggedIn={loggedIn}
               setLoggedIn={setLoggedIn} 
               openAiKey={openAiKey}
               setUser={setUser}
        />} />
        <Route path="/home" element={<Home 
            openAiKey={openAiKey}
            user={user}
        />} />
        <Route path="/api" element={<Api
            setOpenAiKey={setOpenAiKey}
        />} />
      </Routes>
    </>
  );
}

export default App;
