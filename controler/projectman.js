const {
  getDataProjectmanByIDModel,
  createProjectmanModel,
  getDataProjectmanModel,
  updateProjectmanModel, patchProjectmanModel, deleteProjectmanModel
} = require('../models/Projectman')

module.exports = {
  createProjectman: (req, res) => {
    const { id_project, id_worker } = req.body
    console.log(req.body)
    if (id_project, id_worker) {
      createProjectmanModel([id_project, id_worker], result => {
        console.log(result)
        res.status(201).send({
          success: true,
          message: 'Projectman Has Been Created',
          data: req.body
        })
      })
    } else {
      res.status(500).send({
        success: false,
        message: 'All field must be filled'
      })
    }
  },

  getDataProjectmanByID: (req, res) => {
    const { id } = req.params
    getDataProjectmanByIDModel(id, result => {
      if (result.length) {
        res.send({
          success: true,
          message: `Data Projectman id${id}`,
          data: result[0]
        })
      } else {
        res.send({
          success: false,
          message: `Data Projectman id${id} not found`
        })
      }
    })
  },
  getDataProjectman: (req, res) => {
    let { page, limit, search } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'id_worker'
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

    getDataProjectmanModel(searchKey, searchValue, limit, offset, result => {
      if (result.length) {
        res.send({
          success: true,
          message: 'List Projectman',
          data: result
        })
      } else {
        res.send({
          success: true,
          message: 'There is no item list'
        })
      }
    })
  },

  updateProjectman: (req, res) => {
    const idProjectman = req.params.id
    const { id_project, id_worker } = req.body
    if (id_project.trim(), id_worker.trim()) {
      updateProjectmanModel([id_project, id_worker], idProjectman, result => {
        console.log(result)
        if (result.affectedRows) {
          res.send({
            success: true,
            messages: `Projectman with id ${idProjectman} Has Been Updated`
          })
        } else {
          res.send({
            success: false,
            messages: 'Field must be filled'
          })
        }
      })
    } else {
      res.send({
        success: false,
        messages: 'error!'
      })
    }
  },

  patchProjectman: (req, res) => {
    const idProjectman = req.params.id
    const { id_project = '', id_worker = '' } = req.body
    // console.log(req.body)
    if (id_project.trim() || id_worker.trim()) {
      getDataProjectmanByIDModel(idProjectman, result => {
        const data = Object.entries(req.body).map(item => {
          console.log(item)
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          patchProjectmanModel(data, idProjectman, result => {
            if (result.affectedRows) {
              res.send({
                success: true,
                messages: `Projectman With id ${idProjectman} has been Updated`
              })
            } else {
              res.send({
                success: false,
                messages: 'Failed to Update'
              })
            }
          })
        } else {
          res.send({
            success: false,
            messages: 'Data Projectman Not Found'
          })
        }
      })
    } else {
      res.send({
        success: false,
        message: 'ERROR!'
      })
    }
  },

  deleteProjectman: (req, res) => {
    const id_Projectman = req.params.id
    getDataProjectmanByIDModel(id_Projectman, result => {
      if (result.length) {
        deleteProjectmanModel(id_Projectman, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `item Projectman id ${id_Projectman} has been deleted`

            })
          } else {
            res.send({
              success: false,
              message: 'Failed to deleted!'

            })
          }
        })
      } else {
        res.send({
          success: false,
          message: 'Data Projectman not found!'

        })
      }
    })
  }

}
