const { Router } = require('express')
const { getDataProjectByID, createProject, getDataProject, updateProject, patchProject, deleteProject } = require('../controler/project')
const router = Router()
const {authorization}=require('../middleware/auth')
const uploadImage=require('../middleware/multer')

router.post('/', authorization,uploadImage,createProject)

router.get('/:id', getDataProjectByID)
router.get('/', getDataProject)
router.put('/:id', authorization,updateProject)
router.patch('/:id', authorization,patchProject)
router.delete('/:id', authorization,deleteProject)

module.exports = router
