const {
  getDataWorkerByIDModel,
  createWorkerModel,
  getDataWorkerModel,
  updateWorkerModel, patchWorkerModel, deleteWorkerModel, getDataWorkerskillModel
} = require('../models/worker')

module.exports = {
  createWorker: async (req, res) => {
    try {
      const {
        id_user,
        jobdesk,
        domicile, workplace,
        description_personal,
        job_status, instagram, github, gitlab
      } = req.body

      const setData = {
        id_user,
        jobdesk,
        domicile,
        workplace,
        description_personal,
        job_status,
        instagram,
        github,
        gitlab,
        image: req.file === undefined ? '' : req.file.filename
      }

      console.log(req.body)
      // if (name && description && price && duration) {
      const resultCreate = await createWorkerModel(setData)
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

  getDataWorkerByID: async (req, res) => {
    const { id } = req.params
    try {
      const result = await getDataWorkerByIDModel(id)
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

  getDataWorker: async (req, res) => {
    let { page, limit, search } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'domicile'
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
      const result = await getDataWorkerModel(searchKey, searchValue, limit, offset)
      if (result.length) {
        res.send({
          success: true,
          message: 'List worker',
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

  updateWorker: async (req, res) => {
    const idProject = req.params.id
    const { id_user, jobdesk, domicile, workplace, description_personal, job_status, instagram, github, gitlab } = req.body
    const image = req.file === undefined ? '' : req.file.filename

    console.log(req.body)
    try {
      if (id_user.trim() &&
      jobdesk.trim() &&
      domicile.trim() &&
      workplace.trim() &&
      description_personal.trim() &&
      job_status.trim() &&
      instagram.trim() &&
      github.trim() &&
      gitlab.trim() &&
      image.trim()) {
        const result = await updateWorkerModel([id_user, jobdesk, domicile, workplace, description_personal, job_status, instagram, github, gitlab, image], idProject)
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
          messages: 'error!'
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

  patchWorker: async (req, res) => {
    const idProject = req.params.id
    const { id_user = '', jobdesk = '', domicile = '', workplace = '', description_personal = '', job_status = '', instagram = '', github = '', gitlab = '' } = req.body
    const image = req.file === undefined ? '' : req.file.filename
    console.log(req.body)
    console.log(req.file)
    try {
      if (id_user.trim() || jobdesk.trim() || domicile.trim() || workplace.trim() || description_personal.trim() || job_status.trim() || instagram.trim() || github.trim() || gitlab.trim() || image.trim()) {
        const result = await getDataWorkerByIDModel(idProject)

        const data = Object.entries(req.body).map(item => {
          console.log(item)
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          const result2 = await patchWorkerModel(data, idProject, image)

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
          message: 'ERROR!'
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

  deleteWorker: async (req, res) => {
    const id_project = req.params.id
    try {
      const result = await getDataWorkerByIDModel(id_project)
      if (result.length) {
        const result2 = await deleteWorkerModel(id_project)
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
  },

  getDataWorkerSkill: async (req, res) => {
    let { page, limit, search, sort, order } = req.query
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
      const result = await getDataWorkerskillModel(searchKey, searchValue, limit, offset, sort, order)
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
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Bad Request'
      })
    }
  }
}
