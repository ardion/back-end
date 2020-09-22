const { Router } = require('express')
const { getDataGetProjectByID, createGetProject, getDataGetProject, updateGetProject, patchGetProject, deleteGetProject } = require('../controler/GetProject')
const router = Router()

router.post('/', createGetProject)

router.get('/:id', getDataGetProjectByID)
router.get('/', getDataGetProject)
router.put('/:id', updateGetProject)
router.patch('/:id', patchGetProject)
router.delete('/:id', deleteGetProject)

module.exports = router
