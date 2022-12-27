import React from 'react';
import s from './container.module.scss'

interface IContainerProps {
  children: React.ReactNode
}

const Container: React.FC<IContainerProps> = ({children}) => {
  return (
    <div className={s.container}>
      {children}
    </div>
  );
};

export default Container;