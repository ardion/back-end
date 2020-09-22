const { Router } = require('express')
const { getDataRegisterByID, createRegister, getDataRegister, updateRegister, patchRegister, deleteRegister } = require('../controler/register')
const router = Router()

router.post('/', createRegister)

router.get('/:id', getDataRegisterByID)
router.get('/', getDataRegister)
router.put('/:id', updateRegister)
router.patch('/:id', patchRegister)
router.delete('/:id', deleteRegister)

module.exports = router
