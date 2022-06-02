import React from "react";

export default function NavBarDevelopers() {
    // Si necesitan pasar un id, lo pueden busacar en la db y dejarlo hardcodeado   
    
    return (
        <div style={{backgroundColor: "antiquewhite" }} className="navBarDevelopers">
            <ul className="list-navBar-developers">
                <a style={{padding: "10px" }} href="/">Inicio</a>
                <a style={{padding: "10px" }} href="/legendCe">LegendaCe</a>   
                <a style={{padding: "10px" }} href="/legendUf">LegendaUf</a>
                <a style={{padding: "10px" }} href="/home/user/nacho/eliddelusuario">Select avatar-user sin avatar</a>
                <a style={{padding: "10px" }} href="/home/user/toni/eliddelusuario/unavatar">Home-user con avatar</a>
                <a style={{padding: "10px" }} href="/home/partner/tincho/eliddelusuario">Home-partner</a>
                <a style={{padding: "10px" }} href="/home/admin/lucho/eliddelusuario">Home-admin</a>
                <a style={{padding: "10px" }} href="/detail/gym/6292dae93fc1e9d735aea34c">Detalle de un gym</a>                
                <a style={{padding: "10px" }} href="/profile/user/toni/eliddelusuario">Perfil user</a>    
                <a style={{padding: "10px" }} href="/profile/partner/tincho/eliddelusuario">Perfil partner</a>   
                <a style={{padding: "10px" }} href="/profile/admin/lucho/eliddelusuario">Perfil admin</a>   
                <a style={{padding: "10px" }} href="/userprices">Precios para usuarios</a>  
                <a style={{padding: "10px" }} href="/resetpassword">Reseteo password</a>
                <a style={{padding: "10px" }} href="/updatepassword/iddelusuario">Actualización de password</a>
                <a style={{padding: "10px" }} href="/activation/userId/unsereto">Activación de cuenta</a>
                <a style={{padding: "10px" }} href="/deactivate/userId">Desactivar cuenta</a>
                <a style={{padding: "10px" }} href="/maps">Mapas</a>
                <a style={{padding: "10px" }} href="/FormUser">Formulario para usuarios</a>

              
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