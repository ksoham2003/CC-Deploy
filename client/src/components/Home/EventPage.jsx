import "./Home.css";
import SampleImg from "../../assets/slider1.png";
import Header from "../Header/Header";
import { useContext, useEffect, useState } from "react";

import {useParams} from "react-router-dom";
import axios from "axios";
import { Context } from "../../config/Context";

function EventPage(){
    const { id } = useParams();

    const [product, setProducts] = useState([]);
    const {loginInfo, setLoginInfo} = useContext(Context);

    async function getProduct(){
        await axios.post(`${window.location.origin}/api/v1/auth/get-event`, {id}).then((res)=>{
            setProducts(res.data.data);
        }).catch((error)=>{
            console.log(error);
        })
    }

    async function bookNowFunc(){
        console.log(id, loginInfo?._id);
        await axios.post(`${window.location.origin}/api/v1/auth/book`, {eventId: id, userId: loginInfo._id}).then((res)=>{
            // setProducts(res.data.data);
            alert(res.data.message);
        }).catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        getProduct();
    }, [])
    return(
        <>
            <Header/>
            <div className="event-page-main-div">
                <div className="event-page-heading">{product?.name}</div>
                <div className="event-section1-div">
                    <img src={SampleImg} alt="" />
                </div>
                <div className="event-section2-div">
                    <div className="event-detail1">
                        <div>Last Date of Registration:</div>
                        <div>{product?.Rend_date?.slice(0, 10)}</div>
                    </div>
                    <div className="event-detail1">
                        <div>Price:</div>
                        <div>₹{product?.price}/-</div>
                    </div>
                    <div className="event-detail1">
                        <div>Event Date:</div>
                        <div>{product?.start_date?.slice(0, 10)}</div>
                    </div>
                </div>
                <div className="event-desc-div">
                    {product?.description}
                </div>
                {
                    loginInfo ?
                        <div className="event-btn-div">
                            <span onClick={bookNowFunc} className="event-btn">Book Now</span>
                        </div>
                    : <center style={{marginTop: 20}}>
                        Login To Book
                    </center>
                }
            </div>
        </>
    )
}

export default EventPage;