const {
  getDataCompanyByIDModel,
  createCompanyModel,
  getDataCompanyModel,
  updateCompanyModel, patchCompanyModel, deleteCompanyModel
} = require('../models/company')

module.exports = {
  createCompany: async (req, res) => {
    try {
      const {
        id_user,
        company_name,
        scope, city,
        company_description,
        instagram, position, linkedID
      } = req.body

      const setData = {
        id_user,
        company_name,
        scope,
        city,
        company_description,
        instagram,
        position,
        linkedID,
        image: req.file === undefined ? '' : req.file.filename
      }

      console.log(req.body)
      // if (name && description && price && duration) {
      const resultCreate = await createCompanyModel(setData)
      console.log(resultCreate)

      res.status(201).send({
        success: true,
        message: 'Project Has Been Created',
        data: resultCreate
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: error
      })
    }
  },

  getDataCompanyByID: async (req, res) => {
    const { id } = req.params
    try {
      const result = await getDataCompanyByIDModel(id)
      console.log(result)
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

  getDataCompany: async (req, res) => {
    let { page, limit, search } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'company_name'
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
      const result = await getDataCompanyModel(searchKey, searchValue, limit, offset)
      if (result.length) {
        res.send({
          success: true,
          message: 'List company',
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

  updateCompany: async (req, res) => {
    const idProject = req.params.id
    const { id_user, company_name, scope, city, company_description, instagram, position, linkedID } = req.body
    const image = req.file === undefined ? '' : req.file.filename

    console.log(req.body)
    try {
      if (id_user.trim() &&
      company_name.trim() &&
      scope.trim() &&
      city.trim() &&
      company_description.trim() &&
      instagram.trim() &&
      position.trim() &&
      linkedID.trim() &&
      image.trim()) {
        const result = await updateCompanyModel([id_user, company_name, scope, city, company_description, instagram, position, linkedID, image], idProject)
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

  patchCompany: async (req, res) => {
    const idProject = req.params.id
    const { id_user = '', company_name = '', scope = '', city = '', company_description = '', instagram = '', position = '', linkedID = '' } = req.body
    const image = req.file === undefined ? '' : req.file.filename
    console.log(req.body)
    console.log(req.file)
    try {
      if (id_user.trim() || company_name.trim() || scope.trim() || city.trim() || company_description.trim() || instagram.trim() || position.trim() || linkedID.trim()) {
        const result = await getDataCompanyByIDModel(idProject)

        const data = Object.entries(req.body).map(item => {
          console.log(item)
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          const result2 = await patchCompanyModel(data, idProject, image)

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

  deleteCompany: async (req, res) => {
    const id_project = req.params.id
    try {
      const result = await getDataCompanyByIDModel(id_project)
      if (result.length) {
        const result2 = await deleteCompanyModel(id_project)
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
