const { query } = require('express')
const db = require('../helper/db')
module.exports = {

  createWorkerModel: (arr, cb) => {
    const query = `INSERT INTO table_worker (id_user, jobdesk, domicile, workplace, description_personal, job_status,instagram, github, gitlab)VALUES(${arr[0]},'${arr[1]}','${arr[2]}','${arr[3]}','${arr[4]}','${arr[5]}','${arr[6]}','${arr[7]}','${arr[8]}')`
    console.log(arr)
    db.query(query, (err, result, field) => {
      console.log(err)
      cb(result)
    })
  },

  getDataWorkerByIDModel: (id, cb) => {
    db.query(`SELECT*FROM table_worker WHERE id_worker=${id}`, (err, result, field) => {
      console.log(err)

      cb(result)
    })
  },

  getDataWorkerModel: (searchKey, searchValue, limit, offset, cb) => {
    console.log(searchValue)
    db.query(`SELECT * FROM table_worker WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, field) => {
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

  updateWorkerModel: (arr, idProject, callback) => {
    db.query(`SELECT * FROM table_worker WHERE id_worker = ${idProject}`, (_err, result, _field) => {
      if (result.length) {
        // id_user, jobdesk, domicile, workplace, description_personal, job_status,instagram, github, gitlab
        db.query(`UPDATE table_worker SET id_user ='${arr[0]}', jobdesk='${arr[1]}', domicile='${arr[2]}', workplace='${arr[3]}',description_personal='${arr[4]}', job_status='${arr[5]}', instagram='${arr[6]}', github='${arr[7]}', gitlab='${arr[8]}'
         WHERE id_worker = ${idProject}`, (_err, result, _fields) => {
          callback(result)
        })
      }
    })
  },

  patchWorkerModel: (data, idProject, callback) => {
    var query = `UPDATE table_worker SET ${data} WHERE id_worker = ${idProject}`
    db.query(query, (_err, result, _field) => {
      callback(result)
    })
  },

  deleteWorkerModel: (idProject, callback) => {
    db.query(`DELETE FROM table_worker WHERE id_worker=${idProject}`, (err, result, field) => {
      callback(result)
    })
  },

  //getdataworkerskillmodel itu untuk cari dan order berdasarkan nama, skill, place, dan status kerja dengan dinamis kak

  getDataWorkerskillModel: (searchKey, searchValue, limit, offset, order, sort, cb) => {
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

    const qq=`select table_user.name,table_worker.workplace,table_skill.skill
    from table_user JOIN table_worker USING(id_user)
    JOIN table_skill on table_worker.id_worker=table_skill.id_worker
    WHERE  ${searchKey} LIKE '%${searchValue}%' ${sortWorker} `

    db.query(qq, (err, result, field) => {
      cb(result)
      console.log(qq)
    })
  }

}
