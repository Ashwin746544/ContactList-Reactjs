import contactBookIcon from '../../assets/Contact-book.svg';
import Icon from '../Ui/Icon/Icon';
import classes from './ContactPageHeader.module.css';

const ContactPageHeader = () => {
  const style = {
    height: "35px",
    width: '35px'
  }
  return (
    <div className={classes.contactHeader}>
      <Icon source={contactBookIcon} style={style} />
      <div className={classes.details}>
        <h1>Contacts</h1>
        <p>Welcome to ZURU-TECH contact page</p>
      </div>
    </div>
  );
}

export default ContactPageHeader;