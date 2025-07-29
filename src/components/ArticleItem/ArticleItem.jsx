import s from './ArticleItem.module.css';
import ButtonAddToBookmarks from '../ButtonAddToBookmarks/ButtonAddToBookmarks';
import { Link } from 'react-router-dom';
import { selectUser } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';
import ButtonEdit from '../ButtonEdit/ButtonEdit';

const ArticleItem = ({ _id, img, title, desc, ownerId }) => {
  const user = useSelector(selectUser);

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
        {ownerId._id === user._id ? <ButtonEdit /> : <ButtonAddToBookmarks />}
      </div>
    </article>
  );
};

export default ArticleItem;
