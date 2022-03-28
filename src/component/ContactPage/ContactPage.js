import classes from './ContactPage.module.css';
import ContactPageHeader from '../ContactPageHeader/ContactPageHeader';
import ContactPageSearchBar from '../ContactPageSearchBar/ContactPageSearchBar';
import Contacts from '../Contacts/Contacts';
import ContactDetails from '../ContactDetails/ContactDetails';
import React, { useState, useEffect } from 'react';
import Modal from '../Ui/Modal/Modal';
import ContactContex from '../../ContactContex';
import md5 from 'md5';

const ContactPage = (props) => {

  const [modalState, setModalState] = useState({ show: false, type: 'add' });
  const [ContactsArray, setContactsArray] = useState([]);
  const [editId, setEditId] = useState('');
  const [viewId, setViewId] = useState("");
  const [selectedDeleteIds, setSelectedDeleteIds] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedContactsArray, setSearchedContactsArray] = useState([]);

  //getting data from localhost
  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    setContactsArray(contacts);
  }, []);

  //setting data in localhost
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(ContactsArray));
  }, [ContactsArray]);

  //managing search result
  useEffect(() => {
    if (searchText !== "") {
      let searchedContactsArray = ContactsArray.filter(contact => {
        if (contact.name.toLocaleLowerCase().includes(searchText) || contact.email.toLocaleLowerCase().includes(searchText) || contact.company.toLocaleLowerCase().includes(searchText)) {
          return true;
        } else {
          return false;
        }
      });
      setSearchedContactsArray(searchedContactsArray);
      console.log("SearchedContactArray:  ", searchedContactsArray);
    }
  }, [searchText, ContactsArray]);

  //EditContact
  let selectedContact = null;
  if (editId != '') {
    selectedContact = ContactsArray.find(contact => contact.id == editId);
  }

  const editContactHandler = (id, updatedInfo) => {
    console.log("editing contact...");
    let shortName = "";
    for (let word of updatedInfo.name.split(" ")) {
      shortName += word[0].toString();
    }
    const bgColor = "#" + md5(updatedInfo.name).slice(0, 6);
    const contacts = [...ContactsArray];
    const newId = updatedInfo.name + " " + updatedInfo.phone;
    const updatedArray = contacts.map(contact => {
      if (contact.id == id) {
        return { ...updatedInfo, id: newId, shortName: shortName.toLocaleUpperCase(), bgColor: bgColor }
      } else {
        return contact;
      }
    });
    if (viewId != "") {
      setViewId(newId);
    }
    setContactsArray(updatedArray);
  }

  const searchTextChangedHandler = (text) => {
    console.log("SearchText is::" + text);
    setSearchText(text.trim().toLocaleLowerCase());
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
    const bgColor = "#" + md5(contactInfo.name).slice(0, 6);
    const id = contactInfo.name + " " + contactInfo.phone;
    const contacts = [...ContactsArray];
    contacts.push({ ...contactInfo, id: id, shortName: shortName.toLocaleUpperCase(), bgColor: bgColor });
    setContactsArray(contacts);
  }

  const deleteContactHandler = (id) => {
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

  return <ContactContex.Provider value={{ contactDeleted: deleteContactHandler }}>
    <Modal
      show={modalState.show}
      type={modalState.type}
      modalCancelled={modalHandler}
      contactAdded={addContactHandler}
      contactEdited={editContactHandler}
      selectedContact={selectedContact}
      contacts={ContactsArray}
    />
    <div className={classes.contactPage}>
      <ContactPageHeader />
      <div className={classes.contactPage__Content}>
        <ContactPageSearchBar
          clicked={modalHandler}
          showDeleteButton={selectedDeleteIds.length > 1}
          deleteSelectedContact={deleteSelectedContacts}
          searchTextChanged={searchTextChangedHandler} />
        <div className={classes["contactPage__Content-bottom"]}>
          <Contacts contacts={searchText == "" ? ContactsArray : searchedContactsArray} modalOpened={modalHandler} viewAdded={viewIdHandler} deleteIdsHandler={deleteIdsHandler} />
          {viewId && <ContactDetails contact={getContactById(viewId)} />}
        </div>
      </div>
    </div>
  </ContactContex.Provider>;
}

export default ContactPage;