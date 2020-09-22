const { Router } = require('express')
const { getDataWorkerByID, createWorker, updateWorker, patchWorker, deleteWorker, getDataWorkerSkill, getDataWorker } = require('../controler/Worker')
const router = Router()

router.post('/', createWorker)

router.get('/:id', getDataWorkerByID)
router.get('/t/t',getDataWorker)
router.put('/:id', updateWorker)
router.patch('/:id', patchWorker)
router.delete('/:id', deleteWorker)
router.get('/', getDataWorkerSkill)

module.exports = router
