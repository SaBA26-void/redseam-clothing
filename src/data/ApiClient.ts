// todo use env
export const API_BASE_URL = 'https://api.redseam.redberryinternship.ge/api'

export const post = async <R>(url: string, data: unknown, headers: Record<string, string> | undefined = undefined): Promise<R> => {
  return fetch(API_BASE_URL + url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  }).then(data => data.json())
}

export const postFormData = async <R>(url: string, data: FormData, headers: Record<string, string> | undefined = undefined): Promise<R> => {
  return fetch(API_BASE_URL + url, {
    method: 'POST',
    body: data,
    headers: {
      'Accept': 'application/json',
      ...headers,
    },
  }).then(data => data.json())
}

export const patchFormData = async <R>(url: string, data: unknown, headers: Record<string, string> | undefined = undefined): Promise<R> => {
  return fetch(API_BASE_URL + url, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  }).then(data => data.json())
}

export const fetchDelete = async (url: string, headers: Record<string, string> | undefined = undefined) => {
  return fetch(API_BASE_URL + url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      ...headers,
    },
  })
}

export const get = async <R>(url: string, headers: Record<string, string> | undefined = undefined): Promise<R> => {
  return fetch(API_BASE_URL + url, {
    headers: {
      'Accept': 'application/json',
      ...headers,
    },
  }).then(data => data.json())
}
