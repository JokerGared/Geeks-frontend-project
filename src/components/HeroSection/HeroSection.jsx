import s from './HeroSection.module.css';

import { Link } from 'react-router-dom';

const HeroSection = () => {
  const isLoggedIn = false;
  return (
    <div>
      <Link to='/articles'>Go to Articles</Link>
      {!isLoggedIn && <Link to='/register'>Register</Link>}
    </div>
  );
};

export default HeroSection;
