import styled from "styled-components";

type Props = {
    toggleSideBar: Function;
    sidebarOpened: boolean;
    imageResults: object;
    upperItem: any;
    bottomItem: any;
    shoeItem: any;
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

            <div className="content-container">
                <div className="results-tags">상의</div>
                    {
                        props.upperItem ?
                            <>
                                <div className="results-container">
                                    <div className="item-img">
                                        <img src={props.upperItem.thumbnail_link} alt="no-img" referrerPolicy="no-referrer" />
                                    </div>
                                    <div className="item-introduction-wrapper">
                                        <div className="item-name">{props.upperItem.name}</div>
                                        <div className="item-price">가격: {props.upperItem.price}</div>
                                        <div className="item-introduction">설명: {props.upperItem.introduction}</div>
                                        <a
                                            href={props.upperItem.purchase_link}
                                            target="_blank"
                                            className="item-purchase-link"
                                        >
                                            구매하러가기
                                        </a>
                                    </div>
                                </div>
                            </>
                        :
                            <>
                                <div className="no-info-item">죄송합니다. 상의 이미지를 찾지 못했습니다.</div>
                            </>
                    }
                <div className="results-tags">하의</div>
                    {
                        props.bottomItem ?
                            <>
                                <div className="results-container">
                                    <div className="item-img">
                                        <img src={props.bottomItem.thumbnail_link} alt="no-img" referrerPolicy="no-referrer" />
                                    </div>
                                    <div className="item-introduction-wrapper">
                                        <div className="item-name">{props.bottomItem.name}</div>
                                        <div className="item-price">가격: {props.bottomItem.price}</div>
                                        <div className="item-introduction">설명: {props.bottomItem.introduction}</div>
                                        <a
                                            href={props.bottomItem.purchase_link}
                                            target="_blank"
                                            className="item-purchase-link"
                                        >
                                            구매하러가기
                                        </a>
                                    </div>
                                </div>
                            </>
                        :
                            <div className="no-info-item">죄송합니다. 하의 이미지를 찾지 못했습니다.</div>
                    }
                <div className="results-tags">신발</div>
                    {
                        props.shoeItem ?
                            <>
                                <div className="results-container">
                                    <div className="item-img">
                                        <img src={props.shoeItem.thumbnail_link} alt="no-img" referrerPolicy="no-referrer" />
                                    </div>
                                    <div className="item-introduction-wrapper">
                                        <div className="item-name">{props.shoeItem.name}</div>
                                        <div className="item-price">가격: {props.shoeItem.price}</div>
                                        <div className="item-introduction">설명: {props.shoeItem.introduction}</div>
                                        <a
                                            href={props.shoeItem.purchase_link}
                                            target="_blank"
                                            className="item-purchase-link"
                                        >
                                            구매하러가기
                                        </a>
                                    </div>
                                </div>
                            </>
                        :
                            <div className="no-info-item">죄송합니다. 신발 이미지를 찾지 못했습니다.</div>
                    }
            </div>
        </Container>
    )
}
export default Results;

const Container = styled.div`
    background-color: white;
    height: 80vh;
    margin: 3%;
    border-radius: 20px;
    border: 1px black;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    
    .header {
        /* border: 2px dashed black; */
        height: 3%;
        width: 100%;
    }
    .content-container {
        /* border: 2px dashed black; */
        height: 85%;

        width: 100%;
        overflow-y: scroll;
    }

    .no-results {
        margin: 3%;
    }

    .results-tags {
        font-weight: 600;
        padding-left: 3%;
        width: 90%;
        margin-left: 3%;
        padding-bottom: 2%;
        border-bottom: 1px solid black;
    }

    .results-container {
        padding: 10px 50px;
        display: flex;
        margin-bottom: 20px;
        /* border: 2px dashed black; */
        .item-img {
            width: 200px;
            /* height: 170px; */
        }
        .item-introduction-wrapper {
            div {
                line-height: 22px;
                margin-bottom: 5px;
            }
            .item-name {
                font-weight: bold;
                margin-bottom: 10px;
            }
            
            .item-purchase-link {
            }
        }
    }
    .result-container {
        /* border: 2px dashed black; */
        box-shadow: rgba(0, 0, 0, 0.35) 5px 5px 10px;
        border-radius: 10px;
        display: flex;
    }

    .result-content-container {
        display: grid;
        grid-template-rows: repeat(3, 30%);
        margin-top: 7%;
    }

    .content-image {
        /* border: 2px dashed red; */
        margin: 3%;
        height: 90%;
        width: 45%;
    }
    .content-name {
        font-size: larger;
        font-weight: bolder;
    }
    .content-brand {

    }
    .purchase-link {
        margin-top: 15%;
        font-size: smaller;
        font-weight: lighter;
    }
    .images {
        width: 100%;
        height: 100%;
        box-shadow: rgba(0, 0, 0, 0.35) 5px 5px 10px;
        border-radius: 10px;
    } 


    .close-button {
        font-weight: 600;
        font-size: 45px;
        margin: 2%;
        background-color: transparent;
        border: transparent;
        float: right;
    }
    .close-button:hover {
        cursor: pointer;
        text-shadow: rgba(0, 0, 0, 0.35) 5px 5px 10px;
        transition: 0.3s;
    }

    
    ::-webkit-scrollbar {
        width: 10px;
    }
 
    ::-webkit-scrollbar-track {
        background-color: #ebebeb;
        -webkit-border-radius: 10px;
        border-radius: 10px;    
    }

    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        background: #6d6d6d; 
    }    
`;