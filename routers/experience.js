const { Router } = require('express')
const { getDataExperienceByID, createExperience, getDataExperience, updateExperience, patchExperience, deleteExperience } = require('../controler/experience')
const router = Router()
const {authorization}=require('../middleware/auth')
router.post('/',authorization, createExperience)

router.get('/:id', getDataExperienceByID)
router.get('/', getDataExperience)
router.put('/:id', authorization,updateExperience)
router.patch('/:id', authorization,patchExperience)
router.delete('/:id', authorization,deleteExperience)

module.exports = router
