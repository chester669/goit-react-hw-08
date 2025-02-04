import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/contactsOps";
import { selectFilteredContacts } from "../../redux/contacts/contactSelectors";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);

  return (
    <ul className={styles["contact-list"]}>
      {contacts.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        contacts.map(({ id, name, number }) => (
          <li key={id} className={styles["contact-item"]}>
            <div className={styles["contact-info"]}>
              <span className={styles["contact-name"]}>{name}</span>
              <span className={styles["contact-number"]}>{number}</span>
            </div>
            <button
              className={styles["delete-button"]}
              onClick={() => dispatch(deleteContact(id))}
            >
              Delete
            </button>
          </li>
        ))
      )}
    </ul>
  );
};

export default ContactList;
