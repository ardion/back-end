const db = require('../helper/db')
module.exports = {

  createProjectmanModel: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO table_projectman SET ?', setData, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getDataProjectmanByIDModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`select table_company.id_company, table_company.company_name,table_projectman.order_worker, table_projectman.id_project, table_projectman.message, table_projectman.price, table_projectman.project_job, table_projectman.status
      from table_project JOIN table_projectman USING(id_project)
          JOIN table_company on table_company.id_company=table_project.id_company WHERE id_worker=${id}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getDataProjectmanModel: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM table_projectman WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateProjectmanModel: (arr, idProjectman) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM table_projectman WHERE order_worker = ${idProjectman}`, (_err, result, _field) => {
        if (result.length) {
          db.query(`UPDATE table_projectman SET id_project ='${arr[0]}', id_worker='${arr[1]}'
         WHERE order_worker = ${idProjectman}`, (_err, result, _fields) => {
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

  patchProjectmanModel: (data, id) => {
    console.log(id)
    return new Promise((resolve, reject) => {
      var query = `UPDATE table_projectman SET ${data} WHERE order_worker = ${id}`
      db.query(query, (_err, result, _field) => {
        if (!_err) {
          resolve(result)
        } else {
          reject(new Error(_err))
        }
      })
    })
  },

  deleteProjectmanModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM table_projectman WHERE order_worker=${id}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getDataProjectmanByIDModelPatch: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT*FROM table_projectman WHERE order_worker=${id}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
