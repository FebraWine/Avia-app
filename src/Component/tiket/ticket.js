import { Flex } from 'antd'

import TheWayThere from '../theWay/theWay'
import classes from '../../SCSS/ticket.module.scss'

export default function Ticket({ data }) {
  const { price, carrier, segments } = data

  const logoUrl = `//pics.avs.io/99/36/${carrier}.png`

  const element = segments.map((item) => {
    return <TheWayThere key={item.duration + item.date} segments={item} />
  })

  return (
    <div className={classes.card}>
      <Flex justify="space-between">
        <div className={classes.cash}>{price} Р</div>
        <img className={classes.logo} alt="kartinka" src={logoUrl} />
      </Flex>
      {element}
    </div>
  )
}
