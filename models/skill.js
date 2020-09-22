const db = require('../helper/db')
module.exports = {

  createSkillModel: (arr, cb) => {
    console.log(arr.length)
    const query = `INSERT INTO table_Skill (id_worker,skill)VALUES(${arr[0]},'${arr[1]}')`

    db.query(query, (err, result, field) => {
      console.log(err)
      cb(result)
    })
  },

  getDataSkillByIDModel: (id, cb) => {
    db.query(`SELECT*FROM table_Skill WHERE id_skill=${id}`, (err, result, field) => {
      console.log(err)

      cb(result)
    })
  },

  getDataSkillModel: (searchKey, searchValue, limit, offset, cb) => {
    console.log(searchValue)
    db.query(`SELECT * FROM table_Skill WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, field) => {
      if (!err) {
        cb(result)
      }else {
        res.send({
          success: false,
          message: 'Internal error' + err
        })
      }
    })
  },

  updateSkillModel: (arr, idSkill, callback) => {
    db.query(`SELECT * FROM table_Skill WHERE id_skill = ${idSkill}`, (_err, result, _field) => {
      if (result.length) {
        db.query(`UPDATE table_Skill SET id_worker ='${arr[0]}', skill='${arr[1]}'
         WHERE id_skill = ${idSkill}`, (_err, result, _fields) => {
          callback(result)
        })
      }
    })
  },

  patchSkillModel: (data, idSkill, callback) => {
    var query = `UPDATE table_Skill SET ${data} WHERE id_skill = ${idSkill}`
    db.query(query, (_err, result, _field) => {
      callback(result)
    })
  },

  deleteSkillModel: (idSkill, callback) => {
    db.query(`DELETE FROM table_Skill WHERE id_skill=${idSkill}`, (err, result, field) => {
      callback(result)
    })
  }

}
