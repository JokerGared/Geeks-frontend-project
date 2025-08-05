import s from './LoginForm.module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logIn } from '../../redux/auth/operations';

const initialValues = {
  email: '',
  password: '',
};

const emailRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .max(64, 'Email must be at most 64 characters')
    .matches(emailRegular, 'Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at most 64 characters')
    .required('Password is required'),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(logIn(values))
      .unwrap()
      .finally(() => {
        setSubmitting(false);
      });
  };

  const iconId = showPassword ? 'icon-close-eye' : 'icon-open-eye';
  const ariaLabel = showPassword ? 'Hide password' : 'Show password';

  const eyeIcon = (
    <svg
      className={s.eyeIcon}
      onClick={() => setShowPassword(!showPassword)}
      aria-label={ariaLabel}
    >
      <use href={`icons.svg#${iconId}`}></use>
    </svg>
  );

  return (
    <div className={s.loginContainer}>
      <div className={s.loginCard}>
        <div className={s.cardContent}>
          <h1 className={s.title}>Login</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, dirty, errors, touched }) => (
              <Form className={s.form}>
                <div className={s.formFields}>
                  <div className={s.labelInputContainer}>
                    <label className={s.label} htmlFor="email">
                      Enter your email address
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className={`${s.input} ${
                        errors.email && touched.email ? s.inputError : ''
                      }`}
                      placeholder="email@gmail.com"
                    />
                    <ErrorMessage
                      name="email"
                      className={s.error}
                      component="div"
                    />
                  </div>

                  <div className={s.labelInputContainer}>
                    <label className={s.label} htmlFor="password">
                      Enter a password
                    </label>
                    <div className={s.passwordField}>
                      <Field
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className={`${s.input} ${
                          errors.password && touched.password
                            ? s.inputError
                            : ''
                        }`}
                        placeholder="*********"
                        autoComplete="current-password"
                      />
                      {eyeIcon}
                    </div>
                    <ErrorMessage
                      name="password"
                      className={s.error}
                      component="div"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={s.loginButton}
                  disabled={!dirty || isSubmitting}
                >
                  {isSubmitting ? 'Login...' : 'Login'}
                </button>
              </Form>
            )}
          </Formik>

          <p className={s.loginPrompt}>
            <span>Don’t have an account? </span>
            <Link to="/register" className={s.registerLinkBottom}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
