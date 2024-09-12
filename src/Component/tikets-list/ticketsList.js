import { useSelector } from 'react-redux'

import NoFilter from '../Alert/noFilter'
import Ticket from '../tiket/ticket'
import { selectorTikets } from '../../store/aviaSlice'

export default function TiketsList() {
  const newTikets = useSelector(selectorTikets)

  const tiketShow = useSelector((state) => state.filter.tiketsShow)
  const newArrTiket = newTikets.slice(0, tiketShow)
  if (newArrTiket.length < 1) {
    return <NoFilter />
  }
  const element = newArrTiket.map((item) => {
    const id = Number(item.price) + Number(item.segments[0].duration)
    return (
      <li key={id}>
        <Ticket data={item} />
      </li>
    )
  })
  return <ul>{element}</ul>
}
