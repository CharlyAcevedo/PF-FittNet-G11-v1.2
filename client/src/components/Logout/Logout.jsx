import axios from "axios";

export default function Logout() {
  function onClick(e) {
    e.preventDefault();

    axios
      .post("http://localhost:3001/api/logout")
      .then((res) => {
        if (res) {
          console.log(res.data, "-> respuesta del post de logout");
          return (window.location = "http://localhost:3000/");
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <p
        onClick={(e) => onClick(e)}
        style={{
          backgroundColor: "#f5978c",
          padding: ".8rem 2rem",
          cursor: "pointer",
          fontWeight: "700",
        }}
      >
        Logout
      </p>
    </div>
  );
}
