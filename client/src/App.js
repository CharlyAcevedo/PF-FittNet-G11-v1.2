import "./App.css";
import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <div className="App">     
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home/:type/:name/:userId/:avatar" element={<Home />} />
          <Route path="/home/:type/:name/:userId" element={<Home />} />
          <Route path="/detail/gym/:userId" element={<GymDetail />} />          
          <Route path="/legendCe" element={<LegendCe />} />
          <Route path="/profile/:type/:name/:userId" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<InitRegister />} />
          <Route path="/user_register" element={<UserRegister />} />
          <Route path="/client_register" element={<ClientRegister />} />
          <Route path="/legendUf" element={<LegendUf />} />
          <Route path="/userprices" element={<UserPrices />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/updatepassword" element={<UpdatePasword />} />

        </Routes>
    </div>
  );
}

export default App;
