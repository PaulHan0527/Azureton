import styled from "styled-components";







const Container = styled.div`
    background-color: white;
    height: 85vh;
    margin: 3%;
    border-radius: 20px;
    border: 1px black;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    
    .header {
        /* border: 2px dashed black; */
        height: 10%;
        width: 100%;
    }
    .content {
        border: 2px dashed black;
        height: 90%;
    }
    .close-button {
        font-weight: 600;
        font-size: 45px;
        margin: 3%;
        background-color: transparent;
        border: transparent;
        float: right;
    }
    .close-button:hover {
        cursor: pointer;
        text-shadow: rgba(0, 0, 0, 0.35) 5px 5px 10px;
        transition: 0.3s;
    }
    
    
`;

type Props = {
    toggleSideBar: Function;
    sidebarOpened: boolean;
    imageResults: string[];
}


const Results = (props: Props) => {

    const handleClose = () => {
        props.toggleSideBar();
    }

    return (
        <Container>
            <div className="header">
                <button className="close-button" onClick={handleClose}>
                    <div className="times">
                        {props.sidebarOpened ? <div>&times;</div> : <></>}
                    </div>
                </button>
            </div>

            <div className="content">
        result
            </div>

        </Container>
    )
}
export default Results;