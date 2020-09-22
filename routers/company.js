const { Router } = require('express')
const { getDataCompanyByID, createCompany, getDataCompany, updateCompany, patchCompany, deleteCompany } = require('../controler/Company')
const router = Router()

router.post('/', createCompany)

router.get('/:id', getDataCompanyByID)
router.get('/', getDataCompany)
router.put('/:id', updateCompany)
router.patch('/:id', patchCompany)
router.delete('/:id', deleteCompany)

module.exports = router
