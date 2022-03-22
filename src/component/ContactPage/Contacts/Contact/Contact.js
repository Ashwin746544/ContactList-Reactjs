import Icon from '../../../Ui/Icon/Icon';
import classes from './Contact.module.css';
import editIcon from '../../../../assets/edit.png';
import deleteIcon from '../../../../assets/delete.png';
import { useContext } from 'react';
import ContactContex from '../../../../ContactContex';

const Contact = (props) => {

  const contex = useContext(ContactContex);

  const checkboxHandler = (event) => {
    if (event.target.checked) {
      props.deleteIdsHandler(event, props.contact.id, "add");
    } else {
      props.deleteIdsHandler(event, props.contact.id, "remove");
    }
  }

  return <tr className={classes.contact} onClick={props.viewAdded.bind(this, props.contact.id)}>
    <td><input type="checkbox" name="contacthCeck" onClick={(event) => checkboxHandler(event)} /></td>
    <td className={classes.info}>
      <div className={classes["info__name-round"]}>{props.contact.shortName}</div>
      <div className={classes["info__details"]}>
        <p className={classes["info__details-name"]}>{props.contact.name}</p>
        <p className={classes["info__details-email"]}>{props.contact.email}</p>
      </div>
    </td>
    <td>{props.contact.company}</td>
    <td><Icon source={editIcon} clicked={(event) => props.modalOpened(event, true, "edit", props.contact.id)} /></td>
    {/* <td><Icon source={editIcon} /></td> */}
    <td><Icon source={deleteIcon} clicked={(event) => contex.contactDeleted(event, props.contact.id)} /></td>
  </tr>;
}

export default Contact;