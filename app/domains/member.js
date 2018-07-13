'use strict';

let Member = function(id, email, password, fullname){
  this.id = id;
  this.email = email;
  this.password = password;
  this.fullname = fullname;
};

Member.prototype.isValidPassword = function(password){
  return this.password === password;
};

module.exports = Member;
