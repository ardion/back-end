const {
  getDataRegisterByIDModel,
  getDataRegisterModel,
  updateRegisterModel, patchRegisterModel, deleteRegisterModel, postUserModel, checkUserModel
} = require('../models/register')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv')

module.exports = {

  registerUser: async (request, response) => {
    const { name, email, password, number_phone } = request.body
    const salt = bcrypt.genSaltSync(10)
    const encryptPassword = bcrypt.hashSync(password, salt)
    // Pengkondisian untuk mengecheck Email
    const setData = {
      name,
      email,
      password: encryptPassword,
      number_phone,
      user_role: 1,
      user_status: 0,
      created_at: new Date()
    }

    try {
      const result = await postUserModel(setData)
      console.log(result)
      response.send({
        success: true,
        message: 'Succes Register User!',
        data: result
      })
    } catch (error) {
      console.log(error)
      response.status(400).send({
        success: false,
        message: 'Bad Request'
      })
    }
  },

  loginUser: async (request, response) => {
    try {
      const { email, password } = request.body
      const checkDataUser = await checkUserModel(email)
      if (checkDataUser.length >= 1) {
        const checkPassword = bcrypt.compareSync(password, checkDataUser[0].password)
        if (checkPassword) {
          const { id_user, name, email, user_role, user_status } = checkDataUser[0]
          let payload = {
            id_user,
            name,
            email,
            user_role,
            user_status
          }
          const token = jwt.sign(payload, process.env.jwtkey, { expiresIn: '1h' })
          payload = { ...payload, token }
          response.send({
            success: true,
            message: 'Succes Login!',
            data: payload
          })
        } else {
          response.status(400).send({
            success: false,
            message: 'Wrong Password!'
          })
        }
      } else {
        response.status(400).send({
          success: false,
          message: 'Email/Account not registered!'
        })
      }
    } catch (error) {
      console.log(error)
      response.status(400).send({
        success: false,
        message: 'Bad Request'
      })
    }
  },

  getDataRegisterByID: async (req, res) => {
    const { id } = req.params
    try {
      const result = await getDataRegisterByIDModel(id)
      res.send({
        success: true,
        message: `Data project id${id}`,
        data: result[0]
      })
    } catch (error) {
      res.send({
        success: false,
        message: `Data project id${id} not found`
      })
    }
  },
  getDataRegister: async (req, res) => {
    let { page, limit, search } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'name'
      searchValue = search || ''
    }

    if (!limit) {
      limit = 10
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const offset = (page - 1) * limit

    try {
      const result = await getDataRegisterModel(searchKey, searchValue, limit, offset)
      if (result.length) {
        res.send({
          success: true,
          message: 'List user',
          data: result
        })
      } else {
        res.send({
          success: false,
          message: 'There is no item list'
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Bad Request'
      })
    }
  },

  updateRegister: async (req, res) => {
    const idProject = req.params.id
    const { name, email, password, number_phone } = req.body

    try {
      if (name.trim() && email.trim() && password.trim() && number_phone.trim()) {
        const result = await updateRegisterModel([name, email, password, number_phone], idProject)
        console.log(result)
        if (result.affectedRows) {
          res.send({
            success: true,
            messages: `Project with id ${idProject} Has Been Updated`
          })
        } else {
          res.send({
            success: false,
            messages: 'Field must be filled'
          })
        }
      } else {
        res.send({
          success: false,
          messages: 'Error'
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Bad Request'
      })
    }
  },

  patchRegister: async (req, res) => {
    const idProject = req.params.id
    const { name = '', email = '', password = '', number_phone = '' } = req.body
    try {
      if (name.trim() || email.trim() || password.trim() || number_phone.trim()) {
        const result = await getDataRegisterByIDModel(idProject)
        const data = Object.entries(req.body).map(item => {
          console.log(item)
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          const result2 = await patchRegisterModel(data, idProject)
          if (result2.affectedRows) {
            res.send({
              success: true,
              messages: `Project With id ${idProject} has been Updated`
            })
          } else {
            res.send({
              success: false,
              messages: 'Failed to Update'
            })
          }
        } else {
          res.send({
            success: false,
            messages: 'Data Project Not Found'
          })
        }
      } else {
        res.send({
          success: false,
          messages: 'Error'
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Bad Request'
      })
    }
  },

  deleteRegister: async (req, res) => {
    const id_project = req.params.id
    try {
      const result = await getDataRegisterByIDModel(id_project)
      if (result.length) {
        const result2 = await deleteRegisterModel(id_project)
        if (result2.affectedRows) {
          res.send({
            success: true,
            message: `item project id ${id_project} has been deleted`

          })
        } else {
          res.send({
            success: false,
            message: 'Failed to deleted!'

          })
        }
      } else {
        res.send({
          success: false,
          message: 'Data project not found!'

        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Bad Request'
      })
    }
  }
}
