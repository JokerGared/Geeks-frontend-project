import s from './LoginForm.module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoginFormData } from '../../redux/auth/slice';
import { toast } from 'react-toastify';
import { selectError } from '../../redux/auth/selectors';

const initialValues = {
  email: '',
  password: '',
};

const emailRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .max(64, 'Name must be at most 64 characters')
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
  const navigate = useNavigate();
  const error = useSelector(selectError);

  // ADD useEffect for errors and show toast
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [error]);

  const handleSubmit = (values) => {
    dispatch(setLoginFormData(values));
    navigate('/');
  };

  const eyeIcon = showPassword ? (
    <EyeIcon className={s.eyeIcon} onClick={() => setShowPassword(false)} />
  ) : (
    <EyeOff className={s.eyeIcon} onClick={() => setShowPassword(true)} />
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
                        // className={s.input}
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
