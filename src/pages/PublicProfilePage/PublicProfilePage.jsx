import s from './PublicProfile.module.css';
//import { useSelector } from 'react-redux';
//import { selectCurrentAuthor } from '../../redux/authors/selectors';
//import { selectAuthorArticles } from '../../redux/articles/selectors';
import Container from '../Container/Container';
import ArticleItem from '../ArticleItem/ArticleItem';
import ArticlesList from '../ArticlesList/ArticlesList';

const author = {
  name: 'Тест Автор',
  avatarUrl: 'https://via.placeholder.com/150',
  articlesAmount: 20,
};

const articles = Array.from({ length: 20 }, (_, i) => ({
  _id: String(i + 1),
  img: 'https://placehold.co/368x233?text=No+Image' + (i + 1),
  title: `Mindful Mornings: 5-Minute Rituals to Start Your Day with Calm ${
    i + 1
  }`,
  desc: `Simple, science-backed practices that can gently shift your mood and focus before the day begins. ${
    i + 1
  }`,
  ownerId: { name: 'Тест Автор' },
}));

const PublicProfile = () => {
  // const { name, avatarUrl, articlesAmount } = useSelector(selectCurrentAuthor);
  // const articles = useSelector(selectAuthorArticles);

  const { name, avatarUrl, articlesAmount } = author;

  return (
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
      <ArticlesLis />

      {/* <ul className={s.articlesList}>
        {articles.map((item) => (
          <li key={item._id}>
            <ArticleItem {...item} />
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default PublicProfile;
