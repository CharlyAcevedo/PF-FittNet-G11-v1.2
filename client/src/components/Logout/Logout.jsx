import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Logout() {

  const navigate = useNavigate();

  function onClick(e) {
    e.preventDefault();

    axios({
      method: 'post',
      url: '/api/service/logout',
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      // withCredentials: true
    })
    .then((res) => {
      console.log(res.data)
      if (res) {
        console.log(res.data, "-> respuesta del post de logout");
        // localStorage.removeItem("token");
        // localStorage.removeItem('userId');
        // localStorage.removeItem('name');
        // localStorage.removeItem('type');
        // localStorage.removeItem('avatar');
        localStorage.clear();
        navigate('/')
        // return (window.location = "http://localhost:3000/");
      }
    })
    .catch((error) => console.log(error));
  }

  return (
    <div>
      <p
        onClick={(e) => onClick(e)}
        // style={{
        //   backgroundColor: "#f5978c",
        //   padding: ".8rem 2rem",
        //   cursor: "pointer",
        //   fontWeight: "700",
        // }}
      >
        Logout
      </p>
    </div>
  );
}
