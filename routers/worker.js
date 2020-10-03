const { Router } = require('express')
const { getDataWorkerByID, createWorker, updateWorker, patchWorker, deleteWorker, getDataWorkerSkill, getDataWorker } = require('../controler/Worker')
const router = Router()
const {authorization}=require('../middleware/auth')
const uploadImage=require('../middleware/multer')

router.post('/', authorization,uploadImage,createWorker)

router.get('/:id',  getDataWorkerByID)
router.get('/t/t', getDataWorker)
router.put('/:id', authorization,uploadImage, updateWorker)
router.patch('/:id',  authorization,uploadImage,patchWorker)
router.delete('/:id',  authorization,deleteWorker)
router.get('/',  authorization,getDataWorkerSkill)

module.exports = router
