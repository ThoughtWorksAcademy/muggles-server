'use strict';

var date_util = require('../../utils/date-util');

describe('date_util', function() {

  it('should have a format_date method and it can return formated date', function() {

    var appraise = {
      type: '日',
      appraised_date: new Date()
    };

    var result = date_util.format_date(appraise);
    expect(result).to.equal('2015-05-15');
  });
});
