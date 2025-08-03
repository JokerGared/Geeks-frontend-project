import s from './UploadPhotoPage.module.css';
import UploadForm from '../../components/UploadForm/UploadForm';

const UploadPhotoPage = () => {
  return (
    <div className={s.uploadPhotoPageContainer}>
      <UploadForm />
    </div>
  );
};

export default UploadPhotoPage;
