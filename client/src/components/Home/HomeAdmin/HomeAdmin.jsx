import React from "react";
import Finances from "./ViewsAdmin/Finances";
import Partners from "./ViewsAdmin/Partners";
import Users from "./ViewsAdmin/Users";
import ViewPartner from "./ViewsAdmin/ViewPartner";
import ViewUsers from "./ViewsAdmin/ViewUser";
import DeteleteAccount from "./ViewsAdmin/DeleteAccount";
import BlockAccount from "./ViewsAdmin/BlockAccount";
import SearchComponent from "./SearchComponent/SearchComponent";
import { useDispatch } from "react-redux";
import { getAllPartners } from "../../../redux/actions";
import { getAllUsers } from "../../../redux/actions";
import { useEffect } from "react";
import { getLockAccounts } from "../../../redux/actions";
import { useState } from "react";
import { useParams } from "react-router-dom";




export default function HomeAdmin() {
    const [ view , setView ] = useState("finances");

    const dispatch = useDispatch();

    let { userId } = useParams();

    console.log(userId, 'los params')


    // Necesito una barra de búsqueda con filtros
    useEffect(() => {
        console.log('useEffect');
        
        dispatch(getAllPartners());
        dispatch(getAllUsers()); 
        dispatch(getLockAccounts());  
       
    },[userId]);
    
    return(
        <div style={{padding: "20px", color: "#fff" }}>
            <div >
                <SearchComponent/>
            </div>
            <div>
                <button style={{padding: "5px", marginRight:"30px"}} 
                onClick={(e)=>{setView("finances")}}>Finanzas</button>
                <button style={{padding: "5px", marginRight:"30px"}}
                onClick={(e)=>{setView("partners")}}>Partner</button>
                <button style={{padding: "5px", marginRight:"30px"}}
                onClick={(e)=>{setView("users")}}>Users</button>
                <button style={{padding: "5px", marginRight:"30px"}}
                onClick={(e)=>{setView("viewPartner")}}>Vista Partner</button>
                <button style={{padding: "5px", marginRight:"30px"}}
                onClick={(e)=>{setView("viewUser")}}>Vista User</button>
                <button style={{padding: "5px", marginRight:"30px"}}
                onClick={(e)=>{setView("blockAccount")}}>Bloquear cuenta</button>
                <button style={{padding: "5px", marginRight:"30px"}}
                onClick={(e)=>{setView("deleteAccount")}}>Eliminar cuenta</button>
            </div>
           
            {view === "finances" && <Finances/>}
            {view === "partners" && <Partners/>}
            {view === "users" && <Users/>}
            {view === "viewPartner" && <ViewPartner/>}
            {view === "viewUser" &&  <ViewUsers/>}
            {view === "deleteAccount" &&  <DeteleteAccount/>}
            {view === "blockAccount" &&  <BlockAccount/>}         
            
        </div>
    )   
}
