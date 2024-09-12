import { Flex } from 'antd'

import classes from '../../SCSS/ticket.module.scss'

export default function TheWayBack({ segments }) {
  const { origin, destination, duration, date, stops = [] } = segments
  const numberOfTransfers = stops.length
  const time = new Date(date)
  const timeWayHour = time.getHours()
  const timeWayMinutes = time.getMinutes()
  const hour = Math.trunc(duration / 60)
  const minutes = duration % 60
  const a = timeWayMinutes + minutes
  const wayHour = timeWayHour + hour + Math.trunc(a / 60)
  const wayMinutes = (timeWayMinutes + minutes) % 60
  let text = 'ПРЯМОЙ РЕЙС'

  if (numberOfTransfers === 1) {
    text = '1 ПЕРЕСАДКА'
  } else if (numberOfTransfers === 2) {
    text = '2 ПЕРЕСАДКИ'
  } else if (numberOfTransfers === 3) {
    text = '3 ПЕРЕСАДКИ'
  }

  let elements
  if (stops.length > 0) {
    elements = stops.map((item) => {
      return `${item} `
    })
  }

  return (
    <Flex className={classes.wrapper}>
      <div>
        <p className={classes.title}>{`${origin} - ${destination}`}</p>
        <p
          className={classes.info}
        >{`${timeWayHour}:${timeWayMinutes}-${wayHour > 24 ? wayHour - 24 : wayHour}:${wayMinutes}`}</p>
      </div>
      <div>
        <p className={classes.title}> В ПУТИ</p>
        <p className={classes.info}>{`${hour} ч ${minutes} м`}</p>
      </div>
      <div>
        <p className={classes.title}>{text}</p>
        <p className={classes.info}>{elements}</p>
      </div>
    </Flex>
  )
}
