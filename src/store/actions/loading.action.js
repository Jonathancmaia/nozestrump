export const actionTypes = {
  CHANGE: 'CHANGE_LOADING'
}

export const changeLoading = (data) => ({
  type: actionTypes.CHANGE,
  data,
})