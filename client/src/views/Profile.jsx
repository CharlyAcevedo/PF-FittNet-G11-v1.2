import { useParams } from "react-router-dom";
import DetailProfileUser from "../components/DetailProfileUser/DetailProfileUser";
import DetailProfilePartner from "../components/DetailProfilePartner/DetailProfilePartner";
import DetailProfileAdmin from "../components/DetailProfileAdmin/DetailProfileAdmin";
import logoFittNet from "../asets/images/logo_fitnet.jpg";
import Logout from "../components/Logout/Logout";

export default function Profile() {
    let { id , name, type } = useParams();
    
    if (type === 'user') {
        return (
            <div >
                <img height="200" src={logoFittNet} alt="logo" />
                <h5>Bienvenido a tu perfil {name}</h5>
                 <DetailProfileUser/>
                <Logout/>
            </div>
        )
    }
    if (type === 'partner') {
        return (
            <div >
                <img height="200" src={logoFittNet} alt="logo" />
                <h5>Bienvenido a tu perfil {name}</h5>
                 <DetailProfilePartner/>
                <Logout/>
            </div>
        )
    }
    if (type === 'admin') {
        return (
            <div >
                <img height="200" src={logoFittNet} alt="logo" />
                <h5>Bienvenido a tu perfil {name}</h5>
                 <DetailProfileAdmin/>
                <Logout/>
            </div>
        )
    }

};