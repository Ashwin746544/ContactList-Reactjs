import classes from './ContactDetails.module.css';

const ContactDetails = (props) => {
  return (
    <div className={classes.contactDetails}>
      <div className={classes["details-top"]}>
        <div className={classes["details-top-name_round"]}>{props.contact.shortName}</div>
        <p className={classes["details-top-name"]}>{props.contact.name}</p>
        <p className={classes["details-top-role"]}>{props.contact.role + " @ " + props.contact.company} </p>
      </div>
      <div className={classes["details-bottom"]}>
        <table>
          <thead><tr><th>Full name:</th><td>{props.contact.name}</td></tr></thead>
          <tbody>
            <tr><th>Email:</th><td>{props.contact.email}</td></tr>
            <tr><th>Phone:</th><td>{props.contact.phone}</td></tr>
            <tr><th>Company:</th><td>{props.contact.company}</td></tr>
            <tr><th>Address:</th><td>{props.contact.address}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactDetails;