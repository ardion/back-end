const { Router } = require('express')
const { getDataPortofolioByID, createPortofolio, getDataPortofolio, updatePortofolio, patchPortofolio, deletePortofolio } = require('../controler/Portofolio')
const router = Router()

router.post('/', createPortofolio)

router.get('/:id', getDataPortofolioByID)
router.get('/', getDataPortofolio)
router.put('/:id', updatePortofolio)
router.patch('/:id', patchPortofolio)
router.delete('/:id', deletePortofolio)

module.exports = router
