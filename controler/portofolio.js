const {
  getDataPortofolioByIDModel,
  createPortofolioModel,
  getDataPortofolioModel,
  updatePortofolioModel, patchPortofolioModel, deletePortofolioModel
} = require('../models/portofolio')

module.exports = {


  createPortofolio: async (req, res) => {
    try {
      const {
        id_worker,
        name_aplication, link_repository,
        type_repository,
        type_portofolio
      } = req.body

      const setData = {
        id_worker,
        name_aplication,
        link_repository,
        type_repository,
        type_portofolio,
        image: req.file === undefined ? '' : req.file.filename
      }


      console.log(req.body)
      console.log(setData)
      const resultCreate = await createPortofolioModel(setData)
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
  getDataPortofolioByID: async (req, res) => {
    const { id } = req.params
    try {
      const result = await getDataPortofolioByIDModel(id)
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

  getDataPortofolio: async (req, res) => {
    let { page, limit, search } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'name_aplication'
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
      const result = await getDataPortofolioModel(searchKey, searchValue, limit, offset)
      if (result.length) {
        res.send({
          success: true,
          message: 'List portofolio',
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

  updatePortofolio: async (req, res) => {
    const idProject = req.params.id
    const { id_worker, name_aplication, link_repository, type_repository, type_portofolio } = req.body
    const image = req.file === undefined ? '' : req.file.filename

    console.log(req.file)
    console.log(req.body)
    try {
      if (id_worker.trim() &&
      name_aplication.trim() &&
      link_repository.trim() &&
      type_repository.trim() &&
      type_portofolio.trim() &&
      image.trim()) {
        const result = await updatePortofolioModel([id_worker, name_aplication, link_repository, type_repository, type_portofolio, image], idProject)
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
  patchPortofolio: async (req, res) => {
    const idProject = req.params.id
    const { id_worker = '', name_aplication = '', link_repository = '', type_repository = '', type_portofolio = ''} = req.body
    const image = req.file === undefined ? '' : req.file.filename
    console.log(req.body)
    console.log(req.file)
    try {
      if (id_worker.trim() || name_aplication.trim() || link_repository.trim() || type_repository.trim() || type_portofolio.trim() || image.trim()) {
        const result = await getDataPortofolioByIDModel(idProject)

        const data = Object.entries(req.body).map(item => {
          console.log(item)
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          const result2 = await patchPortofolioModel(data, idProject, image)

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

  deletePortofolio: async (req, res) => {
    const id_project = req.params.id
    try {
      const result = await getDataPortofolioByIDModel(id_project)
      if (result.length) {
        const result2 = await deletePortofolioModel(id_project)
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
