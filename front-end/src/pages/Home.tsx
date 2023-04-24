import styled from "styled-components";
import Chat from "./Home/Chat";
import Results from "./Home/Results";
import { useState, useEffect } from "react";
import axios from "axios";
import palette from "../styles/palette";

// SEARCH_ENGINE_ID 와 GSE_API_KEY 값을 직접 바꿔서 넣어주세요.
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;
const GSE_API_KEY = process.env.GSE_API_KEY;

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
    const [upperQ, setUpperQ] = useState<any>("");
    const [bottomQ, setBottomQ] = useState<any>("");
    const [shoeQ, setShoeQ] = useState<any>("");
    const [upperItem, setUpperItem] = useState<any>();
    const [bottomItem, setBottomItem] = useState<any>();
    const [shoeItem, setShoeItem] = useState<any>();
    const [insIndex, setInsIndex] = useState(0);

    useEffect(() => {
        if (upperQ === "") return setUpperQ("");
        async function fetchData() {
            await axios.get(`https://customsearch.googleapis.com/customsearch/v1?cx=${SEARCH_ENGINE_ID}&num=1&q=${upperQ.name}&searchType=image&key=${GSE_API_KEY}`)
                .then((res) => {
                    // res.data.items[0].image.thumbnailLink - 사진링크
                    // res.data.items[0].image.contextLink - 구매링크
                    // upperQ - 이름
                    setUpperItem({
                        thumbnail_link: res.data.items[0].image.thumbnailLink,
                        purchase_link: res.data.items[0].image.contextLink,
                        name: upperQ.name,
                        price: upperQ.price,
                        introduction: upperQ.introduction,
                    })
                });
        }
        fetchData();
    }, [upperQ]);

    useEffect(() => {
        if (bottomQ === "") return setBottomQ("");
        async function fetchData() {
            await axios.get(`https://customsearch.googleapis.com/customsearch/v1?cx=${SEARCH_ENGINE_ID}&num=1&q=${bottomQ.name}&searchType=image&key=${CGSE_API_KEY}`)
                .then((res) => {
                    setBottomItem({
                        thumbnail_link: res.data.items[0].image.thumbnailLink,
                        purchase_link: res.data.items[0].image.contextLink,
                        name: bottomQ.name,
                        price: bottomQ.price,
                        introduction: bottomQ.introduction,
                    })
                });
        }
        fetchData();
    }, [bottomQ]);

    useEffect(() => {
        if (shoeQ === "") return setShoeQ("");
        async function fetchData() {
            await axios.get(`https://customsearch.googleapis.com/customsearch/v1?cx=${SEARCH_ENGINE_ID}&num=1&q=${shoeQ.name}&searchType=image&key=${CGSE_API_KEY}`)
                .then((res) => {
                    setShoeItem({
                        thumbnail_link: res.data.items[0].image.thumbnailLink,
                        purchase_link: res.data.items[0].image.contextLink,
                        name: shoeQ.name,
                        price: shoeQ.price,
                        introduction: shoeQ.introduction,
                    })
                });
        }
        fetchData();
    }, [shoeQ]);

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
            <div className="button-container-1">
                {
                    insIndex > 4 
                        ? <div className="button-1" onClick={toggleSideBar}>{sidebarOpened ? "결과 닫기" : "결과 보기"}</div>
                        : <></>
                }
            </div>
            <div className="chat-container">
                <Chat
                    toggleSideBar={toggleSideBar}
                    sidebarOpened={sidebarOpened}
                    setUpperQ={setUpperQ}
                    setBottomQ={setBottomQ}
                    setShoeQ={setShoeQ}
                    openAiKey={props.openAiKey}
                    user={props.user}
                    setInsIndex={setInsIndex}
                />
            </div>
            <div className={sidebarClassName}>
                <Results
                    toggleSideBar={toggleSideBar}
                    sidebarOpened={sidebarOpened}
                    upperItem={upperItem}
                    bottomItem={bottomItem}
                    shoeItem={shoeItem}
                />
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
    .button-container-1 {
        position: fixed;
        /* border: 2px dashed red; */
        height: 10%;
        width: 10%;
        top: 3%;
        left: 12%;
        z-index: 9;
    }
    .button-1 {
        position: fixed;
        top: 15%;
        left: 3%;
        align-items: center;
        display: flex;
        justify-content: center;
        z-index: 100;
        background-color: ${palette.iron};
        color: #000000;
        height: 5%;
        width: 7%;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        transition: 0.3s;
        font-weight: 800;
    }
    .button-1:hover {
        cursor: pointer;
        scale: 1.05;
        transition: 0.3s;
    }
`;