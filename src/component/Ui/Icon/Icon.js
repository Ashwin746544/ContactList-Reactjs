import classes from './Icon.module.css';
const Icon = (props) => {
  return (
    <div className={props.isButton ? classes["btn-container"] : classes["icon-container"]}
      onClick={props.clicked && props.clicked}>
      <img src={props.source} style={props.style && props.style} />
    </div>
  );
}
export default Icon;