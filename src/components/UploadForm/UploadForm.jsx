import s from './UploadForm.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { selectRegistrationFormData } from '../../redux/auth/selectors';
import { toast } from 'react-hot-toast';

const UploadForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registrationFormData = useSelector(selectRegistrationFormData);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      toast.error('Please select a photo to upload');
      return;
    }

    if (!registrationFormData) {
      toast.error(
        'Registration data is missing. Please start registration again.',
      );
      navigate('/register');
      return;
    }

    setIsSubmitting(true);

    try {
      const registrationDataWithAvatar = {
        ...registrationFormData,
        avatar: selectedImage,
      };

      await dispatch(register(registrationDataWithAvatar)).unwrap();

      toast.success('Registration successful!');
      navigate('/home-authorised');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
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
              disabled={!selectedImage || isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
