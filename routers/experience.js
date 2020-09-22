const { Router } = require('express')
const { getDataExperienceByID, createExperience, getDataExperience, updateExperience, patchExperience, deleteExperience } = require('../controler/experience')
const router = Router()

router.post('/', createExperience)

router.get('/:id', getDataExperienceByID)
router.get('/', getDataExperience)
router.put('/:id', updateExperience)
router.patch('/:id', patchExperience)
router.delete('/:id', deleteExperience)

module.exports = router
