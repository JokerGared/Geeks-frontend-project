import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { lazy } from 'react';
import PrivateRoute from './components/Route/PrivateRoute';
import AuthorsArticles from './components/AuthorsArticles/AuthorsArticles';
import RestrictedRoute from './components/Route/RestrictedRoute';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage/ArticlesPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage/ArticlePage'));
const AuthorsPage = lazy(() => import('./pages/AuthorsPage/AuthorsPage'));
const AuthorProfilePage = lazy(() =>
  import('./pages/AuthorProfilePage/AuthorProfilePage'),
);
const MyProfile = lazy(() => import('./pages/MyProfile/MyProfile'));
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

        <Route
          path="register"
          element={
            <RestrictedRoute component={<RegisterPage />} redirectTo="/" />
          }
        />
        <Route
          path="photo"
          element={
            <RestrictedRoute component={<UploadPhotoPage />} redirectTo="/" />
          }
        />

        <Route
          path="login"
          element={<RestrictedRoute component={<LoginPage />} redirectTo="/" />}
        />

        <Route path="articles" element={<ArticlesPage />} />
        <Route path="articles/:articleId" element={<ArticlePage />} />

        <Route path="authors" element={<AuthorsPage />} />
        <Route path="authors/:authorId" element={<AuthorProfilePage />} />

        <Route
          path="my-profile"
          element={
            <PrivateRoute component={<MyProfile />} redirectTo="/login" />
          }
        >
          <Route index element={<AuthorsArticles />} />
          <Route path="my-articles" element={<AuthorsArticles />} />
          <Route path="saved" element={<AuthorsArticles />} />
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
