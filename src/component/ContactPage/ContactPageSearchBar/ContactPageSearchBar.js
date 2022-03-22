import Icon from '../../Ui/Icon/Icon';
import classes from './ContactPageSearchBar.module.css';
import searchIcon from '../../../assets/search.svg';
import deleteIcon from '../../../assets/delete.svg';

const ContactPageSearchBar = (props) => {
  return (
    <div className={classes.searchBar}>
      <div className={classes.searchInputContainer}>
        <input type='text' name="search" placeholder="Search contacts" />
        <button className={classes.searchButton}><img src={searchIcon} /></button>
      </div>
      <button onClick={(event) => props.clicked(event, true, 'add', "")}><span>+ </span>Add Contact</button>
      {props.showDeleteButton && <button onClick={props.deleteSelectedContact}>Delete All</button>}
    </div>
  );
}

export default ContactPageSearchBar;