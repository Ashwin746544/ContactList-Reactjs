import Input from '../../Input/Input';
import classes from './Modal.module.css';
import { useState, useRef, useEffect } from 'react';

const Modal = (props) => {

  let nameRef = useRef();
  let emailRef = useRef();
  let phoneRef = useRef();
  let companyRef = useRef();
  let roleRef = useRef();
  let addressRef = useRef();
  let formRef = useRef();

  const [nameState, SetNameState] = useState({ value: "", isvalid: true, errorMessage: "name should be more than 5 Character long!" });
  const [emailState, SetEmailState] = useState({ value: "", isvalid: true, errorMessage: "email is not valid!" });
  const [phoneState, SetPhoneState] = useState({ value: "", isvalid: true, errorMessage: "phone No. is not valid!" });
  const [companyState, SetCompanyState] = useState({ value: "", isvalid: true, errorMessage: "company name should be more than 5 character long!" });
  const [roleState, SetRoleState] = useState({ value: "", isvalid: true, errorMessage: "role should be more than 5 Character long!" });
  const [addressState, SetAddressState] = useState({ value: "", isvalid: true, errorMessage: "address should be more than 20 Character long!" });

  useEffect(() => {
    console.log("useEffect " + props.type);
    SetNameState({ ...nameState, isvalid: true });
    SetEmailState({ ...emailState, isvalid: true });
    SetPhoneState({ ...phoneState, isvalid: true });
    SetCompanyState({ ...companyState, isvalid: true });
    SetRoleState({ ...roleState, isvalid: true });
    SetAddressState({ ...addressState, isvalid: true });
    if (props.type == "edit") {
      console.log("inside useEffect");
      nameRef.current.value = props.selectedContact.name;
      emailRef.current.value = props.selectedContact.email;
      phoneRef.current.value = props.selectedContact.phone;
      companyRef.current.value = props.selectedContact.company;
      roleRef.current.value = props.selectedContact.role;
      addressRef.current.value = props.selectedContact.address;
    } else {
      formRef.current.reset();
    }
  }, [props.show]);

  const submitHandler = (event) => {
    console.log("formRef", formRef);
    event.preventDefault();
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    const company = companyRef.current.value.trim();
    const role = roleRef.current.value.trim();
    const address = addressRef.current.value.trim();

    const nameIsValid = checkValidity('name', name);
    const emailIsValid = checkValidity('email', email);
    const phoneIsValid = checkValidity('phone', phone);
    const companyIsValid = checkValidity('company', company);
    const roleIsValid = checkValidity('role', role);
    const addressIsValid = checkValidity('address', address);

    SetNameState({ ...nameState, value: name, isvalid: nameIsValid });
    SetEmailState({ ...emailState, value: email, isvalid: emailIsValid });
    SetPhoneState({ ...phoneState, value: phone, isvalid: emailIsValid });
    SetCompanyState({ ...companyState, value: company, isvalid: emailIsValid });
    SetRoleState({ ...roleState, value: role, isvalid: emailIsValid });
    SetAddressState({ ...addressState, value: address, isvalid: emailIsValid });

    if (!nameIsValid || !emailIsValid || !phoneIsValid || !companyIsValid || !roleIsValid || !addressIsValid) {
      return;
    } else {
      const contact = { name: name, email: email, phone: phone, company: company, role: role, address: address };
      if (props.type == "edit") {
        props.contactEdited(props.selectedContact.id, contact);
      } else {
        props.contactAdded(contact);
      }
      props.modalCancelled(event, false, "add", "");
      formRef.current.reset();
    }
  }

  const checkValidity = (input, value) => {
    if (input == "company" || input == 'role') {
      if (/^[a-zA-Z ]{5,}$/.test(value)) {
        return true;
      }
      return false;
    }
    switch (input) {
      case "name":
        if (/^[a-zA-Z ]{5,}$/.test(value)) {
          return true;
        }
        return false;
      case "email":
        if (/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value)) {
          return true;
        }
        return false;
      case "phone":
        if (/^[0-9]{10}$/.test(value)) {
          return true;
        }
        return false;
      case "address":
        if (/^[a-zA-Z0-9 \.,\-]{20,}$/.test(value)) {
          return true;
        }
        return false;
      default:
        return false;
    }
  }

  return (
    <>
      <div className={classes.backdrop}
        style={{ display: props.show ? "block" : "none" }}
        onClick={(event) => props.modalCancelled(event, false, "add")}></div>
      <div className={classes.Modal}
        // style={{ transform: props.show ? "translateY(0)" : "translateY(-100vh)" }}>
        style={{ display: props.show ? "block" : "none" }}>
        <h1>{props.type == "add" ? "Enter " : "Update "}Contact Data</h1>
        <form onSubmit={submitHandler} ref={formRef}>
          <Input inpType="text" label="name" placeHolder="Enter Fullname" errorMessage={nameState.errorMessage} valid={nameState.isvalid} ref={nameRef} />
          <Input inpType="text" label="email" placeHolder="Enter Email" errorMessage={emailState.errorMessage} valid={emailState.isvalid} ref={emailRef} />
          <Input inpType="number" label="phone" placeHolder="Enter Phone No." errorMessage={phoneState.errorMessage} valid={phoneState.isvalid} ref={phoneRef} />
          <Input inpType="text" label="company" placeHolder="Enter Company Name" errorMessage={companyState.errorMessage} valid={companyState.isvalid} ref={companyRef} />
          <Input inpType="text" label="role" placeHolder="Enter Role" errorMessage={roleState.errorMessage} valid={roleState.isvalid} ref={roleRef} />
          <Input inpType="text" label="address" placeHolder="Enter Address" errorMessage={addressState.errorMessage} valid={addressState.isvalid} ref={addressRef} />
          <div className={classes.modal_actions}>
            <button type='button' className={classes.Danger} onClick={(event) => props.modalCancelled(event, false, "add", "")}>Cancel</button>
            <button type='submit' className={classes.Success}>{props.type == "add" ? "Add Contact" : "Edit Contact"}</button>
          </div>
        </form>
        <div />
      </div>
    </>
  );
}

export default Modal;