import { useParams } from "react-router-dom";
import DetailProfileUser from "../components/DetailProfileUser/DetailProfileUser";
import DetailProfilePartner from "../components/DetailProfilePartner/DetailProfilePartner";
import DetailProfileAdmin from "../components/DetailProfileAdmin/DetailProfileAdmin";


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