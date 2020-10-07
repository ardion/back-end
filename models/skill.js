const db = require('../helper/db')
module.exports = {

  createSkillModel: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO table_skill SET ?', setData, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getDataSkillByIDModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT*FROM table_skill WHERE id_skill=${id}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

 getDataSkillModel: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM table_skill WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateSkillModel: (arr, idSkill) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM table_skill WHERE id_skill = ${idSkill}`, (_err, result, _field) => {
        if (result.length) {
          db.query(`UPDATE table_skill SET id_worker ='${arr[0]}', skill='${arr[1]}'
           WHERE id_skill = ${idSkill}`, (_err, result, _fields) => {
            if (!_err) {
              resolve(result)
            } else {
              reject(new Error(_err))
            }
          })
        }
      })
    })
  },

  patchSkillModel: (data, idSkill) => {
    return new Promise((resolve, reject) => {
      var query = `UPDATE table_skill SET ${data} WHERE id_skill = ${idSkill}`
      db.query(query, (_err, result, _field) => {
        if (!_err) {
          resolve(result)
        } else {
          reject(new Error(_err))
        }
      })
    })
  },

   deleteSkillModel: (idSkill) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM table_skill WHERE id_skill=${idSkill}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }

}
