import { useSelector, useDispatch } from 'react-redux'
import { Checkbox, Flex } from 'antd'

import { checkFilter, allCheckFilter } from '../../store/aviaSlice'
import classes from '../../SCSS/filterSide.module.scss'

export default function FilterSide() {
  const dispatch = useDispatch()
  const filterState = useSelector((state) => state.filter.filter)

  const handleFilterChange = (name, value) => {
    if (name === 'All') {
      dispatch(allCheckFilter())
    } else {
      dispatch(checkFilter({ name, value }))
    }
  }

  return (
    <div className={classes.side}>
      <h3 className={classes.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</h3>
      <Flex vertical>
        <Checkbox
          checked={filterState.all}
          onChange={(e) => handleFilterChange('All', e.target.checked)}
          className={classes.el}
        >
          <span className={classes.text}>Все</span>
        </Checkbox>
        <Checkbox
          checked={filterState.withoutTransfers}
          onChange={(e) => handleFilterChange('withoutTransfers', e.target.checked)}
          className={classes.el}
        >
          <span className={classes.text}>Без пересадок</span>
        </Checkbox>
        <Checkbox
          checked={filterState.transferOne}
          onChange={(e) => handleFilterChange('transferOne', e.target.checked)}
          className={classes.el}
        >
          <span className={classes.text}>1 пересадка</span>
        </Checkbox>
        <Checkbox
          checked={filterState.transferTwo}
          onChange={(e) => handleFilterChange('transferTwo', e.target.checked)}
          className={classes.el}
        >
          <span className={classes.text}>2 пересадки</span>
        </Checkbox>
        <Checkbox
          checked={filterState.transferThree}
          onChange={(e) => handleFilterChange('transferThree', e.target.checked)}
          className={classes.el}
        >
          <span className={classes.text}>3 пересадки</span>
        </Checkbox>
      </Flex>
    </div>
  )
}
