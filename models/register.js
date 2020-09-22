const db = require('../helper/db')
module.exports = {

  createRegisterModel: (arr, cb) => {
    const query = `INSERT INTO table_user (name, email, pasword, number_phone)VALUES('${arr[0]}','${arr[1]}','${arr[2]}',${arr[3]})`
    console.log(arr)
    db.query(query, (err, result, field) => {
      console.log(err)
      cb(result)
    })
  },

  getDataRegisterByIDModel: (id, cb) => {
    db.query(`SELECT*FROM table_user WHERE id_user=${id}`, (err, result, field) => {
      console.log(err)

      cb(result)
    })
  },

  getDataRegisterModel: (searchKey, searchValue, limit, offset, cb) => {
    console.log(searchValue)
    db.query(`SELECT * FROM table_user WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, field) => {
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

  updateRegisterModel: (arr, idProject, callback) => {
    db.query(`SELECT * FROM table_user WHERE id_user = ${idProject}`, (_err, result, _field) => {
      if (result.length) {
        db.query(`UPDATE table_user SET name='${arr[0]}', email='${arr[1]}', pasword='${arr[2]}', number_phone='${arr[3]}'
         WHERE id_user = ${idProject}`, (_err, result, _fields) => {
          callback(result)
        })
      }
    })
  },

  patchRegisterModel: (data, idProject, callback) => {
    var query = `UPDATE table_user SET ${data} WHERE id_user = ${idProject}`
    db.query(query, (_err, result, _field) => {
      callback(result)
    })
  },

  deleteRegisterModel: (idProject, callback) => {
    db.query(`DELETE FROM table_user WHERE id_user=${idProject}`, (err, result, field) => {
      callback(result)
    })
  }

}
