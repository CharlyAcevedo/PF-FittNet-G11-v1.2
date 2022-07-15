import { Routes, Route, Outlet } from 'react-router-dom'
import LegendCe from '../components/LegendCe/LegendCe'
import LegendUf from '../components/LegendUf/LegendUf'
import NavBar from '../components/NavBar/NavBar'
import InitRegister from '../views/InitRegister'
import Landing from '../views/Landing'
import Login from '../views/Login'

const MainLayoutLanding = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export const LayoutLanding = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayoutLanding />}>
          <Route path="/" element={<Landing />} />
          <Route path="/legendCe" element={<LegendCe />} />
          <Route path="/legendUf" element={<LegendUf />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<InitRegister />} />
        </Route>
      </Routes>
    </>
  )
}

export default LayoutLanding