const db = require('../helper/db')
module.exports = {

  createExperienceModel: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO table_experience SET ?', setData, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getDataExperienceByIDModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT*FROM table_experience WHERE id_worker=${id}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getDataExperienceModel: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM table_experience WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateExperienceModel: (arr, idProject) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM table_experience WHERE id_experience = ${idProject}`, (_err, result, _field) => {
        if (result.length) {
          db.query(`UPDATE table_experience SET id_worker ='${arr[0]}', position='${arr[1]}', company_name='${arr[2]}', date='${arr[3]}',description_work='${arr[4]}'
          WHERE id_experience = ${idProject}`, (_err, result, _fields) => {
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

 patchExperienceModel: (data, idProject) => {
    return new Promise((resolve, reject) => {
      var query = `UPDATE table_experience SET ${data} WHERE id_experience = ${idProject}`
      db.query(query, (_err, result, _field) => {
        if (!_err) {
          resolve(result)
        } else {
          reject(new Error(_err))
        }
      })
    })
  },

 deleteExperienceModel: (idProject) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM table_experience WHERE id_experience=${idProject}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }

}
