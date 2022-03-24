import Icon from '../../../Ui/Icon/Icon';
import classes from './Contact.module.css';
import editIcon from '../../../../assets/edit.svg';
import deleteIcon from '../../../../assets/delete.svg';
import { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import ContactContex from '../../../../ContactContex';
import GenericModal from '../../../Ui/GenericModal/GenericModal';

const Contact = (props) => {

  const contex = useContext(ContactContex);
  const [isSelected, setIsSelected] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openModalHandler = (event) => {
    console.log("openModalHandler");
    event.stopPropagation();
    setShowConfirmModal(true);
  }

  const cancelModalHandler = () => {
    setShowConfirmModal(false);
  }

  const checkboxHandler = (event) => {
    if (event.target.checked) {
      props.deleteIdsHandler(event, props.contact.id, "add");
      setIsSelected(true);
    } else {
      props.deleteIdsHandler(event, props.contact.id, "remove");
      setIsSelected(false);
    }
  }

  let style = {};
  if (isSelected) {
    style = { backgroundColor: "#e8ecef" }
  }

  return <>
    <GenericModal show={showConfirmModal} cancelHandler={cancelModalHandler} successHandler={() => contex.contactDeleted(props.contact.id)}>Do You Really Want to Cotinue?</GenericModal>
    {/* {showConfirmModal ? ReactDOM.createPortal(<GenericModal show={showConfirmModal} cancelHandler={cancelModalHandler} successHandler={() => contex.contactDeleted(props.contact.id)}>Do You Really Want to Delete this contact?</GenericModal>, document.getElementById("enjectModal")) : null} */}
    <tr className={classes.contact} onClick={props.viewAdded.bind(this, props.contact.id)} style={style}>
      <td><input type="checkbox" name="contacthCeck" onClick={(event) => checkboxHandler(event)} /></td>
      <td className={classes.info}>
        <div className={classes["info__name-round"]} style={{ backgroundColor: props.contact.bgColor }}>{props.contact.shortName}</div>
        <div className={classes["info__details"]}>
          <p className={classes["info__details-name"]}>{props.contact.name}</p>
          <p className={classes["info__details-email"]}>{props.contact.email}</p>
        </div>
      </td>
      <td>{props.contact.company}</td>
      <td><Icon isButton source={editIcon} clicked={(event) => props.modalOpened(event, true, "edit", props.contact.id)} /></td>
      {/* <td><Icon source={editIcon} /></td> */}
      <td><Icon isButton source={deleteIcon} clicked={(event) => openModalHandler(event)} /></td>
    </tr></>;
}

export default Contact;