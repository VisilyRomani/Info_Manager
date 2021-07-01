import './Button.css';
export const Button = (props) => {
   return( <button className='transButton' onClick={props.handleClick} id={props.id}>{props.label}</button>)
};