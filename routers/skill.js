const { Router } = require('express')
const { getDataSkillByID, createSkill, getDataSkill, updateSkill, patchSkill, deleteSkill } = require('../controler/Skill')
const router = Router()
const {authorization}=require('../middleware/auth')
router.post('/',authorization, createSkill)

router.get('/:id', getDataSkillByID)
router.get('/', getDataSkill)
router.put('/:id',authorization,updateSkill)
router.patch('/:id',authorization,patchSkill)
router.delete('/:id',authorization, deleteSkill)

module.exports = router
