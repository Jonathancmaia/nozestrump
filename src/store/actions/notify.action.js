export const actionTypes = {
  CHANGE: 'CHANGE_NOTIFY'
}

export const changeNotify = (data) => ({
  type: actionTypes.CHANGE,
  data,
})