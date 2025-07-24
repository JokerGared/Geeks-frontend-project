import { ClipLoader } from "react-spinners";
import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.loader}>
      <ClipLoader color="#1b831bbf" size={48} />
    </div>
  );
};

export default Loader;
