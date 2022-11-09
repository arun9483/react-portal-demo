import React from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children?: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  const container = document.getElementById('portal-wrapper');
  if (!container) {
    return null;
  }
  return createPortal(children, container);
};

export default Portal;
