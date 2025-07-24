import { Link } from 'react-router-dom';

const PopularArticlesSection = () => {
  return (
    <div>
      <h2>Popular Articles</h2>
      <Link to='/articles'>Go to all Articles</Link>
    </div>
  );
};

export default PopularArticlesSection;
