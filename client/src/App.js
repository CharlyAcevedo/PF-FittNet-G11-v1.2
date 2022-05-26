import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./views/Landing";
import Home from "./views/Home";
import Login from "./views/Login";
import UserRegister from "./views/UserRegister";
import ClientRegister from "./views/ClientRegister"
import InitRegister from "./views/InitRegister"

function App() {
  return (
    <div className="App">
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<InitRegister />} />
          <Route path="/user_register" element={<UserRegister />} />
          <Route path="/client_register" element={<ClientRegister />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
