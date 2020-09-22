const db = require('../helper/db')
module.exports = {

  createPortofolioModel: (arr, cb) => {
    console.log(arr.length)
    const query = `INSERT INTO table_portofolio (id_worker, name_aplication, link_repository, type_repository, type_portofolio, picture)VALUES(${arr[0]},'${arr[1]}','${arr[2]}','${arr[3]}','${arr[4]}','${arr[5]}')`

    db.query(query, (err, result, field) => {
      console.log(err)
      cb(result)
    })
  },

  getDataPortofolioByIDModel: (id, cb) => {
    db.query(`SELECT*FROM table_portofolio WHERE id_portofolio=${id}`, (err, result, field) => {
      console.log(err)

      cb(result)
    })
  },

  getDataPortofolioModel: (searchKey, searchValue, limit, offset, cb) => {
    console.log(searchValue)
    db.query(`SELECT * FROM table_portofolio WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, field) => {
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

  updatePortofolioModel: (arr, idProject, callback) => {
    db.query(`SELECT * FROM table_portofolio WHERE id_portofolio = ${idProject}`, (_err, result, _field) => {
      if (result.length) {
        db.query(`UPDATE table_portofolio SET id_worker ='${arr[0]}', name_aplication='${arr[1]}', link_repository='${arr[2]}', type_repository='${arr[3]}', type_portofolio='${arr[4]}',picture='${arr[5]}'
         WHERE id_portofolio = ${idProject}`, (_err, result, _fields) => {
          callback(result)
        })
      }
    })
  },

  patchPortofolioModel: (data, idProject, callback) => {
    var query = `UPDATE table_portofolio SET ${data} WHERE id_portofolio = ${idProject}`
    db.query(query, (_err, result, _field) => {
      callback(result)
    })
  },

  deletePortofolioModel: (idProject, callback) => {
    db.query(`DELETE FROM table_portofolio WHERE id_portofolio=${idProject}`, (err, result, field) => {
      callback(result)
    })
  }

}
