import { Button, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { filterTab } from '../../store/aviaSlice'
import classes from '../../SCSS/navigationFilter.module.scss'

export default function NavigationFilter() {
  const dispatch = useDispatch()

  const tab = useSelector((state) => state.filter.tiketsTab)

  return (
    <Space.Compact className={classes.navigation} block>
      <Button
        onClick={(e) => dispatch(filterTab(e.target.textContent))}
        className={classes.btn}
        type={tab.lowCost && 'primary'}
      >
        САМЫЙ ДЕШЕВЫЙ
      </Button>
      <Button
        onClick={(e) => dispatch(filterTab(e.target.textContent))}
        className={classes.btn}
        type={tab.faster && 'primary'}
      >
        САМЫЙ БЫСТРЫЙ
      </Button>
      <Button
        onClick={(e) => dispatch(filterTab(e.target.textContent))}
        className={classes.btn}
        type={tab.optimal && 'primary'}
      >
        ОПТИМАЛЬНЫЙ
      </Button>
    </Space.Compact>
  )
}
