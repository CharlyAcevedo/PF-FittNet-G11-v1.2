import "./App.css";
import { Route, Routes, Outlet } from "react-router-dom";
import Landing from "./views/Landing";
import Home from "./views/Home";
import Login from "./views/Login";
import UserRegister from "./views/UserRegister";
import LegendCe from "./components/LegendCe/LegendCe"
import ClientRegister from "./views/ClientRegister";
import InitRegister from "./views/InitRegister";
import Profile from "./views/Profile";
import UserPrices from './components/UserPrices/UserPrices'
import GymDetail from "./views/GymDetail";
import LegendUf from "./components/LegendUf/LegendUf";
import ResetPassword from "./components/UpdatePassword/ResetPassword";
import UpdatePasword from "./components/UpdatePassword/UpdatePassword";
import MapGyms from "./components/MapsAndGeo/MapGyms";
import Activation from "./components/Activation/Activation";
import DeactivateAccount from "./components/DeactivateAccount/DeactivateAccount";
import FormUser from "./components/Forms/FormUser"
import NavBar from "./components/NavBar/NavBar";
import NavBarProfile from "./components/NavBarProfile/NavBarProfile";


const MainLayoutLanding = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

const MainLayoutUser = () => {
  return (
    <div>
      <NavBarProfile />
      <Outlet />
    </div>
  )
}



function App() {


  const token = localStorage.getItem('token');

  return (
    <div className="App">
      <Routes>
        <Route element={<MainLayoutLanding />}>
          <Route path="/" element={<Landing />} />
          <Route path="/legendCe" element={<LegendCe />} />
          <Route path="/legendUf" element={<LegendUf />} />
          <Route path="/userprices" element={<UserPrices />} />
        </Route>
      </Routes>
      <Routes>
        <Route element={<MainLayoutUser />}>
          <Route path="/home/:type/:name/:userId/:avatar" element={<Home />} />
          <Route path="/home/:type/:name/:userId" element={<Home />} />
          <Route path="/detail/gym/:userId" element={<GymDetail />} />
          <Route path="/profile/:type/:name/:userId" element={<Profile />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<InitRegister />} />
        <Route path="/user_register" element={<UserRegister />} />
        <Route path="/client_register" element={<ClientRegister />} />
        <Route path="/maps" element={<MapGyms />} />
        <Route path="/updatepassword/:userId" element={<UpdatePasword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/activation/:userId/:secretToken" element={<Activation />} />
        <Route path="/deactivate/:userId" element={<DeactivateAccount />} />
        <Route path="/FormUser" element={<FormUser />} />
      </Routes>
    </div>
  );
}

export default App;
