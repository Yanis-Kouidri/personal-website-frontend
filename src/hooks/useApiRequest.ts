import axios, { AxiosError } from 'axios'
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
  baseUrl?: string | undefined
  apiEndPoint: string
  method: HttpMethod
  data?: TypeData
  headers?: object
  credentials: boolean
  onSuccess?: (response: TypeResponse) => void
  onError?: (errorMessage: string) => void
  setIsFetching?: (isFetching: boolean) => unknown
}

export function handleApiRequest<TypeData, TypeResponse>({
  baseUrl = config.backendUrl,
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

  const url = baseUrl + apiEndPoint

  setIsFetching(true)
  axios<TypeResponse>({
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
      const axiosError = error as AxiosError<{ message?: string }>
      let errorMsg: string = 'Error'
      if (axiosError.response?.data?.message) {
        errorMsg = axiosError.response.data.message
      } else if (axiosError.message) {
        errorMsg = axiosError.message
      }

      onError(errorMsg)
    })
    .finally(() => {
      setIsFetching(false)
    })
}
