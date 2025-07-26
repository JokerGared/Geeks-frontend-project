import PropTypes from 'prop-types';
import s from './ArticleItem.module.css';

const ArticleItem = ({ id, title, description, author, imageUrl }) => {
  const fallbackImage = 'https://via.placeholder.com/300x200?text=No+Image';

  return (
    <div className={s.card}>
      <img
        src={imageUrl || fallbackImage}
        alt={title || 'Article Image'}
        className={s.image}
      />

      <div className={s.content}>
        <h3 className={s.title}>{title || 'Untitled'}</h3>
        <p className={s.author}>By {author || 'Unknown'}</p>
        <p className={s.description}>
          {description || 'No description provided.'}
        </p>

        <div className={s.actions}>
          <button className={s.learnMore}>Learn more</button>
          <button className={s.save}>Save</button>
        </div>
      </div>
    </div>
  );
};

ArticleItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default ArticleItem;
