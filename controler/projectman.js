const {
  getDataProjectmanByIDModel,
  createProjectmanModel,
  getDataProjectmanModel,
  updateProjectmanModel, patchProjectmanModel, deleteProjectmanModel,getDataProjectmanByIDModelPatch
} = require('../models/projectman')

module.exports = {
  createProjectman: async (req, res) => {
    try {
      const {
        id_project, id_worker, message, price, project_job
      } = req.body

      const setData = {
        id_project,
        id_worker, 
        message, 
        price, 
        project_job,
        status:"waiting"
      }

      console.log(req.body)
      // if (name && description && price && duration) {
      const resultCreate = await createProjectmanModel(setData)
      console.log(resultCreate)

      res.status(201).send({
        success: true,
        message: 'Project Has Been Created',
        data: setData
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Bad Request'
      })
    }
  },

  getDataProjectmanByID: async (req, res) => {
    const { id } = req.params
    try {
      const result = await getDataProjectmanByIDModel(id)
      res.send({
        success: true,
        message: `Data project id${id}`,
        data: result
      })
    } catch (error) {
      res.send({
        success: false,
        message: `Data project id${id} not found`
      })
    }
  },

  getDataProjectman: async (req, res) => {
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

    try {
      const result = await getDataProjectmanModel(searchKey, searchValue, limit, offset)
      if (result.length) {
        res.send({
          success: true,
          message: 'List projectman',
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

  updateProjectman: async (req, res) => {
    const idProject = req.params.id
    const { id_project, id_worker } = req.body

    try {
      if (id_project.trim(), id_worker.trim()) {
        const result = await updateProjectmanModel([id_project, id_worker], idProject)
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

  patchProjectman: async (req, res) => {
    const idProject = req.params.id
    const { id_project = '', id_worker = '' , status = ''} = req.body
    try {
      if (id_project.trim() || id_worker.trim() || status.trim()) {
        const result = await getDataProjectmanByIDModelPatch(idProject)
        const data = Object.entries(req.body).map(item => {
          console.log(item)
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          const result2 = await patchProjectmanModel(data, idProject)
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

  deleteProjectman: async (req, res) => {
    const id_project = req.params.id
    try {
      const result = await getDataProjectmanByIDModel(id_project)
      if (result.length) {
        const result2 = await deleteProjectmanModel(id_project)
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
