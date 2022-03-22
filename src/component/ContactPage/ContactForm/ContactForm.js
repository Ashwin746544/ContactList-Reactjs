import Modal from "../../Ui/Modal/Modal";


const ContactForm = (props) => {


  return (
    <Modal>
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
    </Modal>
  );
}