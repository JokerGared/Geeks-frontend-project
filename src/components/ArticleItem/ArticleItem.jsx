import s from './ArticleItem.module.css';
import ButtonAddToBookmarks from '../ButtonAddToBookmarks/ButtonAddToBookmarks';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import ButtonEdit from '../ButtonEdit/ButtonEdit';

const ArticleItem = ({ _id, img, title, desc, ownerId }) => {
  const user = useSelector(selectUser);
  const isOwn = ownerId === user?._id;

  return (
    <article className={s.card}>
      <img src={img} alt={title} className={s.image} />

      <div className={s.content}>
        <p className={s.author}>{user.name}</p>
        <p className={s.title}>{title}</p>

        <p className={s.desc}>{desc}</p>
      </div>
      <div className={s.actions}>
        <Link to={`/articles/${_id}`} className={s.learnMore}>
          Learn more
        </Link>
        {isOwn ? (
          <ButtonEdit to={`/create/${_id}`} />
        ) : (
          <ButtonAddToBookmarks articleId={_id} />
        )}
      </div>
    </article>
  );
};

export default ArticleItem;
