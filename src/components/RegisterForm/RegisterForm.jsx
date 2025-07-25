// // import s from './RegisterForm.module.css';

// // const RegisterForm = () => {
// //   return <div>Register Form</div>;
// // };

// export default RegisterForm;
// import s from "./RegisterForm.module.css";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import * as Yup from "yup";
// // import { useDispatch } from "react-redux";
// // import { registration } from "../../redux/auth/operations";

// const initialValues = {
//   name: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
// };

// const emailRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// const validationSchema = Yup.object().shape({
//   username: Yup.string()
//     .min(2, "Too Short!")
//     .max(16, "Too Long!")
//     .required("Required"),
//   email: Yup.string()
//     .matches(emailRegular, "Wrong email format")
//     .required("Required"),
//   password: Yup.string().min(7, "Minimum 7 characters").required("Required"),
// });

// const RegisterForm = () => {
//   // const dispatch = useDispatch();

//   const handleSubmit = (values, action) => {
//     const newContact = {
//       name: values.username,
//       email: values.email,
//       password: values.password,
//       confirmPassword: values.confirmPassword,
//     };

//     // dispatch(registration(newContact));

//     action.resetForm();
//   };
//   return (
//     <Formik
//       initialValues={initialValues}
//       onSubmit={handleSubmit}
//       validationSchema={validationSchema}
//     >
//       {({ dirty }) => (
//         <Form className={s.form}>
//           <div className={s.labelInputContainer}>
//             <label className={s.label} htmlFor="username">
//               Enter your name
//             </label>
//             <Field
//               className={s.input}
//               type="text"
//               name="username"
//               placeholder=""
//             />
//             <ErrorMessage name="username" className={s.error} component="div" />
//           </div>

//           <div className={s.labelInputContainer}>
//             <label className={s.label} htmlFor="email">
//               Enter your email address
//             </label>
//             <Field
//               type="email"
//               name="email"
//               className={s.input}
//               placeholder=""
//             />
//             <ErrorMessage name="email" className={s.error} component="div" />
//           </div>

//           <div className={s.labelInputContainer}>
//             <label className={s.label} htmlFor="password">
//               Create a strong password
//             </label>
//             <Field
//               className={s.input}
//               type="password"
//               name="password"
//               placeholder=""
//               autoComplete="false"
//             />
//             <ErrorMessage name="password" className={s.error} component="div" />
//           </div>

//           <button
//             type="submit"
//             className={s.registrationButton}
//             disabled={!dirty}
//           >
//             Create account
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default RegisterForm;

import s from "./RegisterForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { EyeIcon } from "lucide-react";
// // import { useDispatch } from "react-redux";
// // import { registration } from "../../redux/auth/operations";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const emailRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .matches(emailRegular, "Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const dispatch = useDispatch();

  const handleSubmit = (values, action) => {
    console.log("Form submitted:", values);
    // Handle form submission here
    setTimeout(() => {
      action.setSubmitting(false);
    }, 400);
    action.resetForm();
  };
  // dispatch(registration(newContact));

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
            {({ isSubmitting, dirty }) => (
              <Form className={s.form}>
                <div className={s.formFields}>
                  <div className={s.labelInputContainer}>
                    <label className={s.label} htmlFor="name">
                      Enter your name
                    </label>
                    <Field
                      className={s.input}
                      type="text"
                      name="name"
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
                      Create a strong password
                    </label>
                    <div className={s.passwordField}>
                      <Field
                        className={s.passwordInput}
                        type={showPassword ? "text" : "password"}
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

                  <div className={s.labelInputContainer}>
                    <label className={s.label} htmlFor="confirmPassword">
                      Repeat your password
                    </label>
                    <div className={s.passwordField}>
                      <Field
                        className={s.passwordInput}
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="*********"
                        autoComplete="new-password"
                      />
                      <EyeIcon
                        className={s.eyeIcon}
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
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
                  {isSubmitting ? "Creating account..." : "Create account"}
                </button>
              </Form>
            )}
          </Formik>

          <p className={s.loginPrompt}>
            <span>Already have an account? </span>
            <a href="#" className={s.loginLinkBottom}>
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
