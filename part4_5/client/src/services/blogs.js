import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (modifyBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.put(
    `${baseUrl}/${modifyBlog.id}`,
    modifyBlog,
    config
  )
  return response.data
}

const deleteById = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
  return {}
}

export default { getAll, create, setToken, update, deleteById }
