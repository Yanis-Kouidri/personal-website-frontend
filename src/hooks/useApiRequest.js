import axios from 'axios'
import config from '../utils/config'

export function handleApiRequest({
  apiEndPoint,
  method = 'POST',
  data = {},
  headers = {},
  credentials = false,
  setSuccessMessage = () => {},
  setErrorMessage = () => {},
  onSuccess = () => {},
  setIsFetching = () => {},
}) {
  setErrorMessage('')
  setSuccessMessage('')
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
    setErrorMessage('Internal error')
    return
  }

  const url = config.backendUrl + apiEndPoint

  setIsFetching(true)
  axios({ url, method, data, headers, withCredentials: credentials })
    .then((response) => {
      setSuccessMessage(response.data.message)
      onSuccess(response.data)
    })
    .catch((error) => {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setErrorMessage(error.response.data.message)
            break
          case 401:
          case 500:
            console.error(
              error.response.status + ' error : ' + error.response.data.message,
            )
            setErrorMessage(error.response.data.message)
            break
          default:
            console.error('Unknown error during api request')
            setErrorMessage('Internal server error')
            break
        }
      } else {
        setErrorMessage('Internal error: Connection to backend failed')
        console.error('Error during fetching docs: ' + error)
      }
    })
    .finally(() => {
      setIsFetching(false)
    })
}
