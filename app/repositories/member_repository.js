'use strict';

let Member = require('../domains/member');

let MemberRepository = function(db){
  this.db = db;
};

MemberRepository.prototype = {
  save: function(m, cb, errCb){
    let db = this.db;
    let data = {id: m.id, email : m.email , password : m.password, fullname : m.fullname };
    let query = 'INSERT INTO member SET ?';
    db.query(query, data, (err, results) => {
      if(err){
        errCb(err);
      }
      cb(results);
    });
  },


 update: function(m, cb, errCb){
    let db = this.db;
    let data = [m.email, m.password, m.fullName];
    let query = 'UPDATE member SET email= ?, password = ?, fullname = ? WHERE id = ?';
    db.query(query, data, (err, results) => {
      if(err){
        errCb(err);
      }
      cb(results);
    });
  },
  
   delete: function(id, cb, errCb){
    let db = this.db;
    let query = 'DELETE FROM member WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if(err){
        errCb(err);
      }
      cb(results);
    });
  },
  
  findOne: function(id, cb, errCb){
    let db = this.db;
    let query = 'SELECT * FROM member WHERE id = ?';
    db.query(query, [id], (err, results, fields) => {
      if(err){
        errCb(err);
      }
      if(!results){
        cb(`Data dengan ID ${id}, tidak di temukan`);
      }else{
        let m = results[0];
        let user = new Member (m.id, m.email, m.password, m.fullname);
        cb(user);
      }
    });
  },

  findAll: function(cb, errCb){
    let db = this.db;
    let query = 'SELECT * FROM member';
    db.query(query, (err, results, fields) => {
      if(err){
        errCb(err);
      }
      if(!results){
        cb('tabel user kosong');
      }else{
        let userArray = [];
        for(let i=0;i<results.length;i++){
          let m = results[i];
          let user = new Member(m.id, m.email, m.password, m.fullname);
          userArray.push(user);
        }
        cb(userArray);
      }
    });
  },
  findByEmail: function(email, cb, errCb){
    let db = this.db;
    let query = 'SELECT * FROM member WHERE email = ?';
    db.query(query, [email], (err, results, fields) => {
      if(err){
        errCb(err);
      }
      if(!results){
        cb(`data dengan email '${email}', tidak di temukan`);
      }else{
        let m = results[0];
        let member = new Member(m.id, m.email, m.password, m.fullname);
        cb(member);
      }
    });
  }
};

module.exports = MemberRepository;
