import s from './PublicProfile.module.css';
import { useSelector } from 'react-redux';
import { selectCurrentAuthor } from '../../redux/authors/selectors';
import { selectAuthorArticles } from '../../redux/articles/selectors';
import Container from '../Container/Container';
import clsx from 'clsx';

const PublicProfile = () => {
  const { name, avatarUrl, articlesAmount } = useSelector(selectCurrentAuthor);
  const articles = useSelector(selectAuthorArticles);
  return (
    <Container>
      <div>
        <div>
          <div>
            <img className={s.avatar} src={avatarUrl} alt={name} />
          </div>
          <div>
            <h2 className={s.authorName}>{name}</h2>
            <p>{articlesAmount}</p>
          </div>
        </div>

        <ul className={s.articlesList}>
          {articles.map((item) => (
            <li key={item._id} className={s.article}>
              <ArticleItem {...item} />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default PublicProfile;
