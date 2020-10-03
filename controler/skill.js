const {
  getDataSkillByIDModel,
  createSkillModel,
  getDataSkillModel,
  updateSkillModel, patchSkillModel, deleteSkillModel
} = require('../models/Skill')

module.exports = {
  createSkill: async (req, res) => {
    try {
      const {
        id_worker, skill
      } = req.body

      const setData = {
        id_worker,
        skill
      }

      console.log(req.body)
      // if (name && description && price && duration) {
      const resultCreate = await createSkillModel(setData)
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

  getDataSkillByID: async (req, res) => {
    const { id } = req.params
    try {
      const result = await getDataSkillByIDModel(id)
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
  getDataSkill: async (req, res) => {
    let { page, limit, search } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'skill'
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
      const result = await getDataSkillModel(searchKey, searchValue, limit, offset)
      if (result.length) {
        res.send({
          success: true,
          message: 'List skill',
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

  updateSkill: async (req, res) => {
    const idProject = req.params.id
    const { id_worker, skill } = req.body

    try {
      if (id_worker.trim(), skill.trim()) {
        const result = await updateSkillModel([id_worker, skill], idProject)
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

  patchSkill: (req, res) => {
    const idSkill = req.params.id
    const { id_worker = '', skill = '' } = req.body
    // console.log(req.body)
    if (id_worker.trim() || skill.trim()) {
      getDataSkillByIDModel(idSkill, result => {
        const data = Object.entries(req.body).map(item => {
          console.log(item)
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          patchSkillModel(data, idSkill, result => {
            if (result.affectedRows) {
              res.send({
                success: true,
                messages: `Skill With id ${idSkill} has been Updated`
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
            messages: 'Data Skill Not Found'
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
patchSkill: async (req, res) => {
    const idProject = req.params.id
    const { id_worker = '', skill = '' } = req.body
    try {
      if (id_worker.trim() || skill.trim()) {
        const result = await getDataSkillByIDModel(idProject)
        const data = Object.entries(req.body).map(item => {
          console.log(item)
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          const result2 = await patchSkillModel(data, idProject)
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

  deleteSkill: async (req, res) => {
    const id_project = req.params.id
    try {
      const result = await getDataSkillByIDModel(id_project)
      if (result.length) {
        const result2 = await deleteSkillModel(id_project)
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
