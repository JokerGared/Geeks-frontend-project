import { useState, useEffect } from "react";
import axios from "axios";
import ArticlesList from "../../components/ArticlesList/ArticlesList";
import styles from "./ArticlesPage.module.css";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("popular");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "https://your-backend-api.com/articles"
        );
        setArticles(response.data);
      } catch (err) {
        setError("Failed to retrieve articles");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className={styles.articlesPageWrapper}>
      <h2 className={styles.pageTitle}>Articles</h2>

      <div className={styles.counterContainer}>
        <span className={styles.articleCounter}>
          {articles.length} articles
        </span>

        <select
          className={styles.filterSelect}
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="popular">Popular</option>
          <option value="all">All</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && <ArticlesList articles={articles} />}
    </div>
  );
};

export default ArticlesPage;
