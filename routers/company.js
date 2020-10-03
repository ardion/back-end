const { Router } = require('express')
const { getDataCompanyByID, createCompany, getDataCompany, updateCompany, patchCompany, deleteCompany } = require('../controler/Company')
const router = Router()
const {authorization}=require('../middleware/auth')
const uploadImage=require('../middleware/multer')

router.post('/', authorization,uploadImage,createCompany)

router.get('/:id', getDataCompanyByID)
router.get('/', getDataCompany)
router.put('/:id', authorization,uploadImage, updateCompany)
router.patch('/:id', authorization,uploadImage, patchCompany)
router.delete('/:id', authorization,uploadImage, deleteCompany)

module.exports = router
