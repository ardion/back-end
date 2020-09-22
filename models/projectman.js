const db = require('../helper/db')
module.exports = {

  createProjectmanModel: (arr, cb) => {
    console.log(arr.length)
    const query = `INSERT INTO table_projectman (id_project, id_worker)VALUES(${arr[0]},'${arr[1]}')`

    db.query(query, (err, result, field) => {
      console.log(err)
      cb(result)
    })
  },

  getDataProjectmanByIDModel: (id, cb) => {
    db.query(`SELECT*FROM table_projectman WHERE order_worker=${id}`, (err, result, field) => {
      console.log(err)

      cb(result)
    })
  },

  getDataProjectmanModel: (searchKey, searchValue, limit, offset, cb) => {
    console.log(searchValue)
    db.query(`SELECT * FROM table_projectman WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, field) => {
      if (!err) {
        cb(result)
      } else {
        res.send({
          success: false,
          message: 'Internal error' + err
        })
      }
    })
  },

  updateProjectmanModel: (arr, idProjectman, callback) => {
    db.query(`SELECT * FROM table_projectman WHERE order_worker = ${idProjectman}`, (_err, result, _field) => {
      if (result.length) {
        db.query(`UPDATE table_projectman SET id_project ='${arr[0]}', id_worker='${arr[1]}'
         WHERE order_worker = ${idProjectman}`, (_err, result, _fields) => {
          callback(result)
        })
      }
    })
  },

  patchProjectmanModel: (data, idProjectman, callback) => {
    var query = `UPDATE table_projectman SET ${data} WHERE order_worker = ${idProjectman}`
    db.query(query, (_err, result, _field) => {
      callback(result)
    })
  },

  deleteProjectmanModel: (idProjectman, callback) => {
    db.query(`DELETE FROM table_projectman WHERE order_worker=${idProjectman}`, (err, result, field) => {
      callback(result)
    })
  }

}
