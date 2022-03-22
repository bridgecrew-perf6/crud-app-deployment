const { User } = require('../models/index')

const createHandler = async (req, h) => {
  try {
    const { name, email, password } = req.payload
    const user = await User.create({
      name: name,
      email: email,
      password: password,
    })
    return {
      data: user,
      message: 'New User has been created.',
    }
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400)
  }
}

const fetchHandler = async (request, h) => {
  try {
    const user = await User.findAll({})
    return { data: user }
  } catch (error) {
    return h.response({ error: error.message }).code(400)
  }
}

const updateHandler = async (request, h) => {
  try {
    const user_id = request.params.id
    const { name, email, password } = request.payload
    const user = await User.update(
      {
        name: name,
        email: email,
        password: password,
      },
      {
        where: {
          id: user_id,
        },
      }
    )
    return {
      message: 'User has been updated.',
    }
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400)
  }
}

const deleteHandler = async (request, h) => {
  try {
    const user_id = request.params.id
    await User.destroy({
      where: {
        id: user_id,
      },
    })
    return { message: 'User has been deleted.' }
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400)
  }
}

module.exports = { createHandler, fetchHandler, updateHandler, deleteHandler }
