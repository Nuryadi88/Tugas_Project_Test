'use strict';

let db = require('../config/mysql_config');
let UserRepo = require('../repositories/member_repository');
let User = require('../domains/member');

let saveUserShowForm = (req, res, next) => {
  res.render('new_user', {'title': 'Add New User'});
};

let saveUser = (req, res, next) => {
  if(!req.body){
    next('semua field harus diisi..');
  }
  let data = req.body;
  let user = new User(parseInt(data.id), data.email, data.password, data.fullname);
  let userRepo = new UserRepo(db);
  userRepo.save(user, result => {
    res.redirect('user');
  }, err => {
    if(err){
      next(err);
    }
  });
};

let updateUserShowForm = (req, res, next) => {
  if(!req.params){
    next('parameter code tidak ada');
  }
  let id = req.params.id;
  let userRepo = new UserRepo(db);
  userRepo.findOne(id, result => {
    res.render('update_user', {'user': result, 'title': 'Update User'});
  }, err => {
    if(err){
      next(err);
    }
  });
};

let updateUser = (req, res, next) => {
  if(!req.body){
    next('semua field harus diisi');
  }
  let data = req.body;
  let user= new User(parseInt(data.id), data.email, data.password, data.fullname);
  let userRepo = new UserRepo(db);
  userRepo.update(user, result => {
    res.redirect('/user');
  }, err => {
    if(err){
      next(err);
    }
  });
};

let deleteUser = (req, res, next) => {
  if(!req.params){
    next('parameter code tidak ada');
  }
  let id = req.params.id;
  let userRepo = new UserRepo(db);
  userRepo.delete(id, result => {
    res.redirect('/user');
  }, err => {
    if(err){
      next(err);
    }
  });
};

let getUser = (req, res, next) => {
  if(!req.params){
    next('parameter code tidak ada');
  }
  let id = req.params.id;
  let userRepo = new UserRepo(db);
  userRepo.findOne(id, result => {
    res.render('User_detail', {'member': result, 'title': 'User Detail'});
  }, err => {
    if(err){
      next(err);
    }
  });
};

let getAllUser = (req, res, next) => {
  let userRepo = new UserRepo(db);
  userRepo.findAll(results => {
    res.render('user', {'members': results, 'title': 'User List'});
  }, err => {
    if(err){
      next(err);
    }
  });
};

let GetAllUser_1 = (req, res, next) => {
  let userRepo = new UserRepo(db);
  userRepo.findAll(results => {
    res.render('utama', {'members': results, 'title': 'User List'});
  }, err => {
    if(err){
      next(err);
    }
  });
};
module.exports = {
  saveUserShowForm: saveUserShowForm,
  saveUser: saveUser,
  updateUserShowForm: updateUserShowForm,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getUser: getUser,
  getAllUser: getAllUser,
  GetAllUser_1: GetAllUser_1
};
