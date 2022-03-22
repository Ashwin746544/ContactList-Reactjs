import classes from './Icon.module.css';
// import barsIcon from '../../../assets/bars.svg';
// import clockIcon from '../../../assets/clock.svg';
// import diskIcon from '../../../assets/disk.svg';
// import fileIcon from '../../../assets/file.svg';
// import userIcon from '../../../assets/user.svg';
// import homeIcon from '../../../assets/home.png';
const Icon = (props) => {
  return (
    <div className={classes["icon-container"]} onClick={props.clicked && props.clicked}><img src={props.source} style={props.style && props.style} /></div>
  );
}
export default Icon;