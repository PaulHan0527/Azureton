import styled from "styled-components";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { useEffect, useState } from "react";
import { MessageModel } from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.css";
import { TypingIndicator } from "@chatscope/chat-ui-kit-react";

type Props = {
    toggleSideBar: Function;
    sidebarOpened: boolean;
    setUpperQ: Function;
    setBottomQ: Function;
    setShoeQ: Function;
    openAiKey: string;
    user: UserProps | undefined;
    setInsIndex: Function;
}

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

const Chat = (props: Props) => {
    const [typing, setTyping] = useState(false);
    const [instructionIdx, setInstructionIdx] = useState(0);
    const [resetButton, setResetButton] = useState(false);
    const { weight, height, gender, age } = props.user ? props.user.info : { weight: 0, height: 0, gender: "", age: 0 };
    const instruction_msg_list = [
        `너는 패션 스타일링 전문가야, 사용자는 ${weight}kg ${height}cm, ${age}세 ${gender}이야, 앞으로 사용자가 인사하면 너는 '저는 패션 스타일링 전문가로서 고객 맞춤형 스타일을 추천해드리겠습니다. 어떤 상황에서 입고갈지 말씀해주세요.' 라고 답변해줘.`,
        "날씨만 짧게 질문해줘. 다른 것은 묻지 말아줘.",
        `${gender}인 사용자가 어떤 패션 스타일을 원하는지 짧게 질문해줘.`,
        "사용자가 원하는 가격대만 짧게 질문해줘. 예시는 들지 말아줘",
        `사용자의 몸무게와 키와 나이와 성별을 간단하게 말해줘. 그 다음 짧게 ${weight}kg ${height}cm, ${age}세 ${gender}이 해당 스타일, 상황, 날씨에 맞는 상의, 하의, 신발을 하나씩만 유명한 브랜드 위주로 추천해줘. 브랜드명은 영어로 알려줘.
        1. 상의: \" 브랜드명 - 상품명 \" - 가격 \n 
        2. 하의: \" 브랜드명 - 상품명 \" - 가격 \n 
        3. 신발: \" 브랜드명 - 상품명 \" - 가격 \n 이런 형식으로 부가 설명없이 추천해줘`,
    ];
    const [messageStack, setMessageStack] = useState<MessageModel[]>([]);

    useEffect(() => {
        if (resetButton === false) {
            handleSend("안녕하세요");
        }
    }, [resetButton])

    const handleSend = async (message: string) => {
        // console.log(message);
        const newMessage: MessageModel = {
            message: message,
            sender: 'user',
            direction: 'outgoing',
            position: 'single'
        };
        const newInstructionMsg: MessageModel = {
            message: instruction_msg_list[instructionIdx],
            sender: 'system',
            direction: 'outgoing',
            position: 'single'
        };
        const newMessageStack = [...messageStack, newMessage, newInstructionMsg];
        
        setMessageStack(newMessageStack);
        setTyping(true);
        await processMessageToChatGPT(newMessageStack);
    }

    const reset = () => {
        setInstructionIdx(0);
        props.setInsIndex(0);
        setMessageStack([]);
        setResetButton(false);
        // handleSend();
    }
    
    async function processMessageToChatGPT(messageStack: MessageModel[]) {
        let apiMessages = messageStack.map((messageObject: MessageModel) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            }
            else if (messageObject.sender === "system") {
                role = "system";
            }
            else {
                role = "user";
            }
            return { role: role, content: messageObject.message }
        })
        // 여기서 다른 펑션이든 뭐든 이니셜 인스트럭션 (시나리오) 짜서 apiRequestBody -> messages 어레이안에 먼저 넣어놓기
        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                ...apiMessages
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + props.openAiKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            console.log(data);
            return data.json();
        }).then((data) => {
            console.log(data);
            let responseContent = data.choices[0].message.content;
            let response: MessageModel = {
                message: responseContent,
                sender: "ChatGPT",
                direction: "incoming",
                position: "single"
            }
            if (instructionIdx === 4) {
                // 챗GPT 답변에서 데이터 넣어주기
                // const upperData = 
                // const bottomData = 
                // const shoeData = 
                console.log('===================')
                console.log(responseContent);
                let indices = [];
                for(let i = 0; i < responseContent.length; i++) {
                    if(responseContent[i] === '\"') {
                        indices.push(i);
                    }
                }
                // console.log(responseContent.substring(indices[0]+1, indices[1]))
                // console.log(responseContent.substring(indices[2]+1, indices[3]))
                // console.log(responseContent.substring(indices[4]+1, indices[5]))
                props.setUpperQ(responseContent.substring(indices[0]+1, indices[1]));
                props.setBottomQ(responseContent.substring(indices[2]+1, indices[3]));
                props.setShoeQ(responseContent.substring(indices[4]+1, indices[5]));
                setResetButton(true);
            }
            setMessageStack(
                [...messageStack, response]
            )
            setTyping(false);
        })
        setInstructionIdx(instructionIdx + 1);
        props.setInsIndex(instructionIdx + 1);
    }

    return (
        <Container>


            <div className="chatbot-container">
            {
                resetButton ?
                    <div className="button" onClick={reset}>
                        다시하기
                    </div>
                    : <></>
            }
                <MainContainer style={{ border: "transparent" }}>
                    <ChatContainer>
                        <MessageList
                            typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing" /> : null}
                        >
                            {
                                messageStack.filter((message) => message.sender !== "system")
                                    .map((message, i) => {
                                        return (
                                            <>
                                                {
                                                    message.sender === "ChatGPT" ?
                                                        <Message.Header sender={message.sender} /> :
                                                        <></>
                                                }
                                                <Message
                                                    className={message.direction === "outgoing" ? "outgoing-message" : "incoming-message"}
                                                    key={i} model={message}
                                                />
                                            </>
                                        )
                                    })
                            }

                        </MessageList>
                        <MessageInput
                            placeholder={resetButton ? '다시하기 버튼을 눌러주세요!' :'채팅을 쳐보세요!'} attachButton={false} sendButton={false} disabled={instructionIdx > 4}
                            style={{ border: "transparent", height: "10%", fontSize: "larger" }}
                            onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>

                {/* <button onClick={() => {}}>toggle</button> */}
            </div>
        </Container>
    )
}
export default Chat;

const Container = styled.div`
    width: 100%;
    height: 100%;

    .chatbot-container {
        background-color: white;
        border: black 1px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        height: 95%;
        margin: 1%;
        border-radius: 20px;
        padding: 3%;
    }

    .outgoing-message {
        font-size: larger;
    }
    .incoming-message {
        font-size: larger;
    }

    .button-container {
        position: fixed;
        /* border: 2px dashed red; */
        height: 10%;
        width: 10%;
        top: 15%;
        left: 12%;
        z-index: 9;
    }
    .button {
        position: fixed;
        top: 15%;
        left: 12%;
        align-items: center;
        display: flex;
        justify-content: center;
        z-index: 100;
        background-color: #77e6ff;
        color: #000000;
        height: 5%;
        width: 7%;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        transition: 0.3s;
        font-weight: 800;
    }
    .button:hover {
        cursor: pointer;
        scale: 1.05;
        transition: 0.3s;
    }
`;