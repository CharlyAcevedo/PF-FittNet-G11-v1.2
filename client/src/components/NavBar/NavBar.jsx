import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <h1>NavBar</h1>

      <Link to="/login">
        <button id="btn-login">Login</button>
      </Link>

      <Link to="/registration">
        <button id="btn-create">Create Account</button>
      </Link>

      <Link to="/home">
        <button id="btn-home">Home</button>
      </Link>
    </div>
  );
}
