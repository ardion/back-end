const {
  getDataWorkerByIDModel,
  createWorkerModel,
  getDataWorkerModel,
  updateWorkerModel, patchWorkerModel, deleteWorkerModel, getDataWorkerskillModel
} = require('../models/Worker')

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

  getDataWorkerByID: (req, res) => {
    const { id } = req.params
    getDataWorkerByIDModel(id, result => {
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
  getDataWorker: (req, res) => {
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

    getDataWorkerModel(searchKey, searchValue, limit, offset, result => {
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

  updateWorker: (req, res) => {
    const idProject = req.params.id
    const { id_user, jobdesk, domicile, workplace, description_personal, job_status, instagram, github, gitlab } = req.body
    if (id_user.trim(), jobdesk.trim(), domicile.trim(), workplace.trim(), description_personal.trim(), job_status.trim(), instagram.trim(), github.trim(), gitlab.trim()) {
      updateWorkerModel([id_user, jobdesk, domicile, workplace, description_personal, job_status, instagram, github, gitlab], idProject, result => {
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

  patchWorker: (req, res) => {
    const idProject = req.params.id
    const { id_user = '', jobdesk = '', domicile = '', workplace = '', description_personal = '', job_status = '', instagram = '', github = '', gitlab = '' } = req.body
    // console.log(req.body)
    if (id_user.trim() || jobdesk.trim() || domicile.trim() || workplace.trim() || description_personal.trim() || job_status.trim() || instagram.trim() || github.trim() || gitlab.trim()) {
      getDataWorkerByIDModel(idProject, result => {
        const data = Object.entries(req.body).map(item => {
          console.log(item)
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          patchWorkerModel(data, idProject, result => {
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

  deleteWorker: (req, res) => {
    const id_project = req.params.id
    getDataWorkerByIDModel(id_project, result => {
      if (result.length) {
        deleteWorkerModel(id_project, result => {
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
  },

  getDataWorkerSkill: (req, res) => {
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

    getDataWorkerskillModel(searchKey, searchValue, limit, offset, sort, order, result => {
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
  }

}
