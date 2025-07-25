import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { lazy } from 'react';
import SavedArticles from './components/SavedArticles/SavedArticles';
import PrivateRoute from './components/Route/PrivateRoute';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage/ArticlesPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage/ArticlePage'));
const AuthorsPage = lazy(() => import('./pages/AuthorsPage/AuthorsPage'));
const AuthorProfilePage = lazy(() =>
  import('./pages/AuthorProfilePage/AuthorProfilePage'),
);
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const UploadPhotoPage = lazy(() =>
  import('./pages/UploadPhotoPage/UploadPhotoPage'),
);
const CreateArticlePage = lazy(() =>
  import('./pages/CreateArticlePage/CreateArticlePage'),
);
const NotFound = lazy(() => import('./pages/NotFoundPage/NotFound'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="register" element={<RegisterPage />} />

        <Route
          path="photo"
          element={
            <PrivateRoute
              component={<UploadPhotoPage />}
              redirectTo="/register"
            />
          }
        />

        <Route path="login" element={<LoginPage />} />

        <Route path="articles" element={<ArticlesPage />} />
        <Route path="articles/:articleId" element={<ArticlePage />} />

        <Route path="authors" element={<AuthorsPage />} />
        <Route
          path="authors/:authorId"
          element={
            <PrivateRoute
              component={<AuthorProfilePage />}
              redirectTo="/login"
            />
          }
        >
          <Route index element={<SavedArticles />} />
          <Route path="my-articles" element={<SavedArticles />} />
          <Route path="saved" element={<SavedArticles />} />
        </Route>

        <Route
          path="create"
          element={
            <PrivateRoute
              component={<CreateArticlePage />}
              redirectTo="/login"
            />
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
