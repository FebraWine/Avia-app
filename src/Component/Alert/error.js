import { Alert } from 'antd'

import classes from '../../SCSS/alert.module.scss'

export default function Error() {
  return (
    <div className={classes.info}>
      <Alert message="Что-то пошло не так" type="error" />
    </div>
  )
}
