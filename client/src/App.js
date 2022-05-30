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
import ResetPassword from "./views/ResetPassword";
import UserPrices from './components/UserPrices/UserPrices'
import GymDetail from "./views/GymDetail";

function App() {
  return (
    <div className="App">     
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home/:type/:name/:userId/:avatar" element={<Home />} />
          <Route path="/home/:type/:name/:userId" element={<Home />} />
          <Route path="/detail/gym/:userId" element={<GymDetail />} />
          <Route path="/resetpass" element={<ResetPassword />} />
          <Route path="/legendCe" element={<LegendCe />} />
          <Route path="/profile/:type/:name/:userId" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<InitRegister />} />
          <Route path="/user_register" element={<UserRegister />} />
          <Route path="/client_register" element={<ClientRegister />} />
          <Route path="/legendCe" element={<LegendCe />} />
          <Route path="/userprices" element={<UserPrices />} />

        </Routes>
    </div>
  );
}

export default App;
