import styled from "styled-components";
import Chat from "./Home/Chat";
import Results from "./Home/Results";
import { useState } from "react";



const Container = styled.div`
    width: 100vw;
    height: 90vh;
    /* border: 2px dashed yellow; */

    .chat-container {
        height: 100%;
        /* border: 2px dashed black; */
    }
    .sidebar-container {
        height: 90vh;
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
`;



const Home = () => {

    const [sidebarClassName, setSidebarClassName] = useState("sidebar-container closed");
    const [sidebarOpened, setSidebarOpened] = useState(false);

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
                />
            </div>
            <div className={sidebarClassName}>
                <Results
                    toggleSideBar={toggleSideBar}
                    sidebarOpened={sidebarOpened}
                />
            </div>
        </Container>
    )
}
export default Home;