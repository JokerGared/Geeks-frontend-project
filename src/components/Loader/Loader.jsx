import { ClipLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import styles from './Loader.module.css';

const Loader = ({ size = 50, color = '#4fa94d', fullScreen = true }) => {
  return (
    <div
      className={fullScreen ? styles.overlay : styles.inline}
      role="status"
      aria-live="polite"
      aria-label="Loading content..."
    >
      <ClipLoader size={size} color={color} aria-hidden="true" />
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  fullScreen: PropTypes.bool,
};

export default Loader;
