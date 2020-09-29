const { Router } = require('express')
const { getDataPortofolioByID, createPortofolio, getDataPortofolio, updatePortofolio, patchPortofolio, deletePortofolio } = require('../controler/Portofolio')
const router = Router()
const {authorization}=require('../middleware/auth')
const uploadImage=require('../middleware/multer')

router.post('/', authorization,uploadImage,createPortofolio)

router.get('/:id', getDataPortofolioByID)
router.get('/', getDataPortofolio)
router.put('/:id', updatePortofolio)
router.patch('/:id', patchPortofolio)
router.delete('/:id', deletePortofolio)

module.exports = router
