import { useParams } from "react-router-dom";
import DetailProfileUser from "../components/DetailProfile/DetailProfileUser/DetailProfileUser";
import DetailProfilePartner from "../components/DetailProfile/DetailProfilePartner/DetailProfilePartner";
import DetailProfileAdmin from "../components/DetailProfile/DetailProfileAdmin/DetailProfileAdmin";
import Logout from "../components/Logout/Logout";


export default function Profile() {
    let { type } = useParams();
    
    if (type === 'user') {
        return (
            <div >          
                <DetailProfileUser/>
                <Logout/>
            </div>
        )
    }
    if (type === 'partner') {
        return (
            <div >           
                <DetailProfilePartner/>
                <Logout/>
            </div>
        )
    }
    if (type === 'admin') {
        return (
            <div >               
                <DetailProfileAdmin/>
                <Logout/>
            </div>
        )
    }

};