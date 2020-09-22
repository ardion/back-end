const db = require('../helper/db')
module.exports = {

  createProjectModel: (arr, cb) => {
    console.log(arr.length)
    const query = `INSERT INTO table_project (id_company, name_project, description_project)VALUES(${arr[0]},'${arr[1]}','${arr[2]}')`

    db.query(query, (err, result, field) => {
      console.log(err)
      cb(result)
    })
  },

  getDataProjectByIDModel: (id, cb) => {
    db.query(`SELECT*FROM table_project WHERE id_project=${id}`, (err, result, field) => {
      console.log(err)

      cb(result)
    })
  },

  getDataProjectModel: (searchKey, searchValue, limit, offset, cb) => {
    console.log(searchValue)
    db.query(`SELECT * FROM table_project WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, field) => {
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
  // id_company, name_project, description_project
  updateProjectModel: (arr, idProject, callback) => {
    db.query(`SELECT * FROM table_project WHERE id_project = ${idProject}`, (_err, result, _field) => {
      if (result.length) {
        db.query(`UPDATE table_project SET id_company ='${arr[0]}', name_project='${arr[1]}', description_project='${arr[2]}'
         WHERE id_Project = ${idProject}`, (_err, result, _fields) => {
          callback(result)
        })
      }
    })
  },

  patchProjectModel: (data, idProject, callback) => {
    var query = `UPDATE table_project SET ${data} WHERE id_project = ${idProject}`
    db.query(query, (_err, result, _field) => {
      callback(result)
    })
  },

  deleteProjectModel: (idProject, callback) => {
    db.query(`DELETE FROM table_project WHERE id_project=${idProject}`, (err, result, field) => {
      callback(result)
    })
  }

}
