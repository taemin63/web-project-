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
            <img className="logo1" src="/images/weddinglogo.png" alt="logo" />
          </Link>
          
          <ul className="list">
            <li><Link to = "/classic">Classic</Link></li>
            <li><Link to="/modern">Modern</Link></li>
            <li><Link to="/natural">Natural</Link></li>
            <li><Link to="/romantic">Romantic</Link></li>
            <li><Link to="/event">Event🎉</Link></li>
          </ul>
          
        </div>

        <div className="right-group">
          <input 
            type="text"
            name="search"
            placeholder="  찾고 싶은 상품을 검색하시오"
            className="search"
          />
          <ul className="list1">
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
