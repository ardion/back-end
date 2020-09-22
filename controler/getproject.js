const {
  getDataGetProjectByIDModel,
  createGetProjectModel,
  getDataGetProjectModel,
  updateGetProjectModel, patchGetProjectModel, deleteGetProjectModel
} = require('../models/GetProject')

module.exports = {
  createGetProject: (req, res) => {
    const { id_project, id_worker } = req.body
    console.log(req.body)
    if (id_project, id_worker) {
      createGetProjectModel([id_project, id_worker], result => {
        console.log(result)
        res.status(201).send({
          success: true,
          message: 'GetProject Has Been Created',
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

  getDataGetProjectByID: (req, res) => {
    const { id } = req.params
    getDataGetProjectByIDModel(id, result => {
      if (result.length) {
        res.send({
          success: true,
          message: `Data GetProject id${id}`,
          data: result[0]
        })
      } else {
        res.send({
          success: false,
          message: `Data GetProject id${id} not found`
        })
      }
    })
  },
  getDataGetProject: (req, res) => {
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

    getDataGetProjectModel(searchKey, searchValue, limit, offset, result => {
      if (result.length) {
        res.send({
          success: true,
          message: 'List GetProject',
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

  updateGetProject: (req, res) => {
    const idGetProject = req.params.id
    const { id_project, id_worker } = req.body
    if (id_project.trim(), id_worker.trim()) {
      updateGetProjectModel([id_project, id_worker], idGetProject, result => {
        console.log(result)
        if (result.affectedRows) {
          res.send({
            success: true,
            messages: `GetProject with id ${idGetProject} Has Been Updated`
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

  patchGetProject: (req, res) => {
    const idGetProject = req.params.id
    const { id_project = '', id_worker = '' } = req.body
    // console.log(req.body)
    if (id_project.trim() || id_worker.trim()) {
      getDataGetProjectByIDModel(idGetProject, result => {
        const data = Object.entries(req.body).map(item => {
          console.log(item)
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          patchGetProjectModel(data, idGetProject, result => {
            if (result.affectedRows) {
              res.send({
                success: true,
                messages: `GetProject With id ${idGetProject} has been Updated`
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
            messages: 'Data GetProject Not Found'
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

  deleteGetProject: (req, res) => {
    const id_GetProject = req.params.id
    getDataGetProjectByIDModel(id_GetProject, result => {
      if (result.length) {
        deleteGetProjectModel(id_GetProject, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `item GetProject id ${id_GetProject} has been deleted`

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
          message: 'Data GetProject not found!'

        })
      }
    })
  }

}
