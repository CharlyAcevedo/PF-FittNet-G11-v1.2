import React from "react";

export default function NavBarDevelopers() {
    // Si necesitan pasar un id, lo pueden busacar en la db y dejarlo hardcodeado   
    
    return (
        <div>
            <ul>
                <a style={{padding: "10px", color: "#fff" }} 
                href="/">Inicio</a>
                <a style={{padding: "10px", color: "#fff" }} 
                href="/legendCe">LegendaCe</a>   
                <a style={{padding: "10px", color: "#fff" }} 
                href="/legendUf">LegendaUf</a>
                <a style={{padding: "10px", color: "#fff" }} 
                href="/home/user/nacho/eliddelusuario">Select avatar-user sin avatar</a>
                <a style={{padding: "10px", color: "#fff" }} 
                href="/home/user/toni/eliddelusuario/unavatar">Home-user con avatar</a>
                <a style={{padding: "10px", color: "#fff" }} 
                href="/home/partner/tincho/eliddelusuario">Home-partner</a>
                <a style={{padding: "10px", color: "#fff" }} 
                href="/home/admin/lucho/eliddelusuario">Home-admin</a>
                <a style={{padding: "10px", color: "#fff" }} 
                href="/detail/gym/6292dae93fc1e9d735aea34c">Detalle de un gym</a>                
                <a style={{padding: "10px", color: "#fff" }} 
                href="/profile/user/toni/eliddelusuario">Perfil user</a>    
                <a style={{padding: "10px", color: "#fff" }} 
                href="/profile/partner/tincho/eliddelusuario">Perfil partner</a>   
                <a style={{padding: "10px", color: "#fff" }} 
                href="/profile/admin/lucho/eliddelusuario">Perfil admin</a>   
                <a style={{padding: "10px", color: "#fff" }} 
                href="/userprices">Precios para usuarios</a>  
                <a style={{padding: "10px", color: "#fff" }} 
                href="/resetpassword">Reseteo password</a>
                <a style={{padding: "10px", color: "#fff" }} 
                href="/updatepassword/iddelusuario">Actualización de password</a>
                <a style={{padding: "10px", color: "#fff" }} 
                href="/activation/userId/unsereto">Activación de cuenta</a>
                <a style={{padding: "10px", color: "#fff" }} 
                href="/deactivate/userId">Desactivar cuenta</a>
                <a style={{padding: "10px", color: "#fff" }} 
                href="/maps">Mapas</a>
                <a style={{padding: "10px", color: "#fff" }} 
                href="/FormUser">Formulario para usuarios</a>            

            </ul>
        </div>
    )
}
