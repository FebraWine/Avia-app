import { Alert } from 'antd'

import classes from '../../SCSS/alert.module.scss'

export default function NoFilter() {
  return (
    <div className={classes.info}>
      <Alert message="Выберите билеты по фильтрам" type="info" />
    </div>
  )
}
