import { useEffect, useState } from "react";
import ArticlesList from "../components/ArticlesList";
import LoadMoreBtn from "../components/LoadMoreBtn";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchArticles(filter, 1, true);
  }, [filter]);

  const fetchArticles = async (type, pageNumber, replace = false) => {
    try {
      const response = await fetch(
        `/api/articles?type=${type.toLowerCase()}&page=${pageNumber}`
      );
      const data = await response.json();
      if (replace) {
        setArticles(data.articles);
      } else {
        setArticles((prev) => [...prev, ...data.articles]);
      }
      setHasMore(data.hasMore);
      setPage(pageNumber);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleLoadMore = () => {
    fetchArticles(filter, page + 1);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setPage(1);
  };

  return (
    <section className="articles-page">
      <div className="header">
        <h2>Articles</h2>
        <div className="subheader">
          <span>{articles.length} articles</span>
          <select value={filter} onChange={handleFilterChange}>
            <option>All</option>
            <option>Popular</option>
          </select>
        </div>
      </div>

      <ArticlesList articles={articles} />

      {hasMore && <LoadMoreBtn onClick={handleLoadMore} />}
    </section>
  );
};

export default ArticlesPage;
