const db = require('../helper/db')
module.exports = {

  createExperienceModel: (arr, cb) => {
    console.log(arr)
    const query = `INSERT INTO table_experience (id_worker, position, company_name, date, description_work)VALUES(${arr[0]},'${arr[1]}','${arr[2]}','${arr[3]}','${arr[4]}')`

    db.query(query, (err, result, field) => {
      console.log(err)
      cb(result)
    })
  },

  getDataExperienceByIDModel: (id, cb) => {
    db.query(`SELECT*FROM table_experience WHERE id_experience=${id}`, (err, result, field) => {
      console.log(err)

      cb(result)
    })
  },

  getDataExperienceModel: (searchKey, searchValue, limit, offset, cb) => {
    console.log(searchValue)
    db.query(`SELECT * FROM table_experience WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, field) => {
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

  updateExperienceModel: (arr, idProject, callback) => {
    db.query(`SELECT * FROM table_experience WHERE id_experience = ${idProject}`, (_err, result, _field) => {
      if (result.length) {
        // id_worker, position, company_name, date, description_work
        db.query(`UPDATE table_experience SET id_worker ='${arr[0]}', position='${arr[1]}', company_name='${arr[2]}', date='${arr[3]}',description_work='${arr[4]}'
         WHERE id_experience = ${idProject}`, (_err, result, _fields) => {
          callback(result)
        })
      }
    })
  },

  patchExperienceModel: (data, idProject, callback) => {
    var query = `UPDATE table_experience SET ${data} WHERE id_experience = ${idProject}`
    db.query(query, (_err, result, _field) => {
      callback(result)
    })
  },

  deleteExperienceModel: (idProject, callback) => {
    db.query(`DELETE FROM table_experience WHERE id_experience=${idProject}`, (err, result, field) => {
      callback(result)
    })
  }

}
