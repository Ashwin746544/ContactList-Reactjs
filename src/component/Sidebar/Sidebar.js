import Icon from '../Ui/Icon/Icon';
import classes from './Sidebar.module.css';
import barsIcon from '../../assets/bars.svg';
import clockIcon from '../../assets/clock.svg';
import diskIcon from '../../assets/disk.svg';
import fileIcon from '../../assets/file.svg';
import userIcon from '../../assets/user.svg';
import homeIcon from '../../assets/home.png';

const SideBar = (props) => {
  return (
    <section className={classes.sideBar}>
      <div className={classes.barsIconContainer}>
        <Icon source={barsIcon} />
      </div>
      <div>
        <Icon source={homeIcon} />
        <Icon source={userIcon} />
        <Icon source={fileIcon} />
        <Icon source={clockIcon} />
        <Icon source={diskIcon} />
      </div>
    </section>
  );
}
export default SideBar;