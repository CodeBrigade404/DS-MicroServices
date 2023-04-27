import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const SignUp = () => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:4003/api/users';
      const { data: res } = await axios.post(url, data);
      navigate('/login');
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Back To iHerb</h1>
          <Link to='/login'>
            <button type='button' className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <input
              type='text'
              placeholder='First Name'
              name='firstName'
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type='text'
              placeholder='Last Name'
              name='lastName'
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
            <input
              type='text'
              placeholder='Username'
              name='username'
              onChange={handleChange}
              value={data.username}
              required
              className={styles.input}
            />
            <input
              type='email'
              placeholder='Email'
              name='email'
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type='submit' className={styles.green_btn}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
