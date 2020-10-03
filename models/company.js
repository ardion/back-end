const db = require('../helper/db')
module.exports = {

  createCompanyModel: (setData) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO table_company SET ?'
      db.query(query, setData, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getDataCompanyByIDModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT*FROM table_company WHERE id_company=${id}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getDataCompanyModel: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM table_company WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateCompanyModel: (arr, idProject) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM table_company WHERE id_company = ${idProject}`, (_err, result, _field) => {
        if (result.length) {
        // id_user, jobdesk, domicile, workplace, description_personal, job_status,instagram, github, gitlab
          db.query(`UPDATE table_company SET id_user ='${arr[0]}', company_name='${arr[1]}', scope='${arr[2]}', city='${arr[3]}',company_description='${arr[4]}', instagram='${arr[5]}', position='${arr[6]}', linkedID='${arr[7]}' ,image='${arr[8]}'
        WHERE id_company = ${idProject}`, (_err, result, _fields) => {
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

  patchCompanyModel: (data, idProject, image) => {
    return new Promise((resolve, reject) => {
      var query = `UPDATE table_company SET ${data}, image='${image}' WHERE id_company = ${idProject}`
      db.query(query, (_err, result, _field) => {
        if (!_err) {
          resolve(result)
        } else {
          reject(new Error(_err))
        }
      })
    })
  },

  deleteCompanyModel: (idProject) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM table_company WHERE id_company=${idProject}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }

}
