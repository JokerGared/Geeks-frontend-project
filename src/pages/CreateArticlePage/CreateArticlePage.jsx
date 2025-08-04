import css from './CreateArticlePage.module.css'

import AddArticleForm from "../../components/AddArticleForm/AddArticleForm.jsx";
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';

const CreateArticlePage = () => {
    return (
      <div className={css["create-article-form-container"]}>
        <SectionTitle className={css["create-article-title"]}>Create an article</SectionTitle>
        <AddArticleForm />
      </div>
    );
};

export default CreateArticlePage;
