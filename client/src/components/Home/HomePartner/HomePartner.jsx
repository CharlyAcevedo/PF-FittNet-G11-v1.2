import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MyGyms } from "./ViewsPartner/MyGyms";
import { MySales } from "./ViewsPartner/MySales";
import { MyClients } from "./ViewsPartner/MyClients";
import { Plans } from "./ViewsPartner/Plans";
import { EditMyGyms } from "./ViewsPartner/EditMyGyms";
import { MyServices } from "./ViewsPartner/MyServices";
import { EditMyServices } from "./ViewsPartner/EditMyServices";


export function HomePartner () {
    const [ view , setView ] = useState("myGyms");

    let { userId } = useParams();

    console.log(userId, 'los params en el home')


    
    return(
        <div style={{padding: "20px", color: "#fff" }}>
            <div >
          
            </div>
            <div>
                <button style={{padding: "5px", marginRight:"30px"}}
                onClick={(e)=>{setView("plans")}}>Planes y promociones</button>

                <button style={{padding: "5px", marginRight:"30px"}}
                onClick={(e)=>{setView("mySales")}}>Mis ventas</button>

                <button style={{padding: "5px", marginRight:"30px"}}
                onClick={(e)=>{setView("myClients")}}>Mis clientes</button>

                <button style={{padding: "5px", marginRight:"30px"}} 
                onClick={(e)=>{setView("myGyms")}}>Mis gimnasios</button>

                <button style={{padding: "5px", marginRight:"30px"}}
                onClick={(e)=>{setView("editMyGyms")}}>Editar mis gimnasios</button>

                <button style={{padding: "5px", marginRight:"30px"}}
                onClick={(e)=>{setView("myServices")}}>Mis servicios</button>

                <button style={{padding: "5px", marginRight:"30px"}}
                onClick={(e)=>{setView("editMyServices")}}>Editar servicios</button>
            </div>
           
            {view === "mySales" && <MySales/>}
            {view === "myClients" && <MyClients/>}
            {view === "plans" && <Plans/>}
            {view === "myGyms" && <MyGyms/>}
            {view === "editMyGyms" &&  <EditMyGyms/>}
            {view === "myServices" &&  <MyServices/>}
            {view === "editMyServices" &&  <EditMyServices/>}         
            
        </div>
    )   

}