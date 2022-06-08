import Finances from "./ViewsAdmin/Finances";
import Partners from "./ViewsAdmin/Partners";
import Users from "./ViewsAdmin/Users";
import ViewPartner from "./ViewsAdmin/ViewPartner";
import ViewUsers from "./ViewsAdmin/ViewUser";
import DeteleteAccount from "./ViewsAdmin/DeleteAccount";
import OtherView from "./ViewsAdmin/OtherView";


import React from "react";
import { useState } from "react";

export default function HomeAdmin() {
    const [ view , setView ] = useState("");

    // Necesito una barra de búsqueda con filtros
    
    return(
        <div style={{padding: "20px", color: "#fff" }}>
            <button style={{padding: "5px", marginRight:"30px"}} 
            onClick={(e)=>{setView("")}}>Pendientes</button>
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
            onClick={(e)=>{setView("deleteAccount")}}>Eliminar cuenta</button>
            
            <p style={{padding: "10px"}}>Necesito información financiera, números</p>
            {view === "finances" && <Finances/>}
            {view === "partners" && <Partners/>}
            {view === "users" && <Users/>}
            {view === "viewPartner" && <ViewPartner/>}
            {view === "viewUser" &&  <ViewUsers/>}
            {view === "deleteAccount" &&  <DeteleteAccount/>}
            {view === "" && <OtherView/> }
            
        </div>
    )
    

        
}
