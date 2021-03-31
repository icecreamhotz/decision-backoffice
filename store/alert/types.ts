export default interface alertInterface {
  show: boolean,
  type: 'error' | 'success',
  error?: any,
  message?: string,
}
