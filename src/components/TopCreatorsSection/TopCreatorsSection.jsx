import { Link } from 'react-router-dom';

const TopCreatorsSection = () => {
  return (
    <section>
      <h2>Top Creators</h2>
      <Link to="/authors">Go to all Creators</Link>
    </section>
  );
};

export default TopCreatorsSection;
