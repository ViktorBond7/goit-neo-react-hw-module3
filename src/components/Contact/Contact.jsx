import css from "./Contact.module.css";
import { FaUser, FaPhone } from "react-icons/fa6";
// import { FaPhone } from "react-icons/fa6";

const Contact = ({ data: { name, number, id }, onDelete }) => {
  return (
    <div className={css.container}>
      <div>
        <p className={css.title}>
          <FaUser /> {name}
        </p>
        <p className={css.title}>
          <FaPhone /> {number}
        </p>
      </div>
      <button className={css.btn} onClick={() => onDelete(id)}>
        delete
      </button>
    </div>
  );
};
export default Contact;
