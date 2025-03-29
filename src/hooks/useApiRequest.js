import axios from 'axios'
import config from '../utils/config'

export function handleApiRequest({
  apiEndPoint,
  method = 'POST',
  data = {},
  headers = {},
  credentials = false,
  setSuccessMessage,
  setErrorMessage,
  setTriggerFetch,
  setIsFetching,
  setData,
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
    console.err(`Invalid HTTP method: ${method}`)
    setErrorMessage('Internal error')
    return
  }

  const url = config.backendUrl + apiEndPoint

  setIsFetching(true)
  axios({ url, method, data, headers, withCredentials: credentials })
    .then((response) => {
      if (setSuccessMessage) {
        setSuccessMessage(response.data.message)
      }
      if (setTriggerFetch) {
        setTriggerFetch((prev) => prev + 1)
      }
      if (setData) {
        setData(response.data)
      }
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
            console.error('Unknown error during file upload')
            setErrorMessage('Internal server error')
            break
        }
      } else {
        setErrorMessage('Internal error: Connection to backend failed')
        console.error('Error during fetching docs: ' + error)
      }
    })
    .finally(() => {
      if (setIsFetching) {
        setIsFetching(false)
      }
    })
}
