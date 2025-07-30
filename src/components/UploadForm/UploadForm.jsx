import s from './UploadForm.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { X, Camera } from 'lucide-react';

const UploadForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);

      // Создаем preview изображения
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (selectedImage) {
      // dispatch(setPhotoData(selectedImage));
      console.log('Фото загружено:', selectedImage);
    }
    navigate('/HomeAuthorised');
  };

  const handleClose = () => {
    navigate('/');
  };

  const triggerFileInput = () => {
    document.getElementById('photo-upload').click();
  };

  return (
    <div className={s.uploadContainer}>
      <div className={s.uploadCard}>
        <div className={s.cardContent}>
          <button
            className={s.closeButton}
            onClick={handleClose}
            aria-label="Close"
          >
            <svg aria-hidden="true" className={s.closeIcon}>
              <use href="/icons.svg#icon-close" />
            </svg>
          </button>

          <h1 className={s.title}>Upload your photo</h1>

          <div className={s.imageContainer}>
            {imagePreview ? (
              <img
                className={s.profileImage}
                alt="Profile preview"
                src={imagePreview}
                onClick={triggerFileInput}
              />
            ) : (
              <div
                className={s.placeholderImage}
                onClick={triggerFileInput}
                role="button"
                tabIndex={0}
                aria-label="Upload photo"
              >
                <div className={s.cameraIconContainer}>
                  <svg className={s.cameraIcon} aria-hidden="true">
                    <use href="/icons.svg#icon-Camera" />
                  </svg>
                </div>
              </div>
            )}

            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={s.hiddenInput}
            />
          </div>

          <div className={s.buttonSection}>
            <button
              type="button"
              className={s.saveButton}
              onClick={handleSubmit}
              disabled={!selectedImage}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
