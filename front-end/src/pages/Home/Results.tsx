import styled from "styled-components";


type Props = {
    toggleSideBar: Function;
    sidebarOpened: boolean;
    imageResults: object;
}


const Results = (props: Props) => {

    const handleClose = () => {
        props.toggleSideBar();
    }

    const temp_result = require("./temp_results.json");

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
                {
                    temp_result.length === 0
                        ? <div className="no-results">
                            아직 결과가 나오지 않았습니다! 챗봇과 이야기를 나누며 옷 추천을 받으세요!
                        </div>
                        : <>
                            <div className="results-tags">상의</div>
                            <div className="results-container">
                                {
                                    temp_result.top.map((infoObject: any, i: number) => {
                                        
                                        return (
                                            <div key={i} className="result-container">
                                                <div className="content-image">
                                                    <img src={infoObject.imageLink} className="images" />
                                                </div>
                                                <div className="result-content-container">
                                                    <div className="content-name">{infoObject.name}</div>
                                                    <div className="content-brand">{infoObject.brand}</div>
                                                    <a className="purchase-link" href={infoObject.purchaseLink} target="_blank">구매하러 가기</a>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <br/><br/>
                            <div className="results-tags">하의</div>
                            <div className="results-container">
                                {
                                    temp_result.bottom.map((infoObject: any, i: number) => {
                                        
                                        return (
                                            <div key={i} className="result-container">
                                                <div className="content-image">
                                                    <img src={infoObject.imageLink} className="images" />
                                                </div>
                                                <div className="result-content-container">
                                                    <div className="content-name">{infoObject.name}</div>
                                                    <div className="content-brand">{infoObject.brand}</div>
                                                    <a className="purchase-link" href={infoObject.purchaseLink} target="_blank">구매하러 가기</a>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <br/><br/>
                            <div className="results-tags">신발</div>
                            <div className="results-container">
                                {
                                    temp_result.shoe.map((infoObject: any, i: number) => {
                                        
                                        return (
                                            <div key={i} className="result-container">
                                                <div className="content-image">
                                                    <img src={infoObject.imageLink} className="images" />
                                                </div>
                                                <div className="result-content-container">
                                                    <div className="content-name">{infoObject.name}</div>
                                                    <div className="content-brand">{infoObject.brand}</div>
                                                    <a className="purchase-link" href={infoObject.purchaseLink} target="_blank">구매하러 가기</a>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <br/><br/>
                            <div className="results-tags">악세서리</div>
                            <div className="results-container">
                                {
                                    temp_result.accessory.map((infoObject: any, i: number) => {
                                        
                                        return (
                                            <div key={i} className="result-container">
                                                <div className="content-image">
                                                    <img src={infoObject.imageLink} className="images" />
                                                </div>
                                                <div className="result-content-container">
                                                    <div className="content-name">{infoObject.name}</div>
                                                    <div className="content-brand">{infoObject.brand}</div>
                                                    <a className="purchase-link" href={infoObject.purchaseLink} target="_blank">구매하러 가기</a>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                }
            </div>
        </Container>
    )
}
export default Results;

const Container = styled.div`
    background-color: white;
    height: 85vh;
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
        margin: 2%;
        /* border: 2px dashed black; */
        display: grid;
        grid-template-columns: repeat(2, 45%);
        grid-template-rows: repeat(2, 17vh);
        grid-gap: 5%;
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