const { query } = require('express')
const db = require('../helper/db')
module.exports = {

  createWorkerModel: (setData) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO table_worker SET ?'
      db.query(query, setData, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getDataWorkerByIDModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`select table_user.name, table_worker.id_worker, table_worker.id_user, table_worker.jobdesk, table_worker.domicile, table_worker.workplace, table_worker.description_personal, table_worker.job_status, table_worker.instagram, table_worker.github, table_worker.gitlab, table_worker.image, group_concat(table_skill.skill) as skill from table_user JOIN table_worker USING(id_user) JOIN table_skill using(id_worker) WHERE table_worker.id_worker=${id}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getDataWorkerModel: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM table_worker WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateWorkerModel: (arr, idProject) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM table_worker WHERE id_worker = ${idProject}`, (_err, result, _field) => {
        if (result.length) {
          db.query(`UPDATE table_worker SET id_user ='${arr[0]}', jobdesk='${arr[1]}', domicile='${arr[2]}', workplace='${arr[3]}',description_personal='${arr[4]}', job_status='${arr[5]}', instagram='${arr[6]}', github='${arr[7]}', gitlab='${arr[8]}', image='${arr[9]}'
         WHERE id_worker = ${idProject}`, (_err, result, _fields) => {
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

  patchWorkerModel: (data, idProject, image) => {
    return new Promise((resolve, reject) => {
      var query = `UPDATE table_worker SET ${data}, image='${image}' WHERE id_worker = ${idProject}`
      db.query(query, (_err, result, _field) => {
        if (!_err) {
          resolve(result)
        } else {
          reject(new Error(_err))
        }
      })
    })
  },

  deleteWorkerModel: (idProject) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM table_worker WHERE id_worker=${idProject}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // getdataworkerskillmodel itu untuk cari dan order berdasarkan nama, skill, place, dan status kerja dengan dinamis kak

  getDataWorkerskillModel: (searchKey, searchValue, limit, offset, order, sort) => {
    return new Promise((resolve, reject) => {
      let sortWorker = ''
      if (sort != null) {
        if (order != null) {
          sortWorker = `ORDER BY ${order} ${sort}`
        } else {
          sortWorker = 'ORDER BY name ASC'
        }
      }
      console.log(sort)
      console.log(order)
      console.log(sortWorker)

      const qq = `select table_worker.id_worker, table_user.name,table_worker.image,table_worker.domicile,group_concat(table_skill.skill) as skill
    from table_user JOIN table_worker USING(id_user)
    JOIN table_skill on table_worker.id_worker=table_skill.id_worker
    WHERE  ${searchKey} LIKE '%${searchValue}%' group by id_worker ${sortWorker} `

      db.query(qq, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
        console.log(qq)
      })
    })
  },
  getDataWorkerHomeModel: ( limit, offset) => {
    return new Promise((resolve, reject) => {
      const qq = `select table_worker.id_worker, table_user.name, table_worker.image,table_worker.domicile,group_concat(table_skill.skill) as skill from table_user JOIN table_worker USING(id_user) JOIN table_skill on table_worker.id_worker=table_skill.id_worker group by id_worker ORDER by name `
      db.query(qq, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
        console.log(qq)
      })
    })
  }
}
