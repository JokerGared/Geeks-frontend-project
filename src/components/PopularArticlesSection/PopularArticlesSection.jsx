import { Link } from 'react-router-dom';

const PopularArticlesSection = () => {
  return (
    <section>
      <h2>Popular Articles</h2>
      <Link to="/articles">Go to all Articles</Link>
    </section>
  );
};

export default PopularArticlesSection;
