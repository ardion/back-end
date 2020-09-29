const db = require('../helper/db')
module.exports = {

  postUserModel: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO table_user SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData
          }
          delete newResult.password
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  checkUserModel: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT id_user, email, password, name, user_role, user_status FROM table_user WHERE email = ?', email, (error, result) => {
        console.log(error)
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  getDataRegisterByIDModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT*FROM table_user WHERE id_user=${id}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getDataRegisterModel: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM table_user WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateRegisterModel: (arr, idProject) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM table_user WHERE id_user = ${idProject}`, (_err, result, _field) => {
        if (result.length) {
          db.query(`UPDATE table_user SET name='${arr[0]}', email='${arr[1]}', password='${arr[2]}', number_phone='${arr[3]}'
         WHERE id_user = ${idProject}`, (_err, result, _fields) => {
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

  patchRegisterModel: (data, idProject) => {
    return new Promise((resolve, reject) => {
      var query = `UPDATE table_user SET ${data} WHERE id_user = ${idProject}`
      db.query(query, (_err, result, _field) => {
        if (!_err) {
          resolve(result)
        } else {
          reject(new Error(_err))
        }
      })
    })
  },

  deleteRegisterModel: (idProject) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM table_user WHERE id_user=${idProject}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
