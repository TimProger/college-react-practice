import React from 'react';
import s from './card.module.scss'
import {IProduct} from "../../types/Product.types";

interface ICardProps {
  product: IProduct
}

const Card: React.FC<ICardProps> = ({product}) => {
  return (
    <a href={''} className={s.card}>
      <img src={`https://basket-10.wb.ru/vol${product.id.toString().substring(0, 4)}/part${product.id.toString().substring(0, 6)}/${product.id}/images/c516x688/1.jpg`} alt="Изображение не найдено"/>
      {product.sale > 0 ? <div className={s.card__sale}>-{product.sale}</div> : <p className={s.card__sale__pl}></p>}
      <h3>{product.name}</h3>

      <div className={s.card__price}>
        {product.salePriceU !== product.priceU
          ? <>
            <p>{product.salePriceU.toString().substring(0, product.salePriceU.toString().length - 2)} &#8381;</p>
            <span>{product.priceU.toString().substring(0, product.salePriceU.toString().length - 2)} &#8381;</span>
          </>
          : <p>{product.priceU.toString().substring(0, product.salePriceU.toString().length - 2)} &#8381;</p>
        }
      </div>
      <div className={s.card__brand}>Брэнд: {product.brand}</div>
    </a>
  );
};

export default Card;