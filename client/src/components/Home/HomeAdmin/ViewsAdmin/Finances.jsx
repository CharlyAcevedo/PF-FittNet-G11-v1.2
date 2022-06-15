import React, { useEffect } from "react";
import IncomesAdmin from "../../../Graphics/IncomesAdmin";
import { getAllSales, getUser } from "../../../../redux/actions";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Finances() {

    let { userId } = useParams();
    
    const dispatch = useDispatch();
  
    useEffect(()=>{
      dispatch(getUser(userId))
      dispatch(getAllSales(userId))// eslint-disable-next-line
    },[userId])


    return (      
        <div>
            <IncomesAdmin/>
        </div> 
    )

}