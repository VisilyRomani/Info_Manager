import React from 'react';
import reactDom from 'react-dom';
import { Button } from './Button';
import './Modal.css';

// RRRREFACTORRR
export const Modal = ({visible, toggle}) => visible ? reactDom.createPortal(
    <div className='modal'>
        <div className='modal-pop' role='dialog' aria-modal='true'>
            <Button handleClick={toggle} label='Close'/>
        </div>
        <div className='modal-overlay'></div>
    </div>, document.body
) : null;

export default Modal;
