import { useDispatch } from 'react-redux'

import { addTiketsShow } from '../../store/aviaSlice'
import classes from '../../SCSS/addTikets.module.scss'

export default function AddTikets() {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(addTiketsShow())
  }

  return (
    <button type="button" className={classes.bt} onClick={() => handleClick()}>
      ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ
    </button>
  )
}
