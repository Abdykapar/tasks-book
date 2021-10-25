export const taskCreate = (data) => {
    const url = `${process.env.REACT_APP_BASE_URL}/create?developer=Abdykapar`
    return post(url, data)
}

export const taskList = ({sort_field='', sort_direction='', page=1} = {}) => {
    const url = `${process.env.REACT_APP_BASE_URL}/?developer=Abdykapar&sort_field=${sort_field}&sort_direction=${sort_direction}&page=${page}`
    const options = {
        method: 'GET'
    }
    return fetch(url, options).then(handleResponse)
}

export const login = (data) => {
    const url = `${process.env.REACT_APP_BASE_URL}/login?developer=Abdykapar`
    return post(url, data)
}

export const edit = (id, data) => {
    const url = `${process.env.REACT_APP_BASE_URL}/edit/${id}?developer=Abdykapar`
    return post(url, data)
}

function post (url, data) {
    const form = new FormData();
    for (const p in data) {
        form.append(p, data[p])
    }
    const options = {
        method: 'POST',
        body: form
    }
    return fetch(url, options).then(handleResponse)
}

function handleResponse (response) {
	return response.json().then(data => {
        if (data.status !== 'ok') {
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }
        return data.message
    })
}