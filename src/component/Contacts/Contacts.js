import Contact from '../Contact/Contact';
import classes from './Contacts.module.css';

const Contacts = (props) => {

  const Contacts = props.contacts.map(contact => <Contact
    modalOpened={props.modalOpened}
    key={contact.name + " " + contact.phone}
    contact={contact} viewAdded={props.viewAdded}
    deleteIdsHandler={props.deleteIdsHandler}
  />);
  return (
    <div className={classes.contacts}>
      <table>
        <thead>
          <tr>
            <th>+</th>
            <th>Basic Info</th>
            <th>Company</th>
            <th colSpan='2'>Actions</th>
          </tr>
        </thead>
        {!props.contacts.length == 0 && <tbody>
          {Contacts}
        </tbody>}

      </table>
      {props.contacts.length == 0 && <h1>No Contacts Available!</h1>}
    </div>
  );
}

export default Contacts;