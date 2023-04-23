import styled from "styled-components";




const Container = styled.div`
    width: 100%;
    height: 100%;

    .chatbot-container {
        background-color: white;
        border: black 1px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        height: 96%;
        margin: 1%;
        border-radius: 20px;
        padding: 3%;
    }
`;

type Props = {
    toggleSideBar: Function;
    sidebarOpened: boolean;
}


const Chat = (props : Props) => {

    const temp = () => {
        props.toggleSideBar();
    }

    return (
        <Container>
            <div className="chatbot-container">
                <div>Chat</div>
            
                <button onClick={temp}>toggle</button>
            </div>
        </Container>
    )
}
export default Chat;