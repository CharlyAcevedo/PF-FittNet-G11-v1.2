import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGymDetail } from "../redux/actions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function GymDetail() {
    let { userId } = useParams();
    
    const navigate = useNavigate(); 

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getGymDetail(userId))// eslint-disable-next-line
    },[userId])

    const gymDetail = useSelector((state) => state.gymDetail)


    if (!gymDetail.name) {
        return (
            <img id='loading' src="https://www.sanfranciscohm.com/static/img/loading.gif" alt="loading..." />                           
        )
        
    } else {
        return (
            <div>
                <h3>Vista detalle del gym</h3>
                <div className="box-single-card">
                    <h2>{gymDetail.name}</h2>           
                    <div className="box-card">
                        <h4>☆ {gymDetail.raiting}</h4>
                        <h3>$ {gymDetail.price}</h3>                
                        <img className="image-card" src={gymDetail.image} alt="logo" />
                    </div>                
                </div>
                <button onClick={() => navigate(-1)}>Go back</button>
            </div>        
        )

    }

}