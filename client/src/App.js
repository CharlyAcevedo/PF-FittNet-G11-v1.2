import "./App.css";
import { Route, Routes, Outlet } from "react-router-dom";

import Landing from "./views/Landing";
import LegendCe from "./components/LegendCe/LegendCe";
import LegendUf from "./components/LegendUf/LegendUf";

import Home from "./views/Home";

import Login from "./views/Login";
import UserRegister from "./views/UserRegister";

import ClientRegister from "./views/ClientRegister";
import InitRegister from "./views/InitRegister";

import Profile from "./views/Profile";

import GymDetail from "./components/GymDetail/GymDetail";
import ResetPassword from "./components/UpdatePassword/ResetPassword";
import UpdatePasword from "./components/UpdatePassword/UpdatePassword";
import GymsForUsersMap from "./components/MapsAndGeo/GymsForUsers";
import Activation from "./components/Activation/Activation";
import DeactivateAccount from "./components/DeactivateAccount/DeactivateAccount";
import FormUser from "./components/Forms/FormUser";
import NavBar from "./components/NavBar/NavBar";
import NavBarProfile from "./components/NavBarProfile/NavBarProfile";
import UpdatePartner from "./components/UpDatePartner/partner";
import UpdateGym from "./components/UpDatePartner/gym";
import Services from "./components/UpDatePartner/service";
import StripeCart from "./components/StripeCart/StripeCart";

const MainLayoutLanding = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

const MainLayoutUser = () => {
  return (
    <div>
      <NavBarProfile />
      <Outlet />
    </div>
  );
};

function App() {
  // const token = localStorage.getItem("token");

  return (
    <div>
      <Routes>
        <Route element={<MainLayoutLanding />}>
          <Route path="/" element={<Landing />} />
          <Route path="/legendCe" element={<LegendCe />} />
          <Route path="/legendUf" element={<LegendUf />} />
        </Route>
      </Routes>
      <Routes>
        <Route element={<MainLayoutUser />}>
          <Route path="/home/:type/:name/:userId/:avatar" element={<Home />} />
          <Route path="/home/:type/:name/:userId" element={<Home />} />
          <Route path="/detail/gym/:userId" element={<GymDetail />} />
          <Route path="/profile/:type/:name/:userId" element={<Profile />} />
          <Route
            path="/home/editprofile/:type/:name/:userId"
            element={<FormUser />}
          />
          <Route
            path="/profile/edit/partner/:name/:userId"
            element={<UpdatePartner />}
          />
          <Route
            path="/profile/edit/partner/:name/:userId/:gymId"
            element={<UpdateGym />}
          />
          <Route
            path="/profile/edit/partner/:name/:userId/gym/service"
            element={<Services />}
          />
          <Route path="/api/partner/gyms/gymbyid/:id" element={<GymDetail />} />
          <Route
            path="/home/:type/:name/:userId/:avatar/FormUser"
            element={<FormUser />}
          />
        </Route>
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<InitRegister />} />
        <Route path="/user_register" element={<UserRegister />} />
        <Route path="/client_register" element={<ClientRegister />} />
        <Route path="/maps" element={<GymsForUsersMap />} />
        <Route path="/updatepassword/:userId" element={<UpdatePasword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route
          path="/activation/:userId/:secretToken"
          element={<Activation />}
        />
        <Route path="/deactivate/:userId" element={<DeactivateAccount />} />

        <Route path="/stripe" element={<StripeCart />} />
        <Route
          path="/profile/partner/:name/:userId/gym"
          element={<UpdateGym />}
        />
        <Route
          path="/profile/partner/:name/:userId/gym/service"
          element={<Services />}
        />
      </Routes>
    </div>
  );
}

export default App;
