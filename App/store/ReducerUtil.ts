export function createReducer<T> (initialState: T, fnMap: any) {
  return (state = initialState, {type, payload}: any) => {
    const handler = fnMap[type]
    return handler ? handler(state, payload) : state
  }
}
