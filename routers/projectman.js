const { Router } = require('express')
const { getDataProjectmanByID, createProjectman, getDataProjectman, updateProjectman, patchProjectman, deleteProjectman } = require('../controler/projectman')
const router = Router()
const {authorization}=require('../middleware/auth')

router.post('/',authorization, createProjectman)

router.get('/:id', getDataProjectmanByID)
router.get('/', getDataProjectman)
router.put('/:id',authorization, updateProjectman)
router.patch('/:id', authorization,patchProjectman)
router.delete('/:id',authorization, deleteProjectman)

module.exports = router
