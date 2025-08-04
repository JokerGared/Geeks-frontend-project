import css from './AddArticleForm.module.css';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { createArticle, updateArticle } from '../../redux/articles/operations';

const AddArticleForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const editingArticle = location.state?.article || null;

  const initialValues = {
    title: editingArticle?.title || '',
    article: editingArticle?.article || '',
    img: null,
    desc: editingArticle?.desc || '',
  };

  useEffect(() => {
    if (editingArticle?.img) {
      setSelectedImage(editingArticle.img);
    }
  }, [editingArticle]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (editingArticle) {
        const result = await dispatch(
          updateArticle({
            id: editingArticle._id,
            updates: values,
          }),
        ).unwrap();
        toast.success('Article updated successfully!');
        navigate(`/articles/${editingArticle._id}`);
      } else {
        const result = await dispatch(createArticle(values)).unwrap();
        toast.success('Article published successfully!');
        resetForm({ values: initialValues });
        navigate(`/articles/${result._id}`);
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Title is required')
      .min(3, 'Title must be at least 3 characters')
      .max(48, 'Title can be up to 48 characters'),

    article: Yup.string()
      .required('Article is required')
      .min(100, 'Article must be at least 100 characters')
      .max(4000, 'Article can be up to 4000 characters'),

    desc: Yup.string()
      .min(3, 'Description must be at least 3 characters')
      .max(100, 'Description can be up to 100 characters'),

    img: Yup.mixed()
      .nullable()
      .required('Image is required')
      .test('fileSize', 'Image too large (max 1MB)', (value) => {
        return value && value.size <= 1000000;
      }),
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue('img', file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const textareaRef = useRef(null);
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };
  useEffect(() => {
    adjustTextareaHeight();
  }, []);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form
            className={css['create-article-form-container']}
            autoComplete="off"
          >
            <div className={css['create-article-form-img-title-wrapper']}>
              <div
                htmlFor=""
                className="create-article-form-upload-with-button-wrapper"
              >
                <div className={css.imageUploadArea}>
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className={css.selectedImage}
                    />
                  ) : (
                    <svg
                      className={css.previewImage}
                      width="72"
                      height="61"
                      viewBox="0 0 72 61"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M49.2452 34.9303C49.2452 41.0472 43.3151 46.006 36 46.006C28.6849 46.006 22.7548 41.0472 22.7548 34.9303C22.7548 28.8133 28.6849 23.8545 36 23.8545C43.3151 23.8545 49.2452 28.8133 49.2452 34.9303Z"
                        stroke="#070707"
                        strokeWidth="1"
                      />
                      <path
                        d="M1.5625 50.2031L1.5625 23.2082C1.5625 18.6716 5.96049 14.994 11.3857 14.994C15.1064 14.994 18.5078 13.2361 20.1718 10.4533L22.3981 6.73002C24.2402 3.6492 28.0058 1.70311 32.125 1.70313L39.8751 1.70315C43.9942 1.70316 47.7598 3.64925 49.6019 6.73006L51.8282 10.4533C53.4922 13.2362 56.8936 14.994 60.6143 14.994C66.0395 14.994 70.4375 18.6717 70.4375 23.2082V50.2031C70.4375 55.2254 65.5686 59.2968 59.5625 59.2968H12.4375C6.4314 59.2968 1.5625 55.2254 1.5625 50.2031Z"
                        stroke="#070707"
                        strokeWidth="1"
                      />
                    </svg>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    name="img"
                    onChange={(e) => handleImageChange(e, setFieldValue)}
                    className={css.fileInput}
                    ref={fileInputRef}
                  />
                  <ErrorMessage
                    name="img"
                    component="div"
                    className={css['create-article-error']}
                  />
                </div>
                {editingArticle && (
                  <button
                    type="button"
                    className={css['create-article-form-update-img-button']}
                    onClick={() => fileInputRef.current.click()}
                  >
                    Edit image
                  </button>
                )}
              </div>
              <div className={css['create-article-form-title-wrapper']}>
                <label className={css['create-article-form-part']}>
                  <p className={css['create-article-form-title']}>Title</p>
                  <Field
                    type="text"
                    name="title"
                    className={`${css['create-article-form-input-title']} ${
                      errors.title && touched.title ? css['input-error'] : ''
                    }`}
                    placeholder="Enter the title"
                  />
                  <ErrorMessage
                    className={css['create-article-error']}
                    name="title"
                    component="div"
                  />
                </label>
                <label className={css['create-article-form-part']}>
                  <p className={css['create-article-form-title']}>
                    Description
                  </p>
                  <Field
                    type="text"
                    name="desc"
                    className={css['create-article-form-input-title']}
                    placeholder="Enter the Subtitle"
                  />
                  <ErrorMessage
                    className={css['create-article-error']}
                    name="desc"
                    component="div"
                  />
                </label>
              </div>
            </div>
            <div className={css['create-article-form-part']}>
              <Field
                as="textarea"
                innerRef={textareaRef}
                name="article"
                className={`${css['create-article-form-input-text']} ${
                  errors.title && touched.title ? css['input-error'] : ''
                }`}
                placeholder="Enter a text"
                onInput={adjustTextareaHeight}
                onLoad={adjustTextareaHeight}
              />
              <ErrorMessage
                className={css['create-article-error']}
                name="article"
                component="div"
              />
            </div>
            {editingArticle && (
              <button
                type="button"
                className={css['publish-article-cancelButton']}
                onClick={() => navigate(`/articles/${editingArticle._id}`)}
              >
                Cancel changes
              </button>
            )}
            <button type="submit" className={css['publish-article-button']}>
              {editingArticle ? 'Update Article' : 'Publish Article'}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddArticleForm;
