const {
  getDataProjectByIDModel,
  createProjectModel,
  getDataProjectModel,
  updateProjectModel, patchProjectModel, deleteProjectModel
} = require('../models/Project')

module.exports = {
  createProject: (req, res) => {
    const {
      id_company,
      name_project, description_project
    } = req.body
    console.log(req.body)
    if (id_company, name_project, description_project) {
      createProjectModel([id_company, name_project, description_project], result => {
        console.log(result)
        res.status(201).send({
          success: true,
          message: 'Project Has Been Created',
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

  getDataProjectByID: (req, res) => {
    const { id } = req.params
    getDataProjectByIDModel(id, result => {
      if (result.length) {
        res.send({
          success: true,
          message: `Data project id${id}`,
          data: result[0]
        })
      } else {
        res.send({
          success: false,
          message: `Data project id${id} not found`
        })
      }
    })
  },
  getDataProject: (req, res) => {
    let { page, limit, search } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'name_project'
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

    getDataProjectModel(searchKey, searchValue, limit, offset, result => {
      if (result.length) {
        res.send({
          success: true,
          message: 'List project',
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

  updateProject: (req, res) => {
    const idProject = req.params.id
    const { id_company, name_project, description_project } = req.body
    if (id_company.trim(), name_project.trim(), description_project.trim()) {
      updateProjectModel([id_company, name_project, description_project], idProject, result => {
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
      })
    } else {
      res.send({
        success: false,
        messages: 'error!'
      })
    }
  },

  patchProject: (req, res) => {
    const idProject = req.params.id
    const { id_company = '', name_project = '', description_project = '' } = req.body
    // console.log(req.body)
    if (id_company.trim() || name_project.trim() || description_project.trim()) {
      getDataProjectByIDModel(idProject, result => {
        const data = Object.entries(req.body).map(item => {
          console.log(item)
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          patchProjectModel(data, idProject, result => {
            if (result.affectedRows) {
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
          })
        } else {
          res.send({
            success: false,
            messages: 'Data Project Not Found'
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

  deleteProject: (req, res) => {
    const id_project = req.params.id
    getDataProjectByIDModel(id_project, result => {
      if (result.length) {
        deleteProjectModel(id_project, result => {
          if (result.affectedRows) {
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
        })
      } else {
        res.send({
          success: false,
          message: 'Data project not found!'

        })
      }
    })
  }

}
