import classes from './Icon.module.css';
const Icon = (props) => {
  return (
    <div className={props.isButton ? classes["btn-container"] : classes["icon-container"]}
      style={props.ownStyle && props.ownStyle}
      onClick={props.clicked && props.clicked}>
      <img src={props.source} />
    </div>
  );
}
export default Icon;