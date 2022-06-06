import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGymDetail } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavBar3 } from "./NavBar3";
import CartItem from "../CartItem/CartItem";



export default function GymDetail() {
    let { userId } = useParams();
    
    const navigate = useNavigate(); 

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getGymDetail(userId))// eslint-disable-next-line
    },[userId])

   

    const gymDetail = useSelector((state) => state.gymDetail)
    
    let usuarioId = localStorage.getItem('userId')
    // id de usuario que está en la app
    // console.log(gymDetail, 'id de usuario que está en la app')


    if (!gymDetail.name) {
        return (
            <img id='loading' src="https://www.sanfranciscohm.com/static/img/loading.gif" alt="loading..." />                           
        )
        
    } else {
        return (
            <div>
                <h4 style={{color: "#fff"}}>Id del usuario que navega: {usuarioId ? usuarioId: null}</h4>
                <h2>{gymDetail.name}</h2>
                <h3> ☆ {gymDetail.raiting}</h3>
                <h3> $ {gymDetail.price.$numberDecimal}</h3>
                {/* <h3 id={gymDetail._id} ></h3>  */}
                {/* <h3>{console.log(gymDetail._id)}</h3> */}
                <div>                        
                    <img src={gymDetail.image[1]} alt="logo" />
                </div>
                <div>
                <NavBar3 id={[gymDetail]} usuarioId={usuarioId}/>
                </div>
                <div>
                    {gymDetail.services.map(e => {
                        return (
                            <div  key={e._id}> 
                            <CartItem id={e._id} key={e._id} name={e.name} price={e.price} description={e.description} duration={e.duration} />                            <br></br>
                            </div>
                        )
                    })}
                </div>
                <button onClick={() => navigate(-1)}>Go back</button>
            </div>        
        )

    }

};

//http://localhost:3000/detail/gym/6292dae93fc1e9d735aea34c
// 