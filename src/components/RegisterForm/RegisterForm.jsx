import s from './RegisterForm.module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRegistrationFormData } from '../../redux/auth/slice';
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const emailRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(32, 'Name must be at most 32 characters')
    .required('Name is required'),
  email: Yup.string()
    .max(64, 'Email must be at most 64 characters')
    .matches(emailRegular, 'Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .max(64, 'Password must be at most 64 characters')
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log('!!!Submitting form values:', values);
    dispatch(setRegistrationFormData(values));
    navigate('/photo');
  };

  const iconId = showPassword ? 'icon-close-eye' : 'icon-open-eye';
  const ariaLabel = showPassword ? 'Hide password' : 'Show password';

  const eyeIcon = (
    <svg
      className={s.eyeIcon}
      onClick={() => setShowPassword(!showPassword)}
      aria-label={ariaLabel}
    >
      <use href={`/public/icons.svg#${iconId}`}></use>
    </svg>
  );

  return (
    <div className={s.registerContainer}>
      <div className={s.registrationCard}>
        <div className={s.cardContent}>
          <h1 className={s.title}>Register</h1>

          <p className={s.subtitle}>
            Join our community of mindfulness and wellbeing!
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, dirty, errors, touched, values }) => (
              <Form className={s.form}>
                <div className={s.formFields}>
                  <div className={s.labelInputContainer}>
                    <label className={s.label} htmlFor="name">
                      Enter your name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className={`${s.input} ${
                        errors.name && touched.name ? s.inputError : ''
                      }`}
                      placeholder="Max"
                    />
                    <ErrorMessage
                      name="name"
                      className={s.error}
                      component="div"
                    />
                  </div>

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
                      Create a strong password
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
                        autoComplete="new-password"
                      />
                      {eyeIcon}
                    </div>
                    <div className={s.passwordStrength}>
                      {values.password && (
                        <PasswordStrengthBar
                          password={values.password}
                          scoreWordStyle={{
                            fontSize: '12px',
                          }}
                        />
                      )}
                    </div>
                    <ErrorMessage
                      name="password"
                      className={s.error}
                      component="div"
                    />
                  </div>

                  <div className={s.labelInputContainer}>
                    <label className={s.label} htmlFor="confirmPassword">
                      Repeat your password
                    </label>
                    <div className={s.passwordField}>
                      <Field
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        className={`${s.input} ${
                          errors.confirmPassword && touched.confirmPassword
                            ? s.inputError
                            : ''
                        }`}
                        placeholder="*********"
                        autoComplete="new-password"
                      />
                      {eyeIcon}
                    </div>
                    <ErrorMessage
                      name="confirmPassword"
                      className={s.error}
                      component="div"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={s.registrationButton}
                  disabled={!dirty || isSubmitting}
                >
                  {isSubmitting ? 'Creating account...' : 'Create account'}
                </button>
              </Form>
            )}
          </Formik>

          <p className={s.loginPrompt}>
            <span>Already have an account? </span>
            <Link to="/login" className={s.loginLinkBottom}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
