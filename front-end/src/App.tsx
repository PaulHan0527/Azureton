import Header from "./components/Header"
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";



const App = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);


  return (
    <>
      <Header 
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <Routes>
        <Route path="/signup" element={<Signup 
    
        />} />
        <Route path="/signin" element={<Signin 
               loggedIn={loggedIn}
               setLoggedIn={setLoggedIn} 
        />} />
        <Route path="/home" element={<Home 
        
        />} />
      </Routes>
    </>
  );
}

export default App;
