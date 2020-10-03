const db = require('../helper/db')
module.exports = {

  createPortofolioModel: (setData) => {
    console.log(setData)
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO table_portofolio SET ?'
      db.query(query, setData, (err, result, field) => {
        console.log(err)
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getDataPortofolioByIDModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT*FROM table_portofolio WHERE id_portofolio=${id}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getDataPortofolioModel: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM table_portofolio WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updatePortofolioModel: (arr, idProject) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM table_portofolio WHERE id_portofolio = ${idProject}`, (_err, result, _field) => {
        if (result.length) {
        // id_user, jobdesk, domicile, workplace, description_personal, job_status,instagram, github, gitlab
          db.query(`UPDATE table_portofolio SET id_worker ='${arr[0]}', name_aplication='${arr[1]}', link_repository='${arr[2]}', type_repository='${arr[3]}', type_portofolio='${arr[4]}',image='${arr[5]}'
        WHERE id_portofolio = ${idProject}`, (_err, result, _fields) => {
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

  patchPortofolioModel: (data, idProject, image) => {
    return new Promise((resolve, reject) => {
      var query = `UPDATE table_portofolio SET ${data} , image='${image}' WHERE id_portofolio = ${idProject}`
      db.query(query, (_err, result, _field) => {
        if (!_err) {
          resolve(result)
        } else {
          reject(new Error(_err))
        }
      })
    })
  },
  deletePortofolioModel: (idProject) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM table_portofolio WHERE id_portofolio=${idProject}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }

}
