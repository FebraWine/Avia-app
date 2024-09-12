import { Alert } from 'antd'

import classes from '../../SCSS/alert.module.scss'

export default function Loading() {
  return (
    <div className={classes.info}>
      <Alert message="Оставшиеся билеты загружаются" type="info" />
    </div>
  )
}
