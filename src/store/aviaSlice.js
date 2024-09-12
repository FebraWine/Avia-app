
import { createSlice } from '@reduxjs/toolkit'

import { getTiketsAll, getTikestAvia } from '../Api/servise'

const initialState = {
  tikets: [],
  tiketsTab: {
    lowCost: true,
    faster: false,
    optimal: false,
  },
  tiketsShow: 5,
  stopLoading: false,
  filter: {
    all: false,
    withoutTransfers: false,
    transferOne: false,
    transferTwo: false,
    transferThree: false,
  },
  status: null,
  error: null,
}

const transferFilter = createSlice({
  name: 'main',
  initialState,
  reducers: {
    allCheckFilter(state) {
      return {
        ...state,
        filter: {
          all: !state.filter.all,
          withoutTransfers: !state.filter.all,
          transferOne: !state.filter.all,
          transferTwo: !state.filter.all,
          transferThree: !state.filter.all,
        },
      }
    },
    checkFilter(state, action) {
      const { name, value } = action.payload

      const arr = []

      if (!value) {
        return { ...state, filter: { ...state.filter, [name]: value, all: value } }
      }

      if (value) {
        for (const key in state.filter) {
          const { filter } = state
          if (filter[key] === true) {
            arr.push(1)
          }
        }
        if (arr.length === 3) {
          return {
            ...state,
            filter: {
              all: !state.filter.all,
              withoutTransfers: !state.filter.all,
              transferOne: !state.filter.all,
              transferTwo: !state.filter.all,
              transferThree: !state.filter.all,
            },
          }
        }
      }

      return { ...state, filter: { ...state.filter, [name]: value } }
    },
    addTiketsShow(state) {
      return { ...state, tiketsShow: state.tiketsShow + 5 }
    },
    filterTab(state, action) {
      switch (action.payload) {
        case 'САМЫЙ ДЕШЕВЫЙ':
          return {
            ...state,
            tiketsTab: {
              lowCost: true,
              faster: false,
              optimal: false,
            },
          }
        case 'САМЫЙ БЫСТРЫЙ':
          return {
            ...state,
            tiketsTab: {
              lowCost: false,
              faster: true,
              optimal: false,
            },
          }
        case 'ОПТИМАЛЬНЫЙ':
          return {
            ...state,
            tiketsTab: {
              lowCost: false,
              faster: false,
              optimal: true,
            },
          }
        default:
          return {
            ...state,
          }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTiketsAll.pending, () => {})
      .addCase(getTiketsAll.fulfilled, (state, payload) => {
        return { ...state, stopLoading: payload.payload.stop, tikets: [...state.tikets, ...payload.payload.tickets] }
      })
      .addCase(getTiketsAll.rejected, (state, payload) => {
        if (state.tikets.length === 0) {
          return { ...state, error: true }
        }
        if (payload.error.message === 'Все пошло не по плану') {
          return { ...state, error: true }
        }
        return { ...state }
      })
      .addCase(getTikestAvia.rejected, (state) => {
        return { ...state, error: true }
      })
  },
})

export const selectorTikets = (state) => {
  const { tikets, tiketsTab } = state.filter
  const { withoutTransfers, transferOne, transferTwo, transferThree } = state.filter.filter
  const filterTransfer = []
  let resulte = []

  if (withoutTransfers) {
    filterTransfer.push(0)
  }
  if (transferOne) {
    filterTransfer.push(1)
  }
  if (transferTwo) {
    filterTransfer.push(2)
  }
  if (transferThree) {
    filterTransfer.push(3)
  }
  resulte = tikets.filter((item) => item.segments.some((el) => filterTransfer.includes(el.stops.length)))

  if (tiketsTab.lowCost) {
    resulte = resulte.sort((a, b) => a.price - b.price)
  } else if (tiketsTab.faster) {
    resulte = resulte.sort(
      (a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
    )
  } else if (tiketsTab.optimal) {
    // Честно говоря, хз что значит оптимальный, я тупо время и стоимость сравнивал
    // Так как не было тз для оптимальной кнопки написал то что пришло в голову -_-
    resulte = resulte.sort(
      (a, b) =>
        a.segments[0].duration +
        a.segments[1].duration +
        a.price -
        (b.segments[0].duration + b.segments[1].duration + b.price)
    )
  }

  return resulte
}

export const { allCheckFilter, checkFilter, addTiketsShow, filterTab } = transferFilter.actions
export default transferFilter.reducer
