const { Router } = require('express')
const { getDataProjectmanByID, createProjectman, getDataProjectman, updateProjectman, patchProjectman, deleteProjectman } = require('../controler/Projectman')
const router = Router()

router.post('/', createProjectman)

router.get('/:id', getDataProjectmanByID)
router.get('/', getDataProjectman)
router.put('/:id', updateProjectman)
router.patch('/:id', patchProjectman)
router.delete('/:id', deleteProjectman)

module.exports = router
