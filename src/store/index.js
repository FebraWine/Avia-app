import { thunk } from 'redux-thunk'
import { configureStore, Tuple } from '@reduxjs/toolkit'
// import logger from 'redux-logger'

import aviaReducer from './aviaSlice'

export default configureStore({
  reducer: {
    filter: aviaReducer,
  },
  middleware: () => new Tuple(thunk),
})
