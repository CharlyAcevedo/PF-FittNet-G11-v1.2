import { Route, Routes } from "react-router-dom";

import UserRegister from "../views/UserRegister";

import ClientRegister from "../views/ClientRegister";

import ResetPassword from "../components/UpdatePassword/ResetPassword";
import UpdatePasword from "../components/UpdatePassword/UpdatePassword";

import Activation from "../components/Activation/Activation";
import DeactivateAccount from "../components/DeactivateAccount/DeactivateAccount";

export const LayoutOffUser = () => {
  return (
    <>
        <Routes>
            <Route path="/user_register" element={<UserRegister />} />
            <Route path="/client_register" element={<ClientRegister />} />
            
            <Route path="/updatepassword/:userId" element={<UpdatePasword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/activation/:userId/:secretToken" element={<Activation />} />
            <Route path="/deactivate/:userId" element={<DeactivateAccount />} />
        </Routes>
    </>
  )
}

export default LayoutOffUser