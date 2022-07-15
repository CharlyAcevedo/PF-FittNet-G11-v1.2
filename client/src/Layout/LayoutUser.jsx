import { Routes, Route, Outlet } from 'react-router-dom';

import GymDetail from "../components/GymDetail/GymDetail";
import Profile from "../views/Profile";
import FormUser from "../components/Forms/FormUser";
import NavBarProfile from "../components/NavBarProfile/NavBarProfile";
import UpdatePartner from "../components/UpDatePartner/partner";
import UpdateGym from "../components/UpDatePartner/gym";
import Services from "../components/UpDatePartner/service";
import StripeCart from "../components/StripeCart/StripeCart";
import Home from "../views/Home";
import GymsForUsersMap from "../components/MapsAndGeo/GymsForUsers";



const MainLayoutUser = () => {
  return (
    <div>
      <NavBarProfile />
      <Outlet />
    </div>
  );
};

export const LayoutUser = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayoutUser />}>
          <Route path="/home/:type/:name/:userId/:avatar" element={<Home />} />
          <Route path="/detail/gym/:userId" element={<GymDetail />} />
          <Route path="/profile/:type/:name/:userId" element={<Profile />} />
          <Route path="/home/editprofile/:type/:name/:userId" element={<FormUser />} />
          <Route path="/profile/edit/partner/:name/:userId" element={<UpdatePartner />} />
          <Route path="/profile/edit/partner/:name/:userId/:gymId" element={<UpdateGym />} />
          <Route path="/profile/edit/partner/:name/:userId/gym/service" element={<Services />}/>
          <Route path="/api/partner/gyms/gymbyid/:id" element={<GymDetail />} />
          <Route path="/home/:type/:name/:userId/:avatar/FormUser" element={<FormUser />}/>
          <Route path="/home/:type/:name/:userId" element={<Home />} />
          <Route path="/maps" element={<GymsForUsersMap />} />
          <Route path="/stripe" element={<StripeCart />} />
          <Route path="/profile/partner/:name/:userId/gym" element={<UpdateGym />} />
          <Route path="/profile/partner/:name/:userId/gym/service" element={<Services />} />
        </Route>
      </Routes>
    </>
  )
}

export default LayoutUser