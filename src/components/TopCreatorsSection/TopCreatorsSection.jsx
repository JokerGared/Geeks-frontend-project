import { Link } from 'react-router-dom';

const TopCreatorsSection = () => {
  return (
    <div>
      <h2>Top Creators</h2>
      <Link to='/authors'>Go to all Creators</Link>
    </div>
  );
};

export default TopCreatorsSection;
