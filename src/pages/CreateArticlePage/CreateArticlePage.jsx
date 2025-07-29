import css from './CreateArticlePage.module.css'

import AddArticleForm from "../../components/AddArticleForm/AddArticleForm.jsx";
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';

const CreateArticlePage = () => {
    return (
      <>
        <SectionTitle className={css["create-article-title"]}>Create an article</SectionTitle>
        <AddArticleForm />
      </>
    );
};

export default CreateArticlePage;
