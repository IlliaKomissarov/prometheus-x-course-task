import { useState } from 'react';
import { LocalStorageService, LS_KEYS } from '../../services/localStorage';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Signin() {
  const [disabled, setDisabled] = useState(true);
  const [username, setUsername] = useState();
  const navigate = useNavigate();
  function handleChange(e) {
    if (e.target.value.length < 4 || e.target.value.length > 16) {
      setDisabled(true);
    } else {
      setDisabled(false);
      setUsername(e.target.value);
    }
  }

  function handleClick() {
    LocalStorageService.set(LS_KEYS.USERNAME, username);
    LocalStorageService.set(LS_KEYS.CART, null);
    navigate('/books');
    window.location.reload(true);
  }

  if (LocalStorageService.get('username')) {
    return <Navigate replace to="books" />;
  } else {
    return (
      <main className="sign-in">
        <div className="avatar-container">
          <img alt="Avatar" src={require('../../img/avatar2.png')} />
        </div>
        <form className="sign-in-container">
          <label className="sign-in-label" htmlFor="username">
            Username
          </label>
          <input
            className="sign-in-input"
            type="text"
            placeholder="type Username"
            id="username"
            name="username"
            onChange={handleChange}
          />
          <button
            className="sign-in-button"
            disabled={disabled}
            onClick={handleClick}
          >
            Sign-in
          </button>
        </form>
      </main>
    );
  }
}
