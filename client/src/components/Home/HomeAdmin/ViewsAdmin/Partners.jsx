import React from "react";
// import PartnerCards from "../PartnerCards/PartnerCards";
import PartnerCards from "../../../PartnerCards/PartnerCards";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPartners } from "../../../../redux/actions/index";


export default function Partners() {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('useEffect')
      
        dispatch(getAllPartners()); 
       
    });


    return (
        <PartnerCards/>
    )

}