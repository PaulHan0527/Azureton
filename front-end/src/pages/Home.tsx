import styled from "styled-components";
import Chat from "./Home/Chat";
import Results from "./Home/Results";
import { useState } from "react";


const Home = () => {

    const [sidebarClassName, setSidebarClassName] = useState("sidebar-container closed");
    const [sidebarOpened, setSidebarOpened] = useState(false);
    const [imageResults, setImageResults] = useState({}); // string array of image links

    const toggleSideBar = () => {
        if(sidebarClassName.includes("opened")) {
            setSidebarClassName("sidebar-container closed");
        }
        else {
            setSidebarClassName("sidebar-container opened")
        }
        setSidebarOpened(!sidebarOpened);

    }



    return (
        <Container>
            <div className="chat-container">
                <Chat
                    toggleSideBar={toggleSideBar}
                    sidebarOpened={sidebarOpened}
                    setImageResults={setImageResults}
                />
            </div>
            <div className={sidebarClassName}>
                <Results
                    toggleSideBar={toggleSideBar}
                    sidebarOpened={sidebarOpened}
                    imageResults={imageResults}
                />
            </div>
            <div className="button-container">
                <button className="button" onClick={toggleSideBar}>{sidebarOpened ? "결과 닫기" : "결과 보기"}</button>
            </div>
        </Container>
    )
}
export default Home;

const Container = styled.div`
    width: 100vw;
    height: 90vh;
    border: 2px dashed transparent;

    .chat-container {
        height: 95%;
        /* border: 2px dashed black; */
    }
    .sidebar-container {
        height: 85vh;
        margin-top: 10vh;
        width: 0;
        position: fixed;
        z-index: 1;
        top: 0;
        right: 0;
        transition: 0.5s;
        /* border: 2px dashed red; */
    }
    .opened {
        width: 50%;
    }
    .closed {
        width: 0;
    }
    .button {
        position: fixed;
        display: block;
        top: 2%;
        right: 10%;
        z-index: 10 !important;
        background-color: #77e6ff;
        color: #000000;
        height: 5%;
        width: 7%;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        transition: 0.3s;
    }
    .button:hover {
        cursor: pointer;
        scale: 1.05;
        transition: 0.3s;
    }
`;