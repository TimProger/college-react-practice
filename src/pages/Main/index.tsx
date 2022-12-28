import React, {useEffect, useState} from 'react';
import Card from "../../components/Card";
import s from './main.module.scss'
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {$api} from "../../http/api";
import {setProducts} from "../../store/Slices/Product.slice";
import {useAppDispatch} from "../../hooks/useTypedDispatch";

interface IFilter {
  title: string;
  filters: {
    title: string;
    id: number
  }[]
}

const Main: React.FC = () => {

  const {products} = useTypedSelector(state => state.product)
  const dispatch = useAppDispatch()

  const [filters, setFilters] = useState<IFilter[] | null>(null)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [pages, setPages] = useState<number>(0)
  const [page, setPage] = useState<number>(0)

  useEffect(()=>{
    $api.get('products/total')
      .then((res)=>{
        setPages(res.data.pageNum)
        setTotalCount(res.data.total)
        setPage(1)
      })
  },[])

  useEffect(()=>{
    $api.get(`products?page=1`)
      .then((res)=>{
        dispatch(setProducts(res.data))
      })
  },[])

  const changePage = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    $api.get(`api/v1/products?page=${page}`)
      .then((res)=>{
        setPages(Math.ceil(res.data.count_pages))
        dispatch(setProducts(res.data.data))
      })
  }

  const togglePageHandler = (el: number) =>{
    setPage(el)
    changePage(el)
  }

  const displayPages = () => {
    const arr = []
    if(pages > 5){
      arr[0] = 1
      for(let i=0;i<4;i++){
        if(page === 1){
          arr.push(page+i+1)
        }else{
          if(page+i >= pages){
            arr[3] = pages-1
            arr[2] = pages-2
            arr[1] = pages-3
            break
          }else{
            arr.push(page+i)
          }
        }
      }
      arr[4] = pages

    }else{
      for(let i=0;i<pages;i++){
        arr.push(i+1)
      }
    }
    return arr.map((el)=>{
      return <div
        onClick={()=>togglePageHandler(el)}
        className={s.main__products__pages__page + ' ' + (page === el ? s.main__products__pages__active : '')}>
        {el}
      </div>
    })
  }

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
        <div>
          <h1>Всего товаров {totalCount}</h1>
        </div>
        <div className={s.main__products__cards}>
          {products && products.length > 0 && products.map((el, index)=> <Card key={index} product={el} />)}
        </div>
        <div className={s.main__products__pages}>
          {pages !== 0 && page !== 1 ? <svg onClick={()=>togglePageHandler(page - 1)} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.6666 15.5C28.9428 15.5 29.1666 15.7239 29.1666 16C29.1666 16.2761 28.9428 16.5 28.6666 16.5V15.5ZM0.979761 16.3536C0.7845 16.1583 0.7845 15.8417 0.979761 15.6464L4.16174 12.4645C4.357 12.2692 4.67359 12.2692 4.86885 12.4645C5.06411 12.6597 5.06411 12.9763 4.86885 13.1716L2.04042 16L4.86885 18.8284C5.06411 19.0237 5.06411 19.3403 4.86885 19.5355C4.67359 19.7308 4.357 19.7308 4.16174 19.5355L0.979761 16.3536ZM28.6666 16.5H1.33331V15.5H28.6666V16.5Z" fill="black"/>
          </svg> : <p className={s.main__products__pages__pl}></p>}
          {displayPages()}
          {pages !== 0 && page !== pages ? <svg onClick={() => togglePageHandler(page + 1)} width="32" height="32" viewBox="0 0 32 32"
                                                fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.33334 15.5C1.0572 15.5 0.833344 15.7239 0.833344 16C0.833344 16.2761 1.0572 16.5 1.33334 16.5V15.5ZM29.0202 16.3536C29.2155 16.1583 29.2155 15.8417 29.0202 15.6464L25.8383 12.4645C25.643 12.2692 25.3264 12.2692 25.1311 12.4645C24.9359 12.6597 24.9359 12.9763 25.1311 13.1716L27.9596 16L25.1311 18.8284C24.9359 19.0237 24.9359 19.3403 25.1311 19.5355C25.3264 19.7308 25.643 19.7308 25.8383 19.5355L29.0202 16.3536ZM1.33334 16.5H28.6667V15.5H1.33334V16.5Z"
              fill="black"/>
          </svg> : <p className={s.main__products__pages__pl}></p>}
        </div>
      </div>
    </div>
  );
};

export default Main;