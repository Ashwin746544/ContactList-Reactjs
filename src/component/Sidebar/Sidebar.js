import Icon from '../Ui/Icon/Icon';
import classes from './Sidebar.module.css';
import barsIcon from '../../assets/bars.svg';
import userIcon from '../../assets/user.svg';
import homeIcon from '../../assets/home.svg';
import chartIcon from '../../assets/chart.svg';
import databaseIcon from '../../assets/database.svg';
import settingIcon from '../../assets/setting.svg';
import clipboardIcon from '../../assets/clipboard.svg';
import calenderIcon from '../../assets/calender.svg';

const SideBar = (props) => {
  return (
    <section className={classes.sideBar}>
      <div className={classes.barsIconContainer}>
        <Icon isButton source={barsIcon} />
      </div>
      <div>
        <Icon source={homeIcon} />
        <Icon source={userIcon} ownStyle={{ borderLeft: "5px solid white" }} />
        <Icon source={clipboardIcon} />
        <Icon source={chartIcon} />
        <Icon source={databaseIcon} />
        <Icon source={calenderIcon} />
        <Icon source={settingIcon} />
      </div>
    </section>
  );
}
export default SideBar;