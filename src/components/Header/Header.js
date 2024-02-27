import { Link, useNavigate } from 'react-router-dom';
import { LocalStorageService } from '../../services/localStorage';
import '../Header/header.css';

export default function Header() {
  const navigate = useNavigate();
  function signOut() {
    LocalStorageService.removeAll();
    navigate('/');
    window.location.reload(true);
  }

  return (
    <header className="header">
      <h1 className="brand">X-course task / Komissarov Illia</h1>
      {LocalStorageService.get('username') ? (
        <div className="right-container">
          <Link className="cart" to="/cart">
            <img
              className="cart-image"
              alt="Cart"
              src={require('../../media/images/cart.svg').default}
            />
          </Link>
          <button onClick={signOut} className="btn">
            <Link to="/">Sign Out</Link>
          </button>
          <div className="user">
            <img
              className="avatar-image"
              src={require('../../media/images/avatar.png')}
              alt="Avatar"
            />
            <p className="username">{LocalStorageService.get('username')}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </header>
  );
}
