const db = require('../helper/db')
module.exports = {

  createGetProjectModel: (arr, cb) => {
    console.log(arr.length)
    const query = `INSERT INTO table_GetProject (id_project, id_worker)VALUES(${arr[0]},'${arr[1]}')`

    db.query(query, (err, result, field) => {
      console.log(err)
      cb(result)
    })
  },

  getDataGetProjectByIDModel: (id, cb) => {
    db.query(`SELECT*FROM table_GetProject WHERE order_project=${id}`, (err, result, field) => {
      console.log(err)

      cb(result)
    })
  },

  getDataGetProjectModel: (searchKey, searchValue, limit, offset, cb) => {
    console.log(searchValue)
    db.query(`SELECT * FROM table_GetProject WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, field) => {
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

  updateGetProjectModel: (arr, idGetProject, callback) => {
    db.query(`SELECT * FROM table_GetProject WHERE order_project = ${idGetProject}`, (_err, result, _field) => {
      if (result.length) {
        db.query(`UPDATE table_GetProject SET id_project ='${arr[0]}', id_worker='${arr[1]}'
         WHERE order_project = ${idGetProject}`, (_err, result, _fields) => {
          callback(result)
        })
      }
    })
  },

  patchGetProjectModel: (data, idGetProject, callback) => {
    var query = `UPDATE table_GetProject SET ${data} WHERE order_project = ${idGetProject}`
    db.query(query, (_err, result, _field) => {
      callback(result)
    })
  },

  deleteGetProjectModel: (idGetProject, callback) => {
    db.query(`DELETE FROM table_GetProject WHERE order_project=${idGetProject}`, (err, result, field) => {
      callback(result)
    })
  }

}
