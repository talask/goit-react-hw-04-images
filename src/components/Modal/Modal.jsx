import React, { useEffect } from 'react';
import { Overlay, ModalDiv } from "./Modal.styled";

//export const Modal = ({url, tag, onClose}) => {
export const Modal = ({onClose, tag, url}) => {
    useEffect ( () => {
        document.addEventListener('keydown', handleKeyDown);
      });
    
      useEffect ( () => 
        {
        document.removeEventListener('keydown', handleKeyDown);
      });
    
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
      // Здесь вызываем функцию для закрытия модального окна
        onClose();
    }
  }
      
   
        return (
            <Overlay onClick={onClose}>
           
                <ModalDiv>
                    <img src={url} alt={tag} />
                </ModalDiv>
             </Overlay>
        )
  
}

