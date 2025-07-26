import s from './HeroSection.module.css';

import { Link } from 'react-router-dom';

const HeroSection = () => {
  const isLoggedIn = false;
  return (
    <section>
      <Link to="/articles">Go to Articles</Link>
      {!isLoggedIn && <Link to="/register">Register</Link>}
    </section>
  );
};

export default HeroSection;
