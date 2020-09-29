const { Router } = require('express')
const { getDataWorkerByID, createWorker, updateWorker, patchWorker, deleteWorker, getDataWorkerSkill, getDataWorker } = require('../controler/Worker')
const router = Router()
const {authorization}=require('../middleware/auth')
const uploadImage=require('../middleware/multer')

router.post('/', authorization,uploadImage,createWorker)

router.get('/:id',  authorization,getDataWorkerByID)
router.get('/t/t', authorization,getDataWorker)
router.put('/:id', authorization, updateWorker)
router.patch('/:id',  authorization,patchWorker)
router.delete('/:id',  authorization,deleteWorker)
router.get('/',  authorization,getDataWorkerSkill)

module.exports = router
