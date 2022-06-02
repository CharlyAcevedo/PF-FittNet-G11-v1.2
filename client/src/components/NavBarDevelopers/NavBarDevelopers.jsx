import React from "react";

export default function NavBarDevelopers() {
    // Si necesitan pasar un id, lo pueden busacar en la db y dejarlo hardcodeado   
    
    return (
        <div className="navBarDevelopers">
            <ul className="list-navBar-developers">
                <a style={{padding: "10px", color: "white"}} href="/">Inicio</a>
                <a style={{padding: "10px", color: "white" }} href="/legendCe">LegendaCe</a>   
                <a style={{padding: "10px", color: "white" }} href="/legendUf">LegendaUf</a>
                <a style={{padding: "10px", color: "white" }} href="/home/user/nacho/eliddelusuario">Select avatar-user sin avatar</a>
                <a style={{padding: "10px", color: "white" }} href="/home/user/toni/eliddelusuario/unavatar">Home-user con avatar</a>
                <a style={{padding: "10px", color: "white" }} href="/home/partner/tincho/eliddelusuario">Home-partner</a>
                <a style={{padding: "10px", color: "white" }} href="/home/admin/lucho/eliddelusuario">Home-admin</a>
                <a style={{padding: "10px", color: "white" }} href="/detail/gym/6292dae93fc1e9d735aea34c">Detalle de un gym</a>                
                <a style={{padding: "10px", color: "white" }} href="/profile/user/toni/eliddelusuario">Perfil user</a>    
                <a style={{padding: "10px", color: "white" }} href="/profile/partner/tincho/eliddelusuario">Perfil partner</a>   
                <a style={{padding: "10px", color: "white" }} href="/profile/admin/lucho/eliddelusuario">Perfil admin</a>   
                <a style={{padding: "10px", color: "white" }} href="/userprices">Precios para usuarios</a>  
                <a style={{padding: "10px", color: "white" }} href="/resetpassword">Reseteo password</a>
                <a style={{padding: "10px", color: "white" }} href="/updatepassword/iddelusuario">Actualización de password</a>
                <a style={{padding: "10px", color: "white" }} href="/activation/userId/unsereto">Activación de cuenta</a>
                <a style={{padding: "10px", color: "white" }} href="/deactivate/userId">Desactivar cuenta</a>
            </ul>
        </div>
    )
}
{/* <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/home/:type/:name/:userId/:avatar" element={<Home />} />
    <Route path="/home/:type/:name/:userId" element={<Home />} />
    <Route path="/detail/gym/:userId" element={<GymDetail />} />
    <Route path="/legendCe" element={<LegendCe />} />
    <Route path="/profile/:type/:name/:userId" element={<Profile />} />    
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<InitRegister />} />    
    <Route path="/legendUf" element={<LegendUf />} />
    <Route path="/userprices" element={<UserPrices />} />    
    <Route path="/resetpassword" element={<ResetPassword />} />
    <Route path="/updatepassword" element={<UpdatePasword />} />
    


    Rutas que no se están usando
    <Route path="/user_register" element={<UserRegister />} />    
    <Route path="/client_register" element={<ClientRegister />} />
</Routes> */}