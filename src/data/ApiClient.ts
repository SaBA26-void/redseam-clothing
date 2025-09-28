// todo use env
export const API_BASE_URL = 'https://api.redseam.redberryinternship.ge/api'

export const post = async <R>(url: string, data: unknown): Promise<R> => {
  return fetch(API_BASE_URL + url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(data => data.json())
}

export const postFormData = async <R>(url: string, data: FormData): Promise<R> => {
  return fetch(API_BASE_URL + url, {
    method: 'POST',
    body: data,
    headers: {
      'Accept': 'application/json',
    },
  }).then(data => data.json())
}

export const get = async <R>(url: string): Promise<R> => {
  return fetch(API_BASE_URL + url, {
    headers: {
      'Accept': 'application/json',
    },
  }).then(data => data.json())
}
