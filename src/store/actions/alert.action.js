export const actionTypes = {
  CHANGE: 'CHANGE_ALERT'
}

export const changeAlert = (data) => ({
  type: actionTypes.CHANGE,
  data,
})