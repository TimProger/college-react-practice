import React, {useEffect, useState} from 'react';
import Card from "../../components/Card";
import s from './main.module.scss'
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {$api} from "../../http/api";
import {setProducts} from "../../store/Slices/Product.slice";

interface IFilter {
  title: string;
  filters: {
    title: string;
    id: number
  }[]
}

const Main: React.FC = () => {

  const {products} = useTypedSelector(state => state.product)

  const [filters, setFilters] = useState<IFilter[] | null>(null)

  useEffect(()=>{
    const data = new FormData()
    $api.post('filters', data)
      .then((res)=>{
        setFilters(res.data)
      })
    $api.get('products')
      .then((res)=>{
        setProducts(res.data)
      })
  },[])

  const chooseFilter = (id: number) => {
    const data = new FormData()
  }

  return (
    <div className={s.main}>
      <div className={s.main__filters}>
        <div className={s.main__filters__filter}>
          {filters ? filters.map((el, index)=>{
            return <div className={s.main__filters__filter__options}>
              <h3>{el.title}</h3>
              <div className={s.main__filters__filter__options__option}>{el.filters.map((el, index)=>{
                return <div onClick={()=>chooseFilter(el.id)}>{el.title}</div>
              })}</div>
            </div>
          }) : 'Фильтры не найдены'}
        </div>
      </div>
      <div className={s.main__products}>
        {products && products.length > 0 && products.map((el, index)=> <Card key={index} product={el} />)}
      </div>
    </div>
  );
};

export default Main;