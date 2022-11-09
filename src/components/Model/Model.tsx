import React, { useEffect } from 'react';
import Portal from '../Portal/Portal';

import './Model.css';

interface ModelProps {
  closeHandler: () => void;
  children?: React.ReactNode;
}

const Model: React.FC<ModelProps> = ({ closeHandler, children }) => {
  useEffect(() => {
    // onKeyDown handler function
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        closeHandler();
      }
    };
    document.body.addEventListener('keydown', keyDownHandler);
    return () => {
      document.body.removeEventListener('keydown', keyDownHandler);
    };
  }, [closeHandler]);

  return (
    <div className="model-container">
      <div className="model-backdrop" onClick={closeHandler} />
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={closeHandler}>
            &times;
          </span>
          <h2>Modal Header</h2>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <h3>Modal Footer</h3>
        </div>
      </div>
    </div>
  );
};

interface ModelContainerProps {
  isOpen: boolean;
  closeHandler: () => void;
  children?: React.ReactNode;
}

const ModelContainer: React.FC<ModelContainerProps> = ({
  isOpen,
  closeHandler,
  children,
}) => {
  if (!isOpen) {
    return null;
  }
  return (
    <Portal>
      <Model closeHandler={closeHandler}>{children}</Model>
    </Portal>
  );
};

export default ModelContainer;
