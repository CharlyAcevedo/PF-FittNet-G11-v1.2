import React from "react";
import UserCards from "../../../UserCards/UserCards";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../../../redux/actions/index";

export default function Users() {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('useEffect')
      
        dispatch(getAllUsers()); 
       
    });



    return (
        <UserCards/>
    )

}