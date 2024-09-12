import { Spin } from 'antd'

import classes from '../../SCSS/spin-loading.module.scss'

export default function SpinLoading() {
  return (
    <div className={classes.spin}>
      <Spin tip="Loading" size="large">
        {null}
      </Spin>
    </div>
  )
}
