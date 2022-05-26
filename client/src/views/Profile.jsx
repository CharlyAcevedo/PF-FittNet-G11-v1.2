import { useParams } from "react-router-dom";
import DetailProfile from "../components/DetailProfile/DetailProfile";
import logoFittNet from "../asets/images/logo_fitnet.jpg";
import Logout from "../components/Logout/Logout";

export default function Profile() {
    let { id , name, type } = useParams();
    

    return (
        <div >
            <img height="200" src={logoFittNet} alt="logo" />
            <h5>Bienvenido a tu perfil {name}</h5>
             <DetailProfile/>
            <Logout/>
        </div>
    )
};