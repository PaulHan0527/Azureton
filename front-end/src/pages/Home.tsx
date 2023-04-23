import styled from "styled-components";
import Chat from "./Home/Chat";
import Results from "./Home/Results";
import { useState, useEffect } from "react";
import dotenv from "dotenv";
import axios from "axios";

const CGSE_API_KEY = 'AIzaSyD5i9n2SxJVQGDnTvmWGhSoMCtRyCy_mn0';
const SEARCH_ENGINE_ID = '4360c8a430fd7457f';

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
  

type Props = {
    openAiKey: string;
    user: UserProps|undefined;
}


const Home = (props: Props) => {

    const [sidebarClassName, setSidebarClassName] = useState("sidebar-container closed");
    const [sidebarOpened, setSidebarOpened] = useState(false);
    const [imageResults, setImageResults] = useState({}); // string array of image links
    const [upperQ, setUpperQ] = useState<string>("");
    const [bottomQ, setBottomQ] = useState<string>("");
    const [shoeQ, setShoeQ] = useState<string>("");
    const [upperItems, setUpperItems] = useState<any>();
    const [bottomItems, setBottomItems] = useState<any>();
    const [shoeItems, setShoeItems] = useState<any>();

    useEffect(() => {
        async function fetchData() {
            const upper_items = await axios.get(`https://customsearch.googleapis.com/customsearch/v1?cx=${SEARCH_ENGINE_ID}&num=4&q=${upperQ}&searchType=image&key=${CGSE_API_KEY}`)
                .then((res) => {
                    console.log(res.data.items);
                });
            return upper_items;
        }
        const items = fetchData();
        setUpperItems(items);
    }, [upperQ])

    useEffect(() => {
        async function fetchData() {
            const bottom_items = await axios.get(`https://customsearch.googleapis.com/customsearch/v1?cx=${SEARCH_ENGINE_ID}&num=4&q=${bottomQ}&searchType=image&key=${CGSE_API_KEY}`)
                .then((res) => {
                    console.log(res.data.items);
                });
            return bottom_items;
        }
        const items = fetchData();
        setBottomItems(items);
    }, [bottomQ])

    useEffect(() => {
        async function fetchData() {
            const shoe_items = await axios.get(`https://customsearch.googleapis.com/customsearch/v1?cx=${SEARCH_ENGINE_ID}&num=4&q=${shoeQ}&searchType=image&key=${CGSE_API_KEY}`)
                .then((res) => {
                    console.log(res.data.items);
                });
            return shoe_items;
        }
        const items = fetchData();
        setShoeItems(items);
    }, [shoeQ])

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
                    setUpperQ={setUpperQ}
                    setBottomQ={setBottomQ}
                    setShoeQ={setShoeQ}
                    openAiKey={props.openAiKey}
                    user={props.user}
                />
            </div>
            <div className={sidebarClassName}>
                <Results
                    toggleSideBar={toggleSideBar}
                    sidebarOpened={sidebarOpened}
                    upperItems={upperItems}
                    bottomItems={bottomItems}
                    shoeItems={shoeItems}
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