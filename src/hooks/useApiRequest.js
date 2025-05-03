import axios from 'axios'
import config from '../utils/config'

export function handleApiRequest({
  apiEndPoint,
  method = 'POST',
  data = {},
  headers = {},
  credentials = false,
  onSuccess = () => {},
  onError = () => {},
  setIsFetching = () => {},
}) {
  const allowedMethods = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
    'OPTIONS',
    'HEAD',
  ]

  if (!allowedMethods.includes(method.toUpperCase())) {
    console.error(`Invalid HTTP method: ${method}`)
    onError('Internal error')
    return
  }

  const url = config.backendUrl + apiEndPoint

  setIsFetching(true)
  axios({
    url,
    method,
    data,
    headers,
    params: method === 'GET' ? data : undefined,
    withCredentials: credentials,
  })
    .then((response) => {
      onSuccess(response.data)
    })
    .catch((error) => {
      let errorMsg = 'Error'
      if (error.response?.data?.message) {
        errorMsg = error.response.data.message
      } else if (error.message) {
        errorMsg = error.message
      }
      onError?.(errorMsg)
    })
    .finally(() => {
      setIsFetching(false)
    })
}
