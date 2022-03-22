import classes from './ContactPage.module.css';
import ContactPageHeader from './ContactPageHeader/ContactPageHeader';
import ContactPageSearchBar from './ContactPageSearchBar/ContactPageSearchBar';
import Contacts from './Contacts/Contacts';
import ContactDetails from './ContactDetails/ContactDetails';
import React, { useState, useEffect } from 'react';
import Modal from '../Ui/Modal/Modal';
import ContactContex from '../../ContactContex';

const ContactPage = (props) => {

  const [modalState, setModalState] = useState({ show: false, type: 'add' });
  const [ContactsArray, setContactsArray] = useState([]);
  const [editId, setEditId] = useState('');
  const [viewId, setViewId] = useState("");
  const [selectedDeleteIds, setSelectedDeleteIds] = useState([]);

  // window.addEventListener("unload", () => {
  //   localStorage.setItem("contacts", JSON.stringify(ContactsArray));
  // });
  // window.addEventListener("load", () => {
  //   const contacts = JSON.parse(localStorage.getItem("contacts"));
  //   console.log("contacts from LocalStorage", contacts);
  // });
  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    console.log("getting Contacts in Localstorage..", contacts);
    setContactsArray(contacts);
  }, [])
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(ContactsArray));
    console.log("setting Contacts in Localstorage..");
  }, [ContactsArray]);

  let selectedContact = null;
  if (editId != '') {
    selectedContact = ContactsArray.find(contact => contact.id == editId);
  }

  const deleteIdsHandler = (event, id, action) => {
    event.stopPropagation();
    const deleteIds = [...selectedDeleteIds];
    if (action == "add") {
      deleteIds.push(id);
    } else {
      const index = deleteIds.findIndex(deleteId => deleteId == id);
      deleteIds.splice(index, 1);
    }
    setSelectedDeleteIds(deleteIds);
  }

  const deleteSelectedContacts = () => {
    const contacts = [...ContactsArray].filter(contact => !selectedDeleteIds.includes(contact.id));
    if (selectedDeleteIds.includes(viewId)) {
      setViewId("");
    }
    setSelectedDeleteIds([]);
    setContactsArray(contacts);
  }

  const modalHandler = (event, value, openType, id = "") => {
    event.stopPropagation();
    console.log("modalHandler called");
    setModalState({ show: value, type: openType });
    if (id != '') {
      setEditId(id);
    }
  }

  const viewIdHandler = (id) => {
    console.log("view Added...");
    setViewId(id);
  }

  const getContactById = (viewId) => {
    return ContactsArray.find(contact => contact.id == viewId);
  }


  const addContactHandler = (contactInfo) => {
    let shortName = "";
    for (let word of contactInfo.name.split(" ")) {
      shortName += word[0].toString();
    }
    const id = contactInfo.name + " " + contactInfo.phone;
    const contacts = [...ContactsArray];
    contacts.push({ ...contactInfo, id: id, shortName: shortName.toLocaleUpperCase() });
    setContactsArray(contacts);
  }

  const editContactHandler = (id, updatedInfo) => {
    console.log("editing contact...");
    let shortName = "";
    for (let word of updatedInfo.name.split(" ")) {
      shortName += word[0].toString();
    }
    const contacts = [...ContactsArray];
    const newId = updatedInfo.name + " " + updatedInfo.phone;
    const updatedArray = contacts.map(contact => {
      if (contact.id == id) {
        return { ...updatedInfo, id: newId, shortName: shortName.toLocaleUpperCase() }
      } else {
        return contact;
      }
    });
    if (viewId != "") {
      setViewId(newId);
    }
    setContactsArray(updatedArray);
  }

  const deleteContactHandler = (event, id) => {
    event.stopPropagation();
    console.log("delete contact...");
    const contacts = [...ContactsArray].filter(contact => contact.id !== id);
    if (viewId == id) {
      setViewId("");
    }
    if (selectedDeleteIds.includes(id)) {
      const index = selectedDeleteIds.findIndex(deleteId => deleteId == id);
      const existingSelectedDeleteIds = [...selectedDeleteIds];
      existingSelectedDeleteIds.splice(index, 1);
      setSelectedDeleteIds(existingSelectedDeleteIds);
    }
    setContactsArray(contacts);
  }
  console.log("selected DeleteIds", selectedDeleteIds);

  return <ContactContex.Provider value={{ contactDeleted: deleteContactHandler }}>
    <Modal
      show={modalState.show}
      type={modalState.type}
      modalCancelled={modalHandler}
      contactAdded={addContactHandler}
      contactEdited={editContactHandler}
      selectedContact={selectedContact}
    />
    <div className={classes.contactPage}>
      <ContactPageHeader />
      <div className={classes.contactPage__Content}>
        <ContactPageSearchBar clicked={modalHandler} showDeleteButton={selectedDeleteIds.length > 1} deleteSelectedContact={deleteSelectedContacts} />
        <div className={classes["contactPage__Content-bottom"]}>
          <Contacts contacts={ContactsArray} modalOpened={modalHandler} viewAdded={viewIdHandler} deleteIdsHandler={deleteIdsHandler} />
          {viewId && <ContactDetails contact={getContactById(viewId)} />}
        </div>
      </div>
    </div>
  </ContactContex.Provider>;
}

export default ContactPage;