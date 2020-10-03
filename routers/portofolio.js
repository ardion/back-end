const { Router } = require('express')
const { getDataPortofolioByID, createPortofolio, getDataPortofolio, updatePortofolio, patchPortofolio, deletePortofolio } = require('../controler/portofolio')
const router = Router()
const { authorization } = require('../middleware/auth')
const uploadImage = require('../middleware/multer')

router.post('/', authorization, uploadImage, createPortofolio)

router.get('/:id', getDataPortofolioByID)
router.get('/', getDataPortofolio)
router.put('/:id',authorization, uploadImage, updatePortofolio)
router.patch('/:id', authorization, uploadImage, patchPortofolio)
router.delete('/:id', authorization, uploadImage, deletePortofolio)

module.exports = router
