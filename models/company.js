const db = require('../helper/db')
module.exports = {

  createCompanyModel: (arr, cb) => {
    const query = `INSERT INTO table_company (id_user, company_name, scope, city, company_description, instagram, position, linkedID)VALUES(${arr[0]},'${arr[1]}','${arr[2]}','${arr[3]}','${arr[4]}','${arr[5]}','${arr[6]}','${arr[7]}')`
    console.log(arr)
    db.query(query, (err, result, field) => {
      console.log(err)
      cb(result)
    })
  },

  getDataCompanyByIDModel: (id, cb) => {
    db.query(`SELECT*FROM table_company WHERE id_company=${id}`, (err, result, field) => {
      console.log(err)

      cb(result)
    })
  },

  getDataCompanyModel: (searchKey, searchValue, limit, offset, cb) => {
    console.log(searchValue)
    db.query(`SELECT * FROM table_company WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, field) => {
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

  updateCompanyModel: (arr, idProject, callback) => {
    db.query(`SELECT * FROM table_company WHERE id_company = ${idProject}`, (_err, result, _field) => {
      if (result.length) {
        // id_user, company_name, scope, city, company_description, instagram, position, linkedID
        db.query(`UPDATE table_company SET id_user ='${arr[0]}', company_name='${arr[1]}', scope='${arr[2]}', city='${arr[3]}',company_description='${arr[4]}', instagram='${arr[5]}', position='${arr[6]}', linkedID='${arr[7]}'
         WHERE id_company = ${idProject}`, (_err, result, _fields) => {
          callback(result)
        })
      }
    })
  },

  patchCompanyModel: (data, idProject, callback) => {
    var query = `UPDATE table_company SET ${data} WHERE id_company = ${idProject}`
    db.query(query, (_err, result, _field) => {
      callback(result)
    })
  },

  deleteCompanyModel: (idProject, callback) => {
    db.query(`DELETE FROM table_company WHERE id_company=${idProject}`, (err, result, field) => {
      callback(result)
    })
  }

}
