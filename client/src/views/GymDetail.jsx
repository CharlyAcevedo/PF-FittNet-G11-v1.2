// import React from "react";
// import { useParams } from "react-router-dom";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { getGymDetail } from "../redux/actions";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";


// export default function GymDetail() {
//     let { userId } = useParams();
    
//     const navigate = useNavigate(); 

//     const dispatch = useDispatch();

//     useEffect(()=>{
//         dispatch(getGymDetail(userId))// eslint-disable-next-line
//     },[userId])

//     const gymDetail = useSelector((state) => state.gymDetail)

//     let usuarioId = localStorage.getItem('userId')
//     // id de usuario que está en la app
//     console.log(usuarioId, 'id de usuario que está en la app')

//     if (!gymDetail.name) {
//         return (
//             <img id='loading' src="https://www.sanfranciscohm.com/static/img/loading.gif" alt="loading..." />                           
//         )
        
//     } else {
//         return (
//             <div>
//                 <h4 style={{color: "#fff"}}>Id del usuario que navega: {usuarioId ? usuarioId: null}</h4>
//                 <h3>Vista detalle del gym</h3>
//                 <div>
//                     <h2></h2>           
//                     <div>
//                         <h4>☆ </h4>
//                         <h3>$ </h3>                
//                         <img src={gymDetail.image} alt="logo" />
//                     </div>                
//                 </div>
//                 <button onClick={() => navigate(-1)}>Go back</button>
//             </div>        
//         )

//     }

// }