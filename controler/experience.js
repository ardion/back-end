const {
  getDataExperienceByIDModel,
  createExperienceModel,
  getDataExperienceModel,
  updateExperienceModel, patchExperienceModel, deleteExperienceModel
} = require('../models/experience')

module.exports = {
  createExperience: (req, res) => {
    const {
      id_worker,
      position, company_name,
      date,
      description_work
    } = req.body
    console.log(req.body)
    if (id_worker, position, company_name, date, description_work) {
      createExperienceModel([id_worker, position, company_name, date, description_work], result => {
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

  getDataExperienceByID: (req, res) => {
    const { id } = req.params
    getDataExperienceByIDModel(id, result => {
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
  getDataExperience: (req, res) => {
    let { page, limit, search } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'position'
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

    getDataExperienceModel(searchKey, searchValue, limit, offset, result => {
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

  updateExperience: (req, res) => {
    const idProject = req.params.id
    const { id_worker, position, company_name, date, description_work } = req.body
    if (id_worker.trim(), position.trim(), company_name.trim(), date.trim(), description_work.trim()) {
      updateExperienceModel([id_worker, position, company_name, date, description_work], idProject, result => {
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

  patchExperience: (req, res) => {
    const idProject = req.params.id
    const { id_worker = '', position = '', company_name = '', date = '', description_work = '' } = req.body
    // console.log(req.body)
    if (id_worker.trim() || position.trim() || company_name.trim() || date.trim() || description_work.trim()) {
      getDataExperienceByIDModel(idProject, result => {
        const data = Object.entries(req.body).map(item => {
          console.log(item)
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          patchExperienceModel(data, idProject, result => {
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

  deleteExperience: (req, res) => {
    const id_project = req.params.id
    getDataExperienceByIDModel(id_project, result => {
      if (result.length) {
        deleteExperienceModel(id_project, result => {
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
