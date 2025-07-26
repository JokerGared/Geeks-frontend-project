import s from './LoginForm.module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { EyeIcon } from 'lucide-react';
// import { useDispatch } from 'react-redux';
// import { Login } from '../../redux/auth/operations';

const initialValues = {
  email: '',
  password: '',
};

const emailRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegular, 'Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const dispatch = useDispatch();

  const handleSubmit = (values, action) => {
    console.log('Form submitted:', values);
    // Handle form submission here
    setTimeout(() => {
      action.setSubmitting(false);
    }, 400);
    action.resetForm();
  };
  // dispatch(login(newContact));

  return (
    <div className={s.loginConteiner}>
      <div className={s.loginCard}>
        <div className={s.cardContent}>
          <h1 className={s.title}>Login</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, dirty }) => (
              <Form className={s.form}>
                <div className={s.formFields}>
                  <div className={s.labelInputContainer}>
                    <label className={s.label} htmlFor="email">
                      Enter your email address
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className={s.input}
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
                        className={s.passwordInput}
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="*********"
                        autoComplete="new-password"
                      />
                      <EyeIcon
                        className={s.eyeIcon}
                        onClick={() => setShowPassword(!showPassword)}
                      />
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
            <a href="/register" className={s.registerLinkBottom}>
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
