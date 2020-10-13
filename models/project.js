const db = require('../helper/db')
module.exports = {
 createProjectModel: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO table_project SET ?', setData, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getDataProjectByIDModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT*FROM table_project WHERE id_company=${id}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getDataProjectModel: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM table_project WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateProjectModel: (arr, idProject) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM table_project WHERE id_project = ${idProject}`, (_err, result, _field) => {
        if (result.length) {
          db.query(`UPDATE table_project SET id_company ='${arr[0]}', name_project='${arr[1]}', description_project='${arr[2]}'
          WHERE id_Project = ${idProject}`, (_err, result, _fields) => {
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

  patchProjectModel: (data, idProject) => {
    return new Promise((resolve, reject) => {
      var query = `UPDATE table_project SET ${data} WHERE id_project = ${idProject}`
      db.query(query, (_err, result, _field) => {
        if (!_err) {
          resolve(result)
        } else {
          reject(new Error(_err))
        }
      })
    })
  },

  deleteProjectModel: (idProject) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM table_project WHERE id_project=${idProject}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }

}
