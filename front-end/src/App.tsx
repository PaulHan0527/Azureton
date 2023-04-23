import Header from "./components/Header"
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Api from "./pages/Api";



const App = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [openAiKey, setOpenAiKey] = useState("");

  return (
    <>
      <Header 
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setOpenAiKey={setOpenAiKey}
      />
      <Routes>
        <Route path="/signup" element={<Signup 
    
        />} />
        <Route path="/" element={<Signin 
               loggedIn={loggedIn}
               setLoggedIn={setLoggedIn} 
               openAiKey={openAiKey}
        />} />
        <Route path="/home" element={<Home 
            openAiKey={openAiKey}
        />} />
        <Route path="/api" element={<Api
            setOpenAiKey={setOpenAiKey}
        />} />
      </Routes>
    </>
  );
}

export default App;
