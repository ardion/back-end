const { Router } = require('express')
const { getDataProjectByID, createProject, getDataProject, updateProject, patchProject, deleteProject } = require('../controler/Project')
const router = Router()
const {authorization}=require('../middleware/auth')

router.post('/', authorization,createProject)

router.get('/:id', getDataProjectByID)
router.get('/', getDataProject)
router.put('/:id', authorization,updateProject)
router.patch('/:id', authorization,patchProject)
router.delete('/:id', authorization,deleteProject)

module.exports = router
