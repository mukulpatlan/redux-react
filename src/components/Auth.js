import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';

import classes from './Auth.module.css';

const isEmpty = value => value.trim() === '';
const isEmail = value => value.includes('@');
const is6Char = value => value.trim().length >= 6;

const Auth = () => {
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

  return (
    <main className={classes.auth}>
      <section>
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
          <button type='submit'>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
