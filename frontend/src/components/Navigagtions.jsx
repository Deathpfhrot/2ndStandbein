import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <Link to={"/"}>Shop</Link>

      <Link to={"/login"} className="login-button">
        Login
      </Link>
    </nav>
  );
};

export default Navigation;
