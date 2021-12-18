import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';

import classes from './AuthForm.module.css';

const isEmpty = value => value.trim() === '';
const isEmail = value => value.includes('@');
const is6Char = value => value.trim().length >= 6;

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const emailInput = useRef();
  const passwordInput = useRef();
  const [formValidity, setFormValidity] = useState({
    email: true,
    password: true
  })

  const dispatch = useDispatch();

  const onLoginHandler = (event) => {
    event.preventDefault();
    const emailIsValid = !isEmpty(emailInput.current.value) && isEmail(emailInput.current.value);
    const passwordIsValid = is6Char(passwordInput.current.value);

    const formIsValid = emailIsValid && passwordIsValid;

    if (!formIsValid) {
      setFormValidity({
        email: emailIsValid,
        password: passwordIsValid
      });
      return;
    }
    dispatch(authActions.login())
  }

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <main className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={onLoginHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' ref={emailInput} />
          {!formValidity.email && <p className={classes.invalid}>Email is not Valid</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' ref={passwordInput} />
          {!formValidity.password && <p className={classes.invalid}>Password is not Valid(Min 6 Char)</p>}
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </main>
  );
};

export default AuthForm;
