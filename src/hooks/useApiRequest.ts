import axios from 'axios'
import config from '../utils/config'

type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'OPTIONS'
  | 'HEAD'

type HandleApiRequestProps<TypeData = unknown, TypeResponse = unknown> = {
  apiEndPoint: string,
  method: HttpMethod,
  data?: TypeData,
  headers?: object,
  credentials: boolean,
  onSuccess?: (response: TypeResponse) => void,
  onError?: (errorMessage: string) => void,
  setIsFetching?: (isFetching: boolean) => unknown
}

export function handleApiRequest<TypeData, TypeResponse>({
  apiEndPoint,
  method,
  data = {} as TypeData,
  headers = {},
  credentials,
  onSuccess = () => {},
  onError = () => {},
  setIsFetching = () => {},
}: HandleApiRequestProps<TypeData, TypeResponse>) {
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
