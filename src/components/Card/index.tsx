import React from 'react';
import s from './card.module.scss'
import {IProduct} from "../../types/Product.types";

interface ICardProps {
  product: IProduct
}

const Card: React.FC<ICardProps> = ({product}) => {
  return (
    <a href={''} className={s.card}>
      <h3>{product.name}</h3>

    </a>
  );
};

export default Card;