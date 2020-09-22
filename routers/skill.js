const { Router } = require('express')
const { getDataSkillByID, createSkill, getDataSkill, updateSkill, patchSkill, deleteSkill } = require('../controler/Skill')
const router = Router()

router.post('/', createSkill)

router.get('/:id', getDataSkillByID)
router.get('/', getDataSkill)
router.put('/:id', updateSkill)
router.patch('/:id', patchSkill)
router.delete('/:id', deleteSkill)

module.exports = router
