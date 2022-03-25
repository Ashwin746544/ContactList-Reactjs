import classes from './ContactPageSearchBar.module.css';
import searchIcon from '../../assets/search.svg';
import GenericModal from '../Ui/GenericModal/GenericModal';
import { useState } from 'react';

const ContactPageSearchBar = (props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const openModalHandler = () => {
    setShowConfirmModal(true);
  }

  const cancelModalHandler = () => {
    setShowConfirmModal(false);
  }
  const deleteSelectedContactsAndCloseModal = () => {
    props.deleteSelectedContact();
    cancelModalHandler();

  }
  return (
    <>
      <GenericModal show={showConfirmModal} successHandler={deleteSelectedContactsAndCloseModal} cancelHandler={cancelModalHandler}>Do you Really Want to delete all Selected Contacts?</GenericModal>
      <div className={classes.searchBar}>
        <div className={classes.searchInputContainer}>
          <input type='text' name="search" placeholder="Search contacts" onChange={(event) => props.searchTextChanged(event.target.value)} />
          <button className={classes.searchButton}><img src={searchIcon} /></button>
        </div>
        <button className={classes.contactsActionBtn} onClick={(event) => props.clicked(event, true, 'add', "")}><span>+ </span>Add Contact</button>
        {props.showDeleteButton && <button className={classes.contactsActionBtn} onClick={openModalHandler}>Delete All</button>}
      </div>
    </>
  );
}

export default ContactPageSearchBar;