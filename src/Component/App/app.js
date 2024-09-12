import { Flex } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { getTikestAvia } from '../../Api/servise'
import Error from '../Alert/error'
import Loading from '../Alert/loading'
import SpinLoading from '../spin-loading/spinLoading'
import Logo from '../Logo/logo'
import AddTikets from '../add-tikets/addTikets'
import NavigationFilter from '../navigation-filter/navigationFilter'
import FilterSide from '../filter-side/filterSide'
import TiketsList from '../tikets-list/ticketsList'
import classes from '../../SCSS/app.module.scss'

// Я взял за основу рандомный телефон шириной в 380 пикселей
// какой-то там самсунг
// Все размерности окна изменяются до 700 пикселей, дальше идет пк экран
// я подсмотрел у вк)

export default function App() {
  const dispatch = useDispatch()
  const stopLoading = useSelector((state) => state.filter.stopLoading)
  const error = useSelector((state) => state.filter.error)

  useEffect(() => {
    dispatch(getTikestAvia())
  }, [dispatch])

  return (
    <div className={classes.main}>
      <Logo />
      <Flex className={classes.navigation} gap={30}>
        <div>
          <FilterSide />
        </div>
        <div className="main-navigation">
          <NavigationFilter />
        </div>
      </Flex>
      <section className={classes.content}>
        {!stopLoading && <SpinLoading />}
        {!stopLoading && <Loading />}
        {error ? <Error /> : <TiketsList />}
        <AddTikets />
      </section>
    </div>
  )
}
