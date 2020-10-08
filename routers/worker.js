const { Router } = require('express')
const { getDataWorkerByID, createWorker, updateWorker, patchWorker, deleteWorker, getDataWorkerSkill, getDataWorker, getDataWorkerHome } = require('../controler/worker')
const router = Router()
const {authorization}=require('../middleware/auth')
const uploadImage=require('../middleware/multer')

router.post('/', authorization,uploadImage,createWorker)

router.get('/:id',  getDataWorkerByID)
router.get('/t/t', getDataWorker)
router.put('/:id', authorization,uploadImage, updateWorker)
router.patch('/:id',  authorization,uploadImage,patchWorker)
router.delete('/:id',  authorization,deleteWorker)
router.get('/',getDataWorkerSkill)
router.get('/home/home',getDataWorkerHome)

module.exports = router
