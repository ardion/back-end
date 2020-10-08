const {
  getDataExperienceByIDModel,
  createExperienceModel,
  getDataExperienceModel,
  updateExperienceModel, patchExperienceModel, deleteExperienceModel
} = require('../models/experience')

module.exports = {
  
createExperience: async (req, res) => {
    try {
      const {
        id_worker, position, company_name, date, description_work
      } = req.body

      const setData = {
        id_worker,
        position,
        company_name,
        date,
        description_work
      }

      console.log(req.body)
      // if (name && description && price && duration) {
      const resultCreate = await  createExperienceModel(setData)
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

  getDataExperienceByID: async (req, res) => {
    const { id } = req.params
    try {
      const result = await  getDataExperienceByIDModel(id)
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
   getDataExperience: async (req, res) => {
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

    try {
      const result = await getDataExperienceModel(searchKey, searchValue, limit, offset)
      if (result.length) {
        res.send({
          success: true,
          message: 'List Experience',
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

updateExperience: async (req, res) => {
    const idProject = req.params.id
    const { id_worker, position, company_name, date, description_work } = req.body

    try {
      if (id_worker.trim(), position.trim(), company_name.trim(), date.trim(), description_work.trim()) {
        const result = await updateExperienceModel([id_worker, position, company_name, date, description_work], idProject)
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

 patchExperience: async (req, res) => {
    const idProject = req.params.id
    const { id_worker = '', position = '', company_name = '', date = '', description_work = ''} = req.body
    try {
      if (id_worker.trim() || position.trim() || company_name.trim() || date.trim() || description_work.trim()) {
        const result = await getDataExperienceByIDModel(idProject)
        const data = Object.entries(req.body).map(item => {
          console.log(item)
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          const result2 = await patchExperienceModel(data, idProject)
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

 deleteExperience: async (req, res) => {
    const id_project = req.params.id
    try {
      const result = await getDataExperienceByIDModel(id_project)
      if (result.length) {
        const result2 = await deleteExperienceModel(id_project)
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
