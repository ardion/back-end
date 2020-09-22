const {
  getDataSkillByIDModel,
  createSkillModel,
  getDataSkillModel,
  updateSkillModel, patchSkillModel, deleteSkillModel
} = require('../models/Skill')

module.exports = {
  createSkill: (req, res) => {
    const { id_worker, skill } = req.body
    console.log(req.body)
    if (id_worker, skill) {
      createSkillModel([id_worker, skill], result => {
        console.log(result)
        res.status(201).send({
          success: true,
          message: 'Skill Has Been Created',
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

  getDataSkillByID: (req, res) => {
    const { id } = req.params
    getDataSkillByIDModel(id, result => {
      if (result.length) {
        res.send({
          success: true,
          message: `Data Skill id${id}`,
          data: result[0]
        })
      } else {
        res.send({
          success: false,
          message: `Data Skill id${id} not found`
        })
      }
    })
  },
  getDataSkill: (req, res) => {
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

    getDataSkillModel(searchKey, searchValue, limit, offset, result => {
      if (result.length) {
        res.send({
          success: true,
          message: 'List Skill',
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

  updateSkill: (req, res) => {
    const idSkill = req.params.id
    const { id_worker, skill } = req.body
    if (id_worker.trim(), skill.trim()) {
      updateSkillModel([id_worker, skill], idSkill, result => {
        console.log(result)
        if (result.affectedRows) {
          res.send({
            success: true,
            messages: `Skill with id ${idSkill} Has Been Updated`
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

  deleteSkill: (req, res) => {
    const id_Skill = req.params.id
    getDataSkillByIDModel(id_Skill, result => {
      if (result.length) {
        deleteSkillModel(id_Skill, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `item Skill id ${id_Skill} has been deleted`

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
          message: 'Data Skill not found!'

        })
      }
    })
  }

}
