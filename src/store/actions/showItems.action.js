export const actionTypes = {
  CHANGE: 'CHANGE_SHOW_ITEMS'
}

export const changeShowItems = (data) => ({
  type: actionTypes.CHANGE,
  data,
})