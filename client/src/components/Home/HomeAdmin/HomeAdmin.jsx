import Finances from "./ViewsAdmin/Finances";
import Partners from "./ViewsAdmin/Partners";
import Users from "./ViewsAdmin/Users";
import ViewPartner from "./ViewsAdmin/ViewPartner";
import ViewUsers from "./ViewsAdmin/ViewUser";
import DeteleteAccount from "./ViewsAdmin/DeleteAccount";


import React from "react";
import { useState } from "react";

export default function HomeAdmin() {
    const [ view , setView ] = useState("");

    // Necesito una barra de búsqueda con filtros



    if(view === "finances" ){ // ver finanzas
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
                onClick={(e)=>{setView("deleteAccount")}}>Inhabilitar</button>
                
                <p style={{padding: "10px"}}>1 - Necesito información financiera, números</p>
                <Finances/>
            </div>
        )

    }
    if(view === "partners" ){ // clientes empresa
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
                onClick={(e)=>{setView("deleteAccount")}}>Inhabilitar</button>
                
                <p style={{padding: "10px"}}>2 - Necesito una lista de todos de todos los clientes empresa adheridos</p>
                <Partners/>
            </div>
        )
        
    }
    if(view === "users" ){ // usuario finales
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
                onClick={(e)=>{setView("deleteAccount")}}>Inhabilitar</button>
                
                <p style={{padding: "10px"}}>3.0 - Necesito una una barra de búsqueda y filtros</p>
                <p style={{padding: "10px"}}>3.1 - Necesito una lista de todos los usuarios finales adeheridos</p>
                <Users/>
            </div>
        )
        
    }
    if(view === "deleteAccount" ){ // Eliminar o banear usuario partener o user
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
                onClick={(e)=>{setView("deleteAccount")}}>Inhabilitar</button>
                
                <p style={{padding: "10px"}}>4.1 - Necesito poder eliminar una cuenta de partner o user</p>
                <DeteleteAccount/>
            </div>
        )
        
    }
    if(view === "viewPartner" ){ // Vista como partner
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
                onClick={(e)=>{setView("deleteAccount")}}>Inhabilitar</button>
                               
                <ViewPartner/>
            </div>
        )
        
    }
    if(view === "viewUser" ){ // Vista como user
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
                onClick={(e)=>{setView("deleteAccount")}}>Inhabilitar</button>
                
                <p style={{padding: "10px"}}>5 - Necesito una vista como partner</p>
                <ViewUsers/>
            </div>
        )
        
    }
    
    if(view === "" ){ // Otra vista
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
                onClick={(e)=>{setView("deleteAccount")}}>Inhabilitar</button>

                <p style={{padding: "10px"}}>Quiero una pestaña dinámica para pasar de un tema al otro</p>
                <p style={{padding: "10px"}}></p>
                <p style={{padding: "10px"}}>¿qué vamos a mostrar en esta vista para el admin?</p>                
                <p style={{padding: "10px"}}>1 - Necesito información financiera, números</p>
                <p style={{padding: "10px"}}>2 - Necesito una lista de todos de todos los clientes empresa adheridos</p>
                <p style={{padding: "10px"}}>3 - Necesito una lista de todos los usuarios finales adeheridos</p>
                <p style={{padding: "10px"}}>4 - Necesito poder eliminar una cuenta de partner o user</p>
                <p style={{padding: "10px"}}>5 - Necesito una vista como user</p>
                <p style={{padding: "10px"}}>6 - Necesito una vista como partner</p>            
            </div>
        )
    }

        
}
