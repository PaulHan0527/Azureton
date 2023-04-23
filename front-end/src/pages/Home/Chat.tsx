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

const OPENAI_API_KEY = "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";
const OPENAI_API_KEY2 = "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";
type Props = {
    toggleSideBar: Function;
    sidebarOpened: boolean;
    setImageResults: Function;
}

const instruction_msg_list = [
    "앞으로 사용자가 인사하면 너는 '저는 패션 스타일링 전문가로서 고객 맞춤형 스타일을 추천해드리겠습니다.' 라고 답변해줘. 그리고 어떤 스타일과 상황에 필요한지 친절하게 물어봐.",
    "해당 스타일과 상황에 맞는 스타일링을 상의 +하의 +신발 형식으로 추천해줘"
]


const Chat = (props: Props) => {
    const [typing, setTyping] = useState(false);
    const [instructionIdx, setInstructionIdx] = useState(0);

    const [messageStack, setMessageStack] = useState<MessageModel[]>
        ([
            // {
            //     message: "앞으로 사용자가 인사하면 너는 '저는 패션 스타일링 전문가로서 고객 맞춤형 스타일을 추천해드리겠습니다.' 라고 답변해줘. 그리고 어떤 스타일과 상황에 필요한지 친절하게 물어봐.",
            //     sender: "system",
            //     direction: "outgoing", // outgoing or incoming
            //     position: 'single' // 챗 구름 모양
            // },
            // {
            //     message: "안녕하세요",
            //     sender: "user",
            //     direction: "outgoing", // outgoing or incoming
            //     position: 'single' // 챗 구름 모양
            // }
            // , {
            //     message: "안녕하세요 안녕하세요 안녕하세요 안녕하세요",
            //     sender: "ChatGPT",
            //     direction: "incoming", // outgoing or incoming
            //     position: 'single' // 챗 구름 모양
            // },
        ]);

    useEffect(() => {
        handleSend("안녕하세요");
    }, [])

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
        setInstructionIdx(instructionIdx+1);
        await processMessageToChatGPT(newMessageStack);
    }

    /* 
    이 펑션이 여기있는 메세지스택을 (내가 보낸 챗 포함)
    1. 챗지피티 api 콜하고 
    2. 답변받고, 
    3. 메세지스택 업데이트
    4. 그 외 것들 (typing status update)
    5. (해야할 것) 구글 서치 엔진 api 콜해서 이미지 가져오기
    6. (해야할 것) 그 이미지들 (링크들) 정리해서 props.setImageResults 로 링크들 다 넣어주기
    7. (해야할 것) 이미지 다 받았으면, props.toggleSideBar 콜해서 사이드바 열어주기 
    참고***
    여기에서 인스트럭션(시나리오 / 몸무게 / 키 등 environment variable) 짜서 어딘가에 (어딘지모름) 넣어놔야합니다 
    인스트럭션 하면서 저번에 말했던 {role, content} 형식으로 저장을 해놓을지 말지 이야기해봐야해용 
    타입스크립트라 .... 만약 한다면 인터페이스 만들어주고 그걸로 쓰는게 나을듯

    그리고 아마 시간이 안될것같긴하지만, 아싸리 백앤드 만들어서 간단하게 저장가능한 데이터베이스 구현할거면
    유저 인포랑 같이 메세지 스택 같이 저장해두고 로그인할때 같이 가져와서 처음 messageStack state 디클레어할때 해주면 됩니다.
    */
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
                "Authorization": "Bearer " + OPENAI_API_KEY2,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
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
            setMessageStack(
                [...messageStack, response]
            )
            setTyping(false);
        })
    }

    return (
        <Container>
            <div className="chatbot-container">
                <MainContainer style={{ border: "transparent" }}>
                    <ChatContainer>
                        <MessageList
                            typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing" /> : null}
                        >
                            {
                                messageStack.filter((message) =>  message.sender !== "system")
                                .map((message, i) => {
                                    return (
                                        <div key={i}>
                                            {
                                                message.sender === "ChatGPT" ?
                                                <Message.Header sender={message.sender}/> :
                                                <></>
                                            }
                                            <Message
                                                className={message.direction === "outgoing" ? "outgoing-message" : "incoming-message"}
                                                key={i} model={message} 
                                                />

                                        </div>
                                    )
                                })
                            }

                        </MessageList>
                        <MessageInput
                            placeholder='채팅을 쳐보세요!' attachButton={false} sendButton={false}
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
`;