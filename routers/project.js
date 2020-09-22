const { Router } = require('express')
const { getDataProjectByID, createProject, getDataProject, updateProject, patchProject, deleteProject } = require('../controler/Project')
const router = Router()

router.post('/', createProject)

router.get('/:id', getDataProjectByID)
router.get('/', getDataProject)
router.put('/:id', updateProject)
router.patch('/:id', patchProject)
router.delete('/:id', deleteProject)

module.exports = router
