import { createAsyncThunk } from '@reduxjs/toolkit'

const baseUrl = 'https://aviasales-test-api.kata.academy'

let stop = false

export const getIdSessia = createAsyncThunk('main/getIdSessia', async () => {
  const id = await fetch(`${baseUrl}/search`)
  if (!id.ok && id.status < 500) {
    throw new Error('Не удалось получить id')
  }
  const resulte = await id.json()
  return resulte
})

export const getTiketsAll = createAsyncThunk('main/getTiketsAll', async (id) => {
  const tikets = await fetch(`${baseUrl}/tickets?searchId=${id}`)
  if (!tikets.ok && tikets.status < 500) {
    stop = false
    throw new Error('Не удалось получить билеты')
  }
  const res = await tikets.json()
  return res
})

export const getTikestAvia = createAsyncThunk('main/getTikestAvia', async (_, { dispatch }) => {
  const idSessia = await dispatch(getIdSessia())
  if (idSessia?.error?.message) {
    throw new Error('Все пошло не по плану')
  }

  while (!stop) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const tickets = await dispatch(getTiketsAll(idSessia.payload.searchId))
      stop = tickets.payload.stop
      if (tickets?.error?.message === 'Не удалось получить билеты') {
        stop = false
      }
    } catch (err) {
      if (err.message === 'Не удалось получить id' || err.message === 'Не удалось получить билеты') {
        throw new Error('Все пошло не по плану')
      }
    }
  }
})
