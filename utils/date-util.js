'use strict';

var moment = require('moment');

var DAY = '日';
var WEEK = '周';
var MONTH = '月';
var SEASON = '夏';
var SEASON_TYPE = '夏季';

var format_date = function(appraise) {

    if(appraise.type === DAY) {

      appraise.appraised_date = moment(appraise.appraised_date).format('YYYY-MM- HH:mm:ss');
    } else if(appraise.type === WEEK) {

      appraise.appraised_date = moment(appraise.appraised_date).format('W');
    } else if(appraise.type === MONTH) {

      appraise.appraised_date = moment(appraise.appraised_date).format('YYYY-MM');
    } else {
      appraise.appraised_date = moment(appraise.appraised_date).format('YYYY-MM');
    }
};

var find_formated_date = function (appraise) {
  var date = {};
  if(appraise.type === DAY) {

    date = moment(appraise.appraised_date).format('YYYY-MM-dd');
  } else if(appraise.type === WEEK) {

    date = moment(appraise.appraised_date).format('W');
  } else if(appraise.type === MONTH) {

    date =  moment(appraise.appraised_date).format('YYYY-MM');
  } else {
    
    date = moment(appraise.appraised_date).format('YYYY-MM');
  }
  return date;
};

module.exports = {
  format_date: format_date,
  find_formated_date: find_formated_date
};
