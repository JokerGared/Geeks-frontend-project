import s from './ArticleItem.module.css';
import ButtonAddToBookmarks from '../ButtonAddToBookmarks/ButtonAddToBookmarks';
import { Link } from 'react-router-dom';

const ArticleItem = ({ _id, img, title, desc, ownerId }) => {
  return (
    <article className={s.card}>
      <img src={img} alt={title} className={s.image} />

      <div className={s.content}>
        <p className={s.author}>{ownerId.name}</p>
        <p className={s.title}>{title}</p>

        <p className={s.desc}>{desc}</p>
      </div>
      <div className={s.actions}>
        <Link to={`/articles/${_id}`} className={s.learnMore}>
          Learn more
        </Link>
        <ButtonAddToBookmarks />
      </div>
    </article>
  );
};

export default ArticleItem;
