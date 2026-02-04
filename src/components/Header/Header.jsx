import "./Header.css";
import { Link } from "react-router-dom";

export default function Header({ isLogin, setIsLogin }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
  };

  return (
    <header className="header">
      <div className="header-inner">
        <div className="left-group">
          <Link to="/">
            <img className="logo1" src="/images/13267.png" alt="logo" />
          </Link>
          
          <ul className="list">
            <li><Link to={"/card/card"}>Classic</Link></li>
            <li><Link to={"/card/card"}>Modern</Link></li>
            <li><Link to={"/card/card"}>Natural</Link></li>
            <li><Link to={"/card/card"}>Romantic</Link></li>
            <li><Link to={"/card/card"}>Event🎉</Link></li>
          </ul>
          
        </div>

        <div className="right-group">
          <ul className="list">
            {isLogin ? (
              <li onClick={handleLogout} style={{ cursor: 'pointer' }}>로그아웃</li>
            ) : (
              <li>
                <Link to="/login">로그인</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
