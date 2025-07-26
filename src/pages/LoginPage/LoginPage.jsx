import s from './LoginPage.module.css';
import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage = () => {
  return (
    <div className={s.logPageContainer}>
      <LoginForm />
    </div>
  );
};
export default LoginPage;
