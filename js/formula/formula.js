// Copyright (c) 2012 Sutoiku, Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// Some algorithms have been ported from Apache OpenOffice:

/**************************************************************
 * 
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 * 
 *************************************************************/

// Constants
var _s = _.str;

var MEMOIZED_FACT = [];

var SQRT2PI = 2.5066282746310002;

var WEEK_STARTS = [,0,1,,,,,,,,,1,2,3,4,5,6,0];

var WEEK_TYPES = [
  [],
  [1,2,3,4,5,6,7],
  [7,1,2,3,4,5,6],
  [6,0,1,2,3,4,5],
  [],[],[],[],[],[],[],
  [7,1,2,3,4,5,6],
  [6,7,1,2,3,4,5],
  [5,6,7,1,2,3,4],
  [4,5,6,7,1,2,3],
  [3,4,5,6,7,1,2],
  [2,3,4,5,6,7,1],
  [1,2,3,4,5,6,7]
];

var WEEKEND_TYPES = [[],[6,0],[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],,,,[0],[1],[2],[3],[4],[5],[6]];


// Custom Functions

function ARGSCONCAT(args) {
  var result = [];
  for (i = 0; i < args.length; i++) {
    result = result.concat(args[i]);
  }
  return result;
}

function ARGSTOARRAY(args) {
  return Array.prototype.slice.call(args, 0); 
}

function CLEANFLOAT(number) {
  var power = Math.pow(10, 14);
  return Math.round(number * power) / power;
}

function COUNTIN(range, value) {
  var result = 0;
  for (var i = 0; i < range.length; i++) {
    if (range[i] === value) result++;
  }
  return result;
}

function GETJSON(file) {
  var request = new XMLHttpRequest();
  request.open('GET', file, false);
  request.send(null);
  if (request.status == 200) return JSON.parse(request.responseText);
};


// Date functions

function DATE(year, month, day) {
  return new Date(year, month - 1, day);
}

function DATEVALUE(date_text) {
  return new Date(date_text);
}

function DAY(date) {
  return moment(new Date(date)).date();
}

function DAYS(end_date, start_date) {
  return moment(new Date(end_date)).diff(moment(new Date(start_date)), 'days');
}

function DAYS360(start_date, end_date, method) {
  var start = moment(new Date(start_date));
  var end = moment(new Date(end_date));
  var smd = 31;
  var emd = 31;
  var sd = start.date();
  var ed = end.date();
  if (method) {
    sd = (sd === 31) ? 30 : sd;
    ed = (ed === 31) ? 30 : ed;
  }
  else {
    if (start.month() === 1) {    
      smd = start.daysInMonth();
    }
    if (end.month() === 1) {
      emd = end.daysInMonth();
    }
    sd = (sd === smd) ? 30 : sd;
    if (sd === 30 || sd === smd) {
      ed = (ed === emd) ? 30 : ed;
    }
  }
  return 360 * (end.year() - start.year()) + 30 * (end.month() - start.month()) + (ed - sd);
}

function EDATE(start_date, months) {
  return moment(new Date(start_date)).add('months', months).toDate();
}

function EOMONTH(start_date, months) {
  var edate = moment(new Date(start_date)).add('months', months);
  return new Date(edate.year(), edate.month(), edate.daysInMonth());
}

function HOUR(timestamp) {
  return (timestamp <= 1) ? Math.floor(24*timestamp) : moment(new Date(timestamp)).hours();
}

function MINUTE(timestamp) {
  return (timestamp <= 1) ? Math.floor(24*60*timestamp) - 60*Math.floor(24*timestamp) : moment(new Date(timestamp)).minutes();
}

function ISOWEEKNUM(date) {
  return moment(new Date(date)).format('w');
}

function MONTH(timestamp) {
  return moment(new Date(timestamp)).month() + 1;
}

function NETWORKDAYS(start_date, end_date, holidays) {
  return NETWORKDAYSINTL(start_date, end_date, 1, holidays);
}

function NETWORKDAYSINTL(start_date, end_date, weekend, holidays) {
  var weekend_type = (typeof weekend === 'undefined') ? 1 : weekend;
  var weekend_days = WEEKEND_TYPES[weekend_type];
  var sd = moment(new Date(start_date));
  var ed = moment(new Date(end_date));
  var net_days = ed.diff(sd, 'days') + 1;
  var net_work_days = net_days;
  var day_of_week = '';
  var cd = sd;
  var holiday_dates = [];
  if (typeof holidays !== 'undefined') {
    for (var i = 0; i < holidays.length; i++) {
      holiday_dates[i] = moment(new Date(holidays[i])).format('MM-DD-YYYY');
    }
  }
  var j = 1;
  while (j < net_days) {
    day_of_week = cd.format('d');
    if (weekend_days.indexOf(parseInt(day_of_week)) >= 0) {
      net_work_days--;
    } else if (holiday_dates.indexOf(cd.format('MM-DD-YYYY')) >= 0) {
      net_work_days--;
    }
    cd = cd.add('days', 1);
    j++;
  }
  return net_work_days;
}

function NOW() {
  return new Date();
}

function SECOND(timestamp) {
  return moment(new Date(timestamp)).seconds();
}

function TIME(hour, minute, second) {
  return (3600*hour + 60*minute + second)/86400;
}

function TIMEVALUE(time_text) {
  var timestamp = moment(new Date(time_text));
  return (3600*timestamp.hours() + 60*timestamp.minutes() + timestamp.seconds())/86400;
}

function TODAY() {
  return new Date();
}

function WEEKDAY(date, type) {
  var week_day = moment(new Date(date)).format('d');
  var week_type = (typeof type === 'undefined') ? 1 : type;
  return WEEK_TYPES[week_type][week_day];
}

function WEEKNUM(date, type) {
  var current_date = moment(new Date(date));
  var january_first = moment(new Date(current_date.year(), 0, 1));
  var week_type = (typeof type === 'undefined') ? 1 : type;
  var week_start = WEEK_STARTS[week_type];
  var first_day = january_first.format('d');
  var offset = (first_day < week_start) ? week_start - first_day + 1 : first_day - week_start;
  if (week_type === 21) {
    return ISOWEEKNUM(date);
  } else {
    return Math.floor(current_date.diff(january_first.subtract('days', offset), 'days')/7) + 1;
  }
}

function WORKDAY(start_date, days, holidays) {
  return WORKDAYINTL(start_date, days, 1, holidays);
}

function WORKDAYINTL(start_date, days, weekend, holidays) {
  var weekend_type = (typeof weekend === 'undefined') ? 1 : weekend;
  var weekend_days = WEEKEND_TYPES[weekend_type];
  var sd = moment(new Date(start_date));
  var cd = sd;
  var day_of_week = '';
  var holiday_dates = [];
  if (typeof holidays !== 'undefined') {
    for (var i = 0; i < holidays.length; i++) {
      holiday_dates[i] = moment(new Date(holidays[i])).format('MM-DD-YYYY');
    }
  }
  var j = 0;
  while (j < days) {
    cd = cd.add('days', 1);
    day_of_week = cd.format('d');
    if (weekend_days.indexOf(parseInt(day_of_week)) < 0 && holiday_dates.indexOf(cd.format('MM-DD-YYYY')) < 0) {
      j++;
    }
  }
  return cd.toDate();
}

function YEAR(date) {
  return moment(new Date(date)).year();
}

function YEARFRAC(start_date, end_date, basis) {
  // Credits: David A. Wheeler [http://www.dwheeler.com/]

  // Initialize parameters
  var basis = (typeof basis === 'undefined') ? 0 : basis;
  var sdate = moment(new Date(start_date));
  var edate = moment(new Date(end_date));

  // Return error if either date is invalid
  if (!sdate.isValid() || !edate.isValid()) return '#VALUE!';

  // Return error if basis is neither 0, 1, 2, 3, or 4
  if ([0,1,2,3,4].indexOf(basis) === -1) return '#NUM!';
  
  // Return zero if start_date and end_date are the same
  if (sdate === edate) return 0;
  
  // Swap dates if start_date is later than end_date
  if (sdate.diff(edate) > 0) {
    var edate = moment(new Date(start_date));
    var sdate = moment(new Date(end_date)); 
  }

  // Lookup years, months, and days
  var syear = sdate.year();
  var smonth = sdate.month();
  var sday = sdate.date();
  var eyear = edate.year();
  var emonth = edate.month();
  var eday = edate.date();

  switch (basis) {
    case 0:
      // US (NASD) 30/360
      // Note: if eday == 31, it stays 31 if sday < 30
      if (sday === 31 && eday === 31) {
        sday = 30;
        eday = 30;
      } else if (sday === 31) {
        sday = 30;
      } else if (sday === 30 && eday === 31) {
        eday = 30;
      } else if (smonth === 1 && emonth === 1 && sdate.daysInMonth() === sday && edate.daysInMonth() === eday) {
        sday = 30;
        eday = 30;
      } else if (smonth === 1 && sdate.daysInMonth() === sday) {
        sday = 30;
      }
      return ((eday + emonth * 30 + eyear * 360) - (sday + smonth * 30 + syear * 360)) / 360;
      break;

    case 1:
      // Actual/actual
      var feb29Between = function(date1, date2) {
        // Requires year2 == (year1 + 1) or year2 == year1
        // Returns TRUE if February 29 is between the two dates (date1 may be February 29), with two possibilities:
        // year1 is a leap year and date1 <= Februay 29 of year1
        // year2 is a leap year and date2 > Februay 29 of year2
  
        var mar1year1 = moment(new Date(date1.year(), 2, 1));
        if (moment([date1.year()]).isLeapYear() && date1.diff(mar1year1) < 0 && date2.diff(mar1year1) >= 0) {
          return true;
        } 
        var mar1year2 = moment(new Date(date2.year(), 2, 1));
        if (moment([date2.year()]).isLeapYear() && date2.diff(mar1year2) >= 0 && date1.diff(mar1year2) < 0) {
          return true;
        }
        return false;
      };
      var ylength = 365;
      if (syear === eyear || ((syear + 1) === eyear) && ((smonth > emonth) || ((smonth === emonth) && (sday >= eday)))) {
        if (syear === eyear && moment([syear]).isLeapYear()) {
          ylength = 366;
        } else if (feb29Between(sdate, edate) || (emonth === 1 && eday === 29)) {
          ylength = 366;
        }
        return edate.diff(sdate, 'days') / ylength;
      } else {
        var years = (eyear - syear) + 1;
        var days = moment(new Date(eyear + 1, 0, 1)).diff(moment(new Date(syear, 0, 1)), 'days');
        var average = days / years;
        return edate.diff(sdate, 'days') / average;
      }
      break;

    case 2:
      // Actual/360
      return edate.diff(sdate, 'days') / 360;
      break;

    case 3:
      // Actual/365
      return edate.diff(sdate, 'days') / 365;
      break;

    case 4:
      // European 30/360
      if (sday === 31) sday = 30;
      if (eday === 31) eday = 30;
      // Remarkably, do NOT change February 28 or February 29 at ALL
      return ((eday + emonth * 30 + eyear * 360) - (sday + smonth * 30 + syear * 360)) / 360;
      break;
  }
}


// Engineering functions

function BESSELI() {
  return;
}

function BESSELJ() {
  return;
}

function BESSELK() {
  return;
}

function BESSELY() {
  return;
}

function BIN2DEC(number) {
  // Return error if number is not binary or contains more than 10 characters (10 digits)
  if (!/^[01]{1,10}$/.test(number)) return '#NUM!';
  
  // Convert binary number to decimal
  var result = parseInt(number, 2);
  
  // Handle negative numbers
  var stringified = number.toString();
  if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
    return parseInt(stringified.substring(1), 2) - 512;
  } else {
    return result;
  }
}

function BIN2HEX(number, places) {
  // Return error if number is not binary or contains more than 10 characters (10 digits)
  if (!/^[01]{1,10}$/.test(number)) return '#NUM!';

  // Ignore places and return a 10-character hexadecimal number if number is negative
  var stringified = number.toString();
  if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
    return (1099511627264 + parseInt(stringified.substring(1), 2)).toString(16);
  }

  // Convert binary number to hexadecimal
  var result = parseInt(number, 2).toString(16);

  // Return hexadecimal number using the minimum number of characters necessary if places is undefined
  if (typeof places === 'undefined') {
    return result;
  } else {
    // Return error if places is nonnumeric
    if (isNaN(places)) return '#VALUE!';
    
    // Return error if places is negative
    if (places < 0) return '#NUM!';
    
    // Truncate places in case it is not an integer
    places = Math.floor(places);

    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
    return (places >= result.length) ? _s.repeat('0', places - result.length) + result : '#NUM!';
  }
}

function BIN2OCT(number, places) {
  // Return error if number is not binary or contains more than 10 characters (10 digits)
  if (!/^[01]{1,10}$/.test(number)) return '#NUM!';

  // Ignore places and return a 10-character octal number if number is negative
  var stringified = number.toString();
  if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
    return (1073741312 + parseInt(stringified.substring(1), 2)).toString(8);
  }

  // Convert binary number to octal
  var result = parseInt(number, 2).toString(8);

  // Return octal number using the minimum number of characters necessary if places is undefined
  if (typeof places === 'undefined') {
    return result;
  } else {
    // Return error if places is nonnumeric
    if (isNaN(places)) return '#VALUE!';
    
    // Return error if places is negative
    if (places < 0) return '#NUM!';
    
    // Truncate places in case it is not an integer
    places = Math.floor(places);

    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
    return (places >= result.length) ? _s.repeat('0', places - result.length) + result : '#NUM!';
  }
}

function BITAND(number1, number2) {
  // Return error if either number is a non-numeric value
  if (isNaN(number1) || isNaN(number2)) return '#VALUE!';

  // Return error if either number is less than 0
  if (number1 < 0 || number2 < 0) return '#NUM!';

  // Return error if either number is a non-integer
  if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) return '#NUM!';
  
  // Return error if either number is greater than (2^48)-1
  if (number1 > 281474976710655 || number2 > 281474976710655) return '#NUM!';

  // Return bitwise AND of two numbers
  return number1 & number2;
}

function BITLSHIFT(number, shift) {
  // Return error if either number is a non-numeric value
  if (isNaN(number) || isNaN(shift)) return '#VALUE!';

  // Return error if number is less than 0
  if (number < 0) return '#NUM!';

  // Return error if number is a non-integer
  if (Math.floor(number) !== number) return '#NUM!';
  
  // Return error if number is greater than (2^48)-1
  if (number > 281474976710655) return '#NUM!';

  // Return error if the absolute value of shift is greater than 53
  if (Math.abs(shift) > 53) return '#NUM!';

  // Return number shifted by shift bits to the left or to the right if shift is negative
  return (shift >= 0 ) ? number << shift : number >> -shift;
}

function BITOR(number1, number2) {
  // Return error if either number is a non-numeric value
  if (isNaN(number1) || isNaN(number2)) return '#VALUE!';

  // Return error if either number is less than 0
  if (number1 < 0 || number2 < 0) return '#NUM!';

  // Return error if either number is a non-integer
  if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) return '#NUM!';
  
  // Return error if either number is greater than (2^48)-1
  if (number1 > 281474976710655 || number2 > 281474976710655) return '#NUM!';

  // Return bitwise OR of two numbers
  return number1 | number2;
}

function BITRSHIFT(number, shift) {
  // Return error if either number is a non-numeric value
  if (isNaN(number) || isNaN(shift)) return '#VALUE!';

  // Return error if number is less than 0
  if (number < 0) return '#NUM!';

  // Return error if number is a non-integer
  if (Math.floor(number) !== number) return '#NUM!';
  
  // Return error if number is greater than (2^48)-1
  if (number > 281474976710655) return '#NUM!';

  // Return error if the absolute value of shift is greater than 53
  if (Math.abs(shift) > 53) return '#NUM!';

  // Return number shifted by shift bits to the right or to the left if shift is negative
  return (shift >= 0 ) ? number >> shift : number << -shift;
}

function BITXOR(number1, number2) {
  // Return error if either number is a non-numeric value
  if (isNaN(number1) || isNaN(number2)) return '#VALUE!';

  // Return error if either number is less than 0
  if (number1 < 0 || number2 < 0) return '#NUM!';

  // Return error if either number is a non-integer
  if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) return '#NUM!';
  
  // Return error if either number is greater than (2^48)-1
  if (number1 > 281474976710655 || number2 > 281474976710655) return '#NUM!';

  // Return bitwise XOR of two numbers
  return number1 ^ number2;
}

function COMPLEX(real, imaginary, suffix) {
  // Return error if either number is a non-numeric value
  if (isNaN(real) || isNaN(imaginary)) return '#VALUE!';

  // Set suffix
  var suffix = (typeof suffix === 'undefined') ? 'i' : suffix;

  // Return error if suffix is neither "i" nor "j"
  if (suffix !== 'i' && suffix !== 'j') return '#VALUE!';

  // Return complex number
  if (real === 0 && imaginary === 0) {
    return 0;
  } else if (real === 0) {
    return (imaginary === 1) ? suffix : imaginary.toString() + suffix;
  } else if (imaginary === 0) {
    return real.toString();
  } else {
    var sign = (imaginary > 0) ? '+' : '';
    return real.toString() + sign + ((imaginary === 1) ? suffix : imaginary.toString() + suffix);
  }
}

function CONVERT(number, from_unit, to_unit) {
  // Return error if number is a non-numeric value
  if (isNaN(number)) return '#VALUE!';

  // List of units supported by CONVERT and units defined by the International System of Units
  // [Name, Symbol, Alternate symbols, Quantity, ISU, CONVERT, Conversion ratio]
  var units = [
    ["a.u. of action","ħ",null,"action",false,false,1.05457168181818e-34],
    ["a.u. of charge","e",null,"electric_charge",false,false,1.60217653141414e-19],
    ["a.u. of energy","Eh",null,"energy",false,false,4.35974417757576e-18],
    ["a.u. of length","a₀",null,"length",false,false,5.29177210818182e-11],
    ["a.u. of mass","mₑ",null,"mass",false,false,9.10938261616162e-31],
    ["a.u. of time","ħ/Eh",null,"time",false,false,2.41888432650516e-17],
    ["admiralty knot","admkn",null,"speed",false,true,0.514773333],
    ["ampere","A",null,"electric_current",true,false,1],
    ["ampere per meter","A/m",null,"magnetic_field_intensity",true,false,1],
    ["ångström","Å",["ang"],"length",false,true,1e-10],
    ["are","ar",null,"area",false,true,100],
    ["astronomical unit","ua",null,"length",false,false,1.49597870691667e-11],
    ["bar","bar",null,"pressure",false,false,100000],
    ["barn","b",null,"area",false,false,1e-28],
    ["becquerel","Bq",null,"radioactivity",true,false,1],
    ["bit","bit",["b"],"information",false,true,1],
    ["btu","BTU",["btu"],"energy",false,true,1055.05585262],
    ["byte","byte",null,"information",false,true,8],
    ["candela","cd",null,"luminous_intensity",true,false,1],
    ["candela per square metre","cd/m²",null,"luminance",true,false,1],
    ["coulomb","C",null,"electric_charge",true,false,1],
    ["cubic ångström","ang3",["ang^3"],"volume",false,true,1e-30],
    ["cubic foot","ft3",["ft^3"],"volume",false,true,0.028316846592],
    ["cubic inch","in3",["in^3"],"volume",false,true,0.000016387064],
    ["cubic light-year","ly3",["ly^3"],"volume",false,true,8.46786664623715e-47],
    ["cubic metre","m³",null,"volume",true,true,1],
    ["cubic mile","mi3",["mi^3"],"volume",false,true,4168181825.44058],
    ["cubic nautical mile","Nmi3",["Nmi^3"],"volume",false,true,6352182208],
    ["cubic Pica","Pica3",["Picapt3","Pica^3","Picapt^3"],"volume",false,true,7.58660370370369e-8],
    ["cubic yard","yd3",["yd^3"],"volume",false,true,0.764554857984],
    ["cup","cup",null,"volume",false,true,0.0002365882365],
    ["dalton","Da",["u"],"mass",false,false,1.66053886282828e-27],
    ["day","d",["day"],"time",false,true,86400],
    ["degree","°",null,"angle",false,false,0.0174532925199433],
    ["degrees Rankine","Rank",null,"temperature",false,true,0.555555555555556],
    ["dyne","dyn",["dy"],"force",false,true,0.00001],
    ["electronvolt","eV",["ev"],"energy",false,true,1.60217656514141],
    ["ell","ell",null,"length",false,true,1.143],
    ["erg","erg",["e"],"energy",false,true,1e-7],
    ["farad","F",null,"electric_capacitance",true,false,1],
    ["fluid ounce","oz",null,"volume",false,true,0.0000295735295625],
    ["foot","ft",null,"length",false,true,0.3048],
    ["foot-pound","flb",null,"energy",false,true,1.3558179483314],
    ["gal","Gal",null,"acceleration",false,false,0.01],
    ["gallon","gal",null,"volume",false,true,0.003785411784],
    ["gauss","G",["ga"],"magnetic_flux_density",false,true,1],
    ["grain","grain",null,"mass",false,true,0.0000647989],
    ["gram","g",null,"mass",false,true,0.001],
    ["gray","Gy",null,"absorbed_dose",true,false,1],
    ["gross registered ton","GRT",["regton"],"volume",false,true,2.8316846592],
    ["hectare","ha",null,"area",false,true,10000],
    ["henry","H",null,"inductance",true,false,1],
    ["hertz","Hz",null,"frequency",true,false,1],
    ["horsepower","HP",["h"],"power",false,true,745.69987158227],
    ["horsepower-hour","HPh",["hh","hph"],"energy",false,true,2684519.538],
    ["hour","h",["hr"],"time",false,true,3600],
    ["imperial gallon (U.K.)","uk_gal",null,"volume",false,true,0.00454609],
    ["imperial hundredweight","lcwt",["uk_cwt","hweight"],"mass",false,true,50.802345],
    ["imperial quart (U.K)","uk_qt",null,"volume",false,true,0.0011365225],
    ["imperial ton","brton",["uk_ton","LTON"],"mass",false,true,1016.046909],
    ["inch","in",null,"length",false,true,0.0254],
    ["international acre","uk_acre",null,"area",false,true,4046.8564224],
    ["IT calorie","cal",null,"energy",false,true,4.1868],
    ["joule","J",null,"energy",true,true,1],
    ["katal","kat",null,"catalytic_activity",true,false,1],
    ["kelvin","K",["kel"],"temperature",true,true,1],
    ["kilogram","kg",null,"mass",true,true,1],
    ["knot","kn",null,"speed",false,true,0.514444444444444],
    ["light-year","ly",null,"length",false,true,9460730472580800],
    ["litre","L",["l","lt"],"volume",false,true,0.001],
    ["lumen","lm",null,"luminous_flux",true,false,1],
    ["lux","lx",null,"illuminance",true,false,1],
    ["maxwell","Mx",null,"magnetic_flux",false,false,1e-18],
    ["measurement ton","MTON",null,"volume",false,true,1.13267386368],
    ["meter per hour","m/h",["m/hr"],"speed",false,true,0.00027777777777778],
    ["meter per second","m/s",["m/sec"],"speed",true,true,1],
    ["meter per second squared","m⋅s⁻²",null,"acceleration",true,false,1],
    ["parsec","pc",["parsec"],"length",false,true,30856775814671900],
    ["meter squared per second","m²/s",null,"kinematic_viscosity",true,false,1],
    ["metre","m",null,"length",true,true,1],
    ["miles per hour","mph",null,"speed",false,true,0.44704],
    ["millimetre of mercury","mmHg",null,"pressure",false,false,133.322],
    ["minute","′",null,"angle",false,false,0.000290888208665722],
    ["minute","min",["mn"],"time",false,true,60],
    ["modern teaspoon","tspm",null,"volume",false,true,0.000005],
    ["mole","mol",null,"amount_of_substance",true,false,1],
    ["morgen","Morgen",null,"area",false,true,2500],
    ["n.u. of action","ħ",null,"action",false,false,1.05457168181818e-34],
    ["n.u. of mass","mₑ",null,"mass",false,false,9.10938261616162e-31],
    ["n.u. of speed","c₀",null,"speed",false,false,299792458],
    ["n.u. of time","ħ/(me⋅c₀²)",null,"time",false,false,1.28808866778687e-21],
    ["nautical mile","M",["Nmi"],"length",false,true,1852],
    ["newton","N",null,"force",true,true,1],
    ["œrsted","Oe ",null,"magnetic_field_intensity",false,false,79.5774715459477],
    ["ohm","Ω",null,"electric_resistance",true,false,1],
    ["ounce mass","ozm",null,"mass",false,true,0.028349523125],
    ["pascal","Pa",null,"pressure",true,false,1],
    ["pascal second","Pa⋅s",null,"dynamic_viscosity",true,false,1],
    ["pferdestärke","PS",null,"power",false,true,735.49875],
    ["phot","ph",null,"illuminance",false,false,0.0001],
    ["pica (1/6 inch)","pica",null,"length",false,true,0.00035277777777778],
    ["pica (1/72 inch)","Pica",["Picapt"],"length",false,true,0.00423333333333333],
    ["poise","P",null,"dynamic_viscosity",false,false,0.1],
    ["pond","pond",null,"force",false,true,0.00980665],
    ["pound force","lbf",null,"force",false,true,4.4482216152605],
    ["pound mass","lbm",null,"mass",false,true,0.45359237],
    ["quart","qt",null,"volume",false,true,0.000946352946],
    ["radian","rad",null,"angle",true,false,1],
    ["second","″",null,"angle",false,false,0.00000484813681109536],
    ["second","s",["sec"],"time",true,true,1],
    ["short hundredweight","cwt",["shweight"],"mass",false,true,45.359237],
    ["siemens","S",null,"electrical_conductance",true,false,1],
    ["sievert","Sv",null,"equivalent_dose",true,false,1],
    ["slug","sg",null,"mass",false,true,14.59390294],
    ["square ångström","ang2",["ang^2"],"area",false,true,1e-20],
    ["square foot","ft2",["ft^2"],"area",false,true,0.09290304],
    ["square inch","in2",["in^2"],"area",false,true,0.00064516],
    ["square light-year","ly2",["ly^2"],"area",false,true,8.95054210748189e+31],
    ["square meter","m²",null,"area",true,true,1],
    ["square mile","mi2",["mi^2"],"area",false,true,2589988.110336],
    ["square nautical mile","Nmi2",["Nmi^2"],"area",false,true,3429904],
    ["square Pica","Pica2",["Picapt2","Pica^2","Picapt^2"],"area",false,true,0.00001792111111111],
    ["square yard","yd2",["yd^2"],"area",false,true,0.83612736],
    ["statute mile","mi",null,"length",false,true,1609.344],
    ["steradian","sr",null,"solid_angle",true,false,1],
    ["stilb","sb",null,"luminance",false,false,0.0001],
    ["stokes","St",null,"kinematic_viscosity",false,false,0.0001],
    ["stone","stone",null,"mass",false,true,6.35029318],
    ["tablespoon","tbs",null,"volume",false,true,0.0000147868],
    ["teaspoon","tsp",null,"volume",false,true,0.00000492892],
    ["tesla","T",null,"magnetic_flux_density",true,true,1],
    ["thermodynamic calorie","c",null,"energy",false,true,4.184],
    ["ton","ton",null,"mass",false,true,907.18474],
    ["tonne","t",null,"mass",false,false,1000],
    ["U.K. pint","uk_pt",null,"volume",false,true,0.00056826125],
    ["U.S. bushel","bushel",null,"volume",false,true,0.03523907],
    ["U.S. oil barrel","barrel",null,"volume",false,true,0.158987295],
    ["U.S. pint","pt",["us_pt"],"volume",false,true,0.000473176473],
    ["U.S. survey mile","survey_mi",null,"length",false,true,1609.347219],
    ["U.S. survey/statute acre","us_acre",null,"area",false,true,4046.87261],
    ["volt","V",null,"voltage",true,false,1],
    ["watt","W",null,"power",true,true,1],
    ["watt-hour","Wh",["wh"],"energy",false,true,3600],
    ["weber","Wb",null,"magnetic_flux",true,false,1],
    ["yard","yd",null,"length",false,true,0.9144],
    ["year","yr",null,"time",false,true,31557600]];

  // Binary prefixes
  // [Name, Prefix power of 2 value, Previx value, Abbreviation, Derived from]
  var binary_prefixes = {
    Yi: ["yobi",80,1208925819614629174706176,"Yi","yotta"],
    Zi: ["zebi",70,1180591620717411303424,"Zi","zetta"],
    Ei: ["exbi",60,1152921504606846976,"Ei","exa"],
    Pi: ["pebi",50,1125899906842624,"Pi","peta"],
    Ti: ["tebi",40,1099511627776,"Ti","tera"],
    Gi: ["gibi",30,1073741824,"Gi","giga"],
    Mi: ["mebi",20,1048576,"Mi","mega"],
    ki: ["kibi",10,1024,"ki","kilo"]
  };

  // Unit prefixes
  // [Name, Multiplier, Abbreviation]
  var unit_prefixes = {
    Y: ["yotta",1e+24,"Y"],
    Z: ["zetta",1e+21,"Z"],
    E: ["exa",1e+18,"E"],
    P: ["peta",1e+15,"P"],
    T: ["tera",1e+12,"T"],
    G: ["giga",1e+09,"G"],
    M: ["mega",1e+06,"M"],
    k: ["kilo",1e+03,"k"],
    h: ["hecto",1e+02,"h"],
    e: ["dekao",1e+01,"e"],
    d: ["deci",1e-01,"d"],
    c: ["centi",1e-02,"c"],
    m: ["milli",1e-03,"m"],
    u: ["micro",1e-06,"u"],
    n: ["nano",1e-09,"n"],
    p: ["pico",1e-12,"p"],
    f: ["femto",1e-15,"f"],
    a: ["atto",1e-18,"a"],
    z: ["zepto",1e-21,"z"],
    y: ["yocto",1e-24,"y"]
  };
    
  // Initialize units and multipliers
  var from = null;
  var to = null;
  var base_from_unit = from_unit;
  var base_to_unit = to_unit;
  var from_multiplier = 1;
  var to_multiplier = 1;

  // Lookup from and to units
  for (var i = 0; i < units.length; i++) {
    var alt = (units[i][2] === null) ? [] : units[i][2];
    if (units[i][1] === base_from_unit || alt.indexOf(base_from_unit) >= 0) {
      from = units[i];
    }
    if (units[i][1] === base_to_unit || alt.indexOf(base_to_unit) >= 0) {
      to = units[i];
    }
  }
  
  // Lookup from prefix
  if (from === null) {
    var from_binary_prefix = binary_prefixes[from_unit.substring(0, 2)];
    var from_unit_prefix = unit_prefixes[from_unit.substring(0, 1)];

    // Handle dekao unit prefix (only unit prefix with two characters)
    if (from_unit.substring(0, 2) === 'da') {
      from_unit_prefix = ["dekao",1e+01,"da"];
    }

    // Handle binary prefixes first (so that 'Yi' is processed before 'Y')
    if (from_binary_prefix) {
      from_multiplier = from_binary_prefix[2];
      base_from_unit = from_unit.substring(2);
    } else if (from_unit_prefix) {
      from_multiplier = from_unit_prefix[1];
      base_from_unit = from_unit.substring(from_unit_prefix[2].length);    
    }

    // Lookup from unit
    for (var j = 0; j < units.length; j++) {
      var alt = (units[j][2] === null) ? [] : units[j][2];
      if (units[j][1] === base_from_unit || alt.indexOf(base_from_unit) >= 0) {
        from = units[j];
      }
    }
  }

  // Lookup to prefix
  if (to === null) {
    var to_binary_prefix = binary_prefixes[to_unit.substring(0, 2)];
    var to_unit_prefix = unit_prefixes[to_unit.substring(0, 1)];

    // Handle dekao unit prefix (only unit prefix with two characters)
    if (to_unit.substring(0, 2) === 'da') {
      to_unit_prefix = ["dekao",1e+01,"da"];
    }

    // Handle binary prefixes first (so that 'Yi' is processed before 'Y')
    if (to_binary_prefix) {
      to_multiplier = to_binary_prefix[2];
      base_to_unit = to_unit.substring(2);
    } else if (to_unit_prefix) {
      to_multiplier = to_unit_prefix[1];
      base_to_unit = to_unit.substring(to_unit_prefix[2].length);    
    }

    // Lookup to unit
    for (var k = 0; k < units.length; k++) {
      var alt = (units[k][2] === null) ? [] : units[k][2];
      if (units[k][1] === base_to_unit || alt.indexOf(base_to_unit) >= 0) {
        to = units[k];
      }
    }
  }
  
  // Return error if a unit does not exist
  if (from === null || to === null) return '#N/A';
  
  // Return error if units represent different quantities
  if (from[3] !== to[3]) return '#N/A';
  
  // Return converted number
  return number * from[6] * from_multiplier / (to[6] * to_multiplier);
}

function DEC2BIN(number, places) {
  // Return error if number is not a number
  if (isNaN(number)) return '#VALUE!';
  
  // Return error if number is not decimal, is lower than -512, or is greater than 511
  if (!/^-?[0-9]{1,3}$/.test(number) || number < -512 || number > 511) return '#NUM!';
  
  // Ignore places and return a 10-character binary number if number is negative
  if (number < 0) {
    return '1' + _s.repeat('0', 9 - (512 + number).toString(2).length) + (512 + number).toString(2);
  }

  // Convert decimal number to binary
  var result = parseInt(number, 10).toString(2);

  // Return binary number using the minimum number of characters necessary if places is undefined
  if (typeof places === 'undefined') {
    return result;
  } else {
    // Return error if places is nonnumeric
    if (isNaN(places)) return '#VALUE!';
    
    // Return error if places is negative
    if (places < 0) return '#NUM!';
    
    // Truncate places in case it is not an integer
    places = Math.floor(places);

    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
    return (places >= result.length) ? _s.repeat('0', places - result.length) + result : '#NUM!';
  }
}

function DEC2HEX(number, places) {
  // Return error if number is not a number
  if (isNaN(number)) return '#VALUE!';
  
  // Return error if number is not decimal, is lower than -549755813888, or is greater than 549755813887
  if (!/^-?[0-9]{1,12}$/.test(number) || number < -549755813888 || number > 549755813887) return '#NUM!';
  
  // Ignore places and return a 10-character hexadecimal number if number is negative
  if (number < 0) {
    return (1099511627776 + number).toString(16);
  }

  // Convert decimal number to hexadecimal
  var result = parseInt(number, 10).toString(16);

  // Return hexadecimal number using the minimum number of characters necessary if places is undefined
  if (typeof places === 'undefined') {
    return result;
  } else {
    // Return error if places is nonnumeric
    if (isNaN(places)) return '#VALUE!';
    
    // Return error if places is negative
    if (places < 0) return '#NUM!';
    
    // Truncate places in case it is not an integer
    places = Math.floor(places);

    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
    return (places >= result.length) ? _s.repeat('0', places - result.length) + result : '#NUM!';
  }
}

function DEC2OCT(number, places) {
  // Return error if number is not a number
  if (isNaN(number)) return '#VALUE!';
  
  // Return error if number is not decimal, is lower than -549755813888, or is greater than 549755813887
  if (!/^-?[0-9]{1,9}$/.test(number) || number < -536870912 || number > 536870911) return '#NUM!';
  
  // Ignore places and return a 10-character octal number if number is negative
  if (number < 0) {
    return (1073741824 + number).toString(8);
  }

  // Convert decimal number to octal
  var result = parseInt(number, 10).toString(8);

  // Return octal number using the minimum number of characters necessary if places is undefined
  if (typeof places === 'undefined') {
    return result;
  } else {
    // Return error if places is nonnumeric
    if (isNaN(places)) return '#VALUE!';
    
    // Return error if places is negative
    if (places < 0) return '#NUM!';
    
    // Truncate places in case it is not an integer
    places = Math.floor(places);

    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
    return (places >= result.length) ? _s.repeat('0', places - result.length) + result : '#NUM!';
  }
}

function DELTA(number1, number2) {
  // Set number2 to zero if undefined
  number2 = (typeof number2 === 'undefined') ? 0 : number2;

  // Return error if either number is not a number
  if (isNaN(number1) || isNaN(number2)) return '#VALUE!';

  // Return delta
  return (number1 === number2) ? 1 : 0;
}

function ERF(lower_bound, upper_bound) {
  // Set number2 to zero if undefined
  upper_bound = (typeof upper_bound === 'undefined') ? 0 : upper_bound;

  // Return error if either number is not a number
  if (isNaN(lower_bound) || isNaN(upper_bound)) return '#VALUE!';
  
  // Return ERFC using jStat [http://www.jstat.org/]
  return jStat.erf(lower_bound);
}

function ERFC(x) {
  // Return error if x is not a number
  if (isNaN(x)) return '#VALUE!';
  
  // Return ERFC using jStat [http://www.jstat.org/]
  return jStat.erfc(x);
}

function ERFCPRECISE() {
  return;
}

function ERFPRECISE() {
  return;
}

function GESTEP(number, step) {
  // Set step to zero if undefined
  step = (typeof step === 'undefined') ? 0 : step;

  // Return error if either number is not a number
  if (isNaN(number) || isNaN(step)) return '#VALUE!';

  // Return delta
  return (number >= step) ? 1 : 0;
}

function HEX2BIN(number, places) {  
  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
  if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) return '#NUM!';

  // Check if number is negative
  var negative = (number.length === 10 && number.substring(0, 1).toLowerCase() === 'f') ? true : false;
  
  // Convert hexadecimal number to decimal
  var decimal = (negative) ? parseInt(number, 16) - 1099511627776 : parseInt(number, 16);

  // Return error if number is lower than -512 or greater than 511
  if (decimal < -512 || decimal > 511) return '#NUM!';

  // Ignore places and return a 10-character binary number if number is negative
  if (negative) return '1' + _s.repeat('0', 9 - (512 + decimal).toString(2).length) + (512 + decimal).toString(2);

  // Convert decimal number to binary
  var result = decimal.toString(2);

  // Return binary number using the minimum number of characters necessary if places is undefined
  if (typeof places === 'undefined') {
    return result;
  } else {
    // Return error if places is nonnumeric
    if (isNaN(places)) return '#VALUE!';
    
    // Return error if places is negative
    if (places < 0) return '#NUM!';
    
    // Truncate places in case it is not an integer
    places = Math.floor(places);

    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
    return (places >= result.length) ? _s.repeat('0', places - result.length) + result : '#NUM!';
  }
}

function HEX2DEC(number) {
  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
  if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) return '#NUM!';

  // Convert hexadecimal number to decimal
  var decimal = parseInt(number, 16);

  // Return decimal number
  return (decimal >= 549755813888) ? decimal - 1099511627776 : decimal;
}

function HEX2OCT(number, places) {
  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
  if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) return '#NUM!';

  // Convert hexadecimal number to decimal
  var decimal = parseInt(number, 16);

  // Return error if number is positive and greater than 0x1fffffff (536870911)
  if (decimal > 536870911 && decimal < 1098974756864) return '#NUM!';
  
  // Ignore places and return a 10-character octal number if number is negative
  if (decimal >= 1098974756864) return (decimal - 1098437885952).toString(8);

  // Convert decimal number to octal
  var result = decimal.toString(8);

  // Return octal number using the minimum number of characters necessary if places is undefined
  if (typeof places === 'undefined') {
    return result;
  } else {
    // Return error if places is nonnumeric
    if (isNaN(places)) return '#VALUE!';
    
    // Return error if places is negative
    if (places < 0) return '#NUM!';
    
    // Truncate places in case it is not an integer
    places = Math.floor(places);

    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
    return (places >= result.length) ? _s.repeat('0', places - result.length) + result : '#NUM!';
  }
}

function IMABS(inumber) {
  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  var x = IMREAL(inumber);
  var y = IMAGINARY(inumber);
  
  // Return error if either coefficient is not a number
  if (x === '#NUM!' || y === '#NUM!') return '#NUM!';
  
  // Return absolute value of complex number
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function IMAGINARY(inumber) {
  // Return 0 if inumber is equal to 0
  if (inumber === 0 || inumber === '0') return 0;

  // Handle special cases
  if (['i', 'j'].indexOf(inumber) >= 0) return 1;
  
  // Normalize imaginary coefficient
  inumber = inumber.replace('+i', '+1i').replace('-i', '-1i').replace('+j', '+1j').replace('-j', '-1j');
  
  // Lookup sign
  var plus = inumber.indexOf('+');
  var minus = inumber.indexOf('-');
  if (plus === 0) plus = inumber.indexOf('+', 1);
  if (minus === 0) minus = inumber.indexOf('-', 1);
  
  // Lookup imaginary unit
  var last = inumber.substring(inumber.length - 1, inumber.length);
  var unit = (last === 'i' || last === 'j')
  
  if (plus >= 0 || minus >= 0) {
    // Return error if imaginary unit is neither i nor j
    if (!unit) return '#NUM!';

    // Return imaginary coefficient of complex number
    if (plus >= 0) {
      return (isNaN(inumber.substring(0, plus)) || isNaN(inumber.substring(plus + 1, inumber.length - 1))) ?
        '#NUM!' :
        Number(inumber.substring(plus + 1, inumber.length - 1));
    } else {
      return (isNaN(inumber.substring(0, minus)) || isNaN(inumber.substring(minus + 1, inumber.length - 1))) ?
        '#NUM!' :
        -Number(inumber.substring(minus + 1, inumber.length - 1));
    }
  } else {
    if (unit) {
      return (isNaN(inumber.substring(0, inumber.length - 1))) ? '#NUM!' : inumber.substring(0, inumber.length - 1);
    } else {
      return (isNaN(inumber)) ? '#NUM!' : 0;
    }
  }
}

function IMARGUMENT(inumber) {
  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  var x = IMREAL(inumber);
  var y = IMAGINARY(inumber);

  // Return error if either coefficient is not a number
  if (x === '#NUM!' || y === '#NUM!') return '#NUM!';

  // Return error if inumber is equal to zero
  if (x === 0 && y === 0) return '#DIV/0!';
  
  // Return PI/2 if x is equal to zero and y is positive
  if (x === 0 && y > 0) return Math.PI / 2;

  // Return -PI/2 if x is equal to zero and y is negative
  if (x === 0 && y < 0) return -Math.PI / 2;

  // Return zero if x is negative and y is equal to zero
  if (y === 0 && x > 0) return 0;

  // Return zero if x is negative and y is equal to zero
  if (y === 0 && x < 0) return -Math.PI;
  
  // Return argument of complex number
  if (x > 0) {
    return Math.atan(y / x);
  } else if (x < 0 && y >= 0) {
    return Math.atan(y / x) + Math.PI;
  } else {
    return Math.atan(y / x) - Math.PI;
  }
}

function IMCONJUGATE(inumber) {
  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  var x = IMREAL(inumber);
  var y = IMAGINARY(inumber);
  
  // Lookup imaginary unit
  var unit = inumber.substring(inumber.length - 1);
  unit = (unit === 'i' || unit === 'j') ? unit : 'i';
  
  // Return error if either coefficient is not a number
  if (x === '#NUM!' || y === '#NUM!') return '#NUM!';
  
  // Return conjugate of complex number
  return (y !== 0) ? COMPLEX(x, -y, unit) : inumber;
}

function IMCOS(inumber) {
  // Return error if inumber is a logical value
  if (inumber === true || inumber === false) return '#VALUE!';

  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  var x = IMREAL(inumber);
  var y = IMAGINARY(inumber);
  
  // Lookup imaginary unit
  var unit = inumber.substring(inumber.length - 1);
  unit = (unit === 'i' || unit === 'j') ? unit : 'i';
  
  // Return error if either coefficient is not a number
  if (x === '#NUM!' || y === '#NUM!') return '#NUM!';

  // Return cosine of complex number
  return COMPLEX(Math.cos(x) * (Math.exp(y) + Math.exp(-y)) / 2, - Math.sin(x) * (Math.exp(y) - Math.exp(-y)) / 2, unit);
}

function IMCOSH(inumber) {
  // Return error if inumber is a logical value
  if (inumber === true || inumber === false) return '#VALUE!';

  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  var x = IMREAL(inumber);
  var y = IMAGINARY(inumber);
  
  // Lookup imaginary unit
  var unit = inumber.substring(inumber.length - 1);
  unit = (unit === 'i' || unit === 'j') ? unit : 'i'; 
   
  // Return error if either coefficient is not a number
  if (x === '#NUM!' || y === '#NUM!') return '#NUM!';

  // Return hyperbolic cosine of complex number
  return COMPLEX(Math.cos(y) * (Math.exp(x) + Math.exp(-x)) / 2, Math.sin(y) * (Math.exp(x) - Math.exp(-x)) / 2, unit);
}

function IMCOT(inumber) {
  // Return error if inumber is a logical value
  if (inumber === true || inumber === false) return '#VALUE!';

  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  var x = IMREAL(inumber);
  var y = IMAGINARY(inumber);
  
  // Return error if either coefficient is not a number
  if (x === '#NUM!' || y === '#NUM!') return '#NUM!';

  // Return cotangent of complex number
  return IMDIV(IMCOS(inumber), IMSIN(inumber));
}

function IMCSC(inumber) {
  // Return error if inumber is a logical value
  if (inumber === true || inumber === false) return '#VALUE!';

  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  var x = IMREAL(inumber);
  var y = IMAGINARY(inumber);
  
  // Return error if either coefficient is not a number
  if (x === '#NUM!' || y === '#NUM!') return '#NUM!';

  // Return cosecant of complex number
  return IMDIV('1', IMSIN(inumber));
}

function IMCSCH(inumber) {
  // Return error if inumber is a logical value
  if (inumber === true || inumber === false) return '#VALUE!';

  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  var x = IMREAL(inumber);
  var y = IMAGINARY(inumber);
  
  // Return error if either coefficient is not a number
  if (x === '#NUM!' || y === '#NUM!') return '#NUM!';

  // Return hyperbolic cosecant of complex number
  return IMDIV('1', IMSINH(inumber));
}

function IMDIV(inumber1, inumber2) {
  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  var a = IMREAL(inumber1);
  var b = IMAGINARY(inumber1);
  var c = IMREAL(inumber2);
  var d = IMAGINARY(inumber2);
  
  // Lookup imaginary unit
  var unit1 = inumber1.substring(inumber1.length - 1);
  var unit2 = inumber1.substring(inumber1.length - 1);
  var unit = 'i';
  if (unit1 === 'j') {
    unit = 'j';
  } else if (unit2 === 'j') {
    unit = 'j';
  }

  // Return error if either coefficient is not a number
  if (a === '#NUM!' || b === '#NUM!' || c === '#NUM!' || d === '#NUM!') return '#NUM!';

  // Return error if inumber2 is null
  if (c === 0 && d === 0) return '#NUM!';

  // Return exponential of complex number
  var den = c * c + d * d;
  return COMPLEX((a * c + b * d) / den, (b * c - a * d) / den, unit);
}

function IMEXP(inumber) {
  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  var x = IMREAL(inumber);
  var y = IMAGINARY(inumber);
  
  // Lookup imaginary unit
  var unit = inumber.substring(inumber.length - 1);
  unit = (unit === 'i' || unit === 'j') ? unit : 'i'; 
  
  // Return error if either coefficient is not a number
  if (x === '#NUM!' || y === '#NUM!') return '#NUM!';

  // Return exponential of complex number
  var e = Math.exp(x);
  return COMPLEX(e * Math.cos(y), e * Math.sin(y), unit);
}

function IMLN(inumber) {
  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  var x = IMREAL(inumber);
  var y = IMAGINARY(inumber);
  
  // Lookup imaginary unit
  var unit = inumber.substring(inumber.length - 1);
  unit = (unit === 'i' || unit === 'j') ? unit : 'i'; 
  
  // Return error if either coefficient is not a number
  if (x === '#NUM!' || y === '#NUM!') return '#NUM!';

  // Return exponential of complex number
  return COMPLEX(Math.log(Math.sqrt(x * x + y * y)), Math.atan(y / x), unit);
}

function IMLOG10(inumber) {
  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  var x = IMREAL(inumber);
  var y = IMAGINARY(inumber);
  
  // Lookup imaginary unit
  var unit = inumber.substring(inumber.length - 1);
  unit = (unit === 'i' || unit === 'j') ? unit : 'i';
  
  // Return error if either coefficient is not a number
  if (x === '#NUM!' || y === '#NUM!') return '#NUM!';

  // Return exponential of complex number
  return COMPLEX(Math.log(Math.sqrt(x * x + y * y)) / Math.log(10), Math.atan(y / x) / Math.log(10), unit);
}

function IMLOG2(inumber) {
  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  var x = IMREAL(inumber);
  var y = IMAGINARY(inumber);
  
  // Lookup imaginary unit
  var unit = inumber.substring(inumber.length - 1);
  unit = (unit === 'i' || unit === 'j') ? unit : 'i';
  
  // Return error if either coefficient is not a number
  if (x === '#NUM!' || y === '#NUM!') return '#NUM!';

  // Return exponential of complex number
  return COMPLEX(Math.log(Math.sqrt(x * x + y * y)) / Math.log(2), Math.atan(y / x) / Math.log(2), unit);
}

function IMPOWER(inumber, number) {
  // Return error if number is nonnumeric
  if (isNaN(number)) return '#VALUE!';

  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  var x = IMREAL(inumber);
  var y = IMAGINARY(inumber);
  
  // Lookup imaginary unit
  var unit = inumber.substring(inumber.length - 1);
  unit = (unit === 'i' || unit === 'j') ? unit : 'i';
  
  // Return error if either coefficient is not a number
  if (x === '#NUM!' || y === '#NUM!') return '#NUM!';

  // Calculate power of modulus
  var p = Math.pow(IMABS(inumber), number);
  
  // Calculate argument
  var t = IMARGUMENT(inumber);

  // Return exponential of complex number
  return COMPLEX(p * Math.cos(number * t), p * Math.sin(number * t), unit);
}

function IMPRODUCT() {
  // Initialize result
  var result = arguments[0];
  
  // Loop on all numbers
  for (var i = 1; i < arguments.length; i++) {
    // Lookup coefficients of two complex numbers
    var a = IMREAL(result);
    var b = IMAGINARY(result);
    var c = IMREAL(arguments[i]);
    var d = IMAGINARY(arguments[i]);

    // Return error if either coefficient is not a number
    if (a === '#NUM!' || b === '#NUM!' || c === '#NUM!' || d === '#NUM!') return '#NUM!';
    
    // Complute product of two complex numbers
    result = COMPLEX(a * c - b * d, a * d + b * c);
  }
  
  // Return product of complex numbers
  return result;
}

function IMREAL(inumber) {
  // Return 0 if inumber is equal to 0
  if (inumber === 0 || inumber === '0') return 0;

  // Handle special cases
  if (['i', '+i', '1i', '+1i', '-i', '-1i', 'j', '+j', '1j', '+1j', '-j', '-1j'].indexOf(inumber) >= 0) return 0;

  // Lookup sign
  var plus = inumber.indexOf('+');
  var minus = inumber.indexOf('-');
  if (plus === 0) plus = inumber.indexOf('+', 1);
  if (minus === 0) minus = inumber.indexOf('-', 1);
  
  // Lookup imaginary unit
  var last = inumber.substring(inumber.length - 1, inumber.length);
  var unit = (last === 'i' || last === 'j')
  
  if (plus >= 0 || minus >= 0) {
    // Return error if imaginary unit is neither i nor j
    if (!unit) return '#NUM!';

    // Return real coefficient of complex number
    if (plus >= 0) {
      return (isNaN(inumber.substring(0, plus)) || isNaN(inumber.substring(plus + 1, inumber.length - 1))) ?
        '#NUM!' :
        Number(inumber.substring(0, plus));
    } else {
      return (isNaN(inumber.substring(0, minus)) || isNaN(inumber.substring(minus + 1, inumber.length - 1))) ?
        '#NUM!' :
        Number(inumber.substring(0, minus));
    }
  } else {
    if (unit) {
      return (isNaN(inumber.substring(0, inumber.length - 1))) ? '#NUM!' : 0;
    } else {
      return (isNaN(inumber)) ? '#NUM!' : inumber;
    }
  }
}

function IMSEC(inumber) {
  // Return error if inumber is a logical value
  if (inumber === true || inumber === false) return '#VALUE!';

  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  var x = IMREAL(inumber);
  var y = IMAGINARY(inumber);
  
  // Return error if either coefficient is not a number
  if (x === '#NUM!' || y === '#NUM!') return '#NUM!';

  // Return secant of complex number
  return IMDIV('1', IMCOS(inumber));
}

function IMSECH(inumber) {
  // Return error if inumber is a logical value
  if (inumber === true || inumber === false) return '#VALUE!';

  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  var x = IMREAL(inumber);
  var y = IMAGINARY(inumber);
  
  // Return error if either coefficient is not a number
  if (x === '#NUM!' || y === '#NUM!') return '#NUM!';

  // Return hyperbolic secant of complex number
  return IMDIV('1', IMCOSH(inumber));
}

function IMSIN(inumber) {
  // Return error if inumber is a logical value
  if (inumber === true || inumber === false) return '#VALUE!';

  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  var x = IMREAL(inumber);
  var y = IMAGINARY(inumber);
  
  // Lookup imaginary unit
  var unit = inumber.substring(inumber.length - 1);
  unit = (unit === 'i' || unit === 'j') ? unit : 'i';
  
  // Return error if either coefficient is not a number
  if (x === '#NUM!' || y === '#NUM!') return '#NUM!';

  // Return sine of complex number
  return COMPLEX(Math.sin(x) * (Math.exp(y) + Math.exp(-y)) / 2, Math.cos(x) * (Math.exp(y) - Math.exp(-y)) / 2, unit);
}

function IMSINH(inumber) {
  // Return error if inumber is a logical value
  if (inumber === true || inumber === false) return '#VALUE!';

  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  var x = IMREAL(inumber);
  var y = IMAGINARY(inumber);
  
  // Lookup imaginary unit
  var unit = inumber.substring(inumber.length - 1);
  unit = (unit === 'i' || unit === 'j') ? unit : 'i';
  
  // Return error if either coefficient is not a number
  if (x === '#NUM!' || y === '#NUM!') return '#NUM!';

  // Return hyperbolic sine of complex number
  return COMPLEX(Math.cos(y) * (Math.exp(x) - Math.exp(-x)) / 2, Math.sin(y) * (Math.exp(x) + Math.exp(-x)) / 2, unit);
}

function IMSQRT(inumber) {
  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  var x = IMREAL(inumber);
  var y = IMAGINARY(inumber);
  
  // Lookup imaginary unit
  var unit = inumber.substring(inumber.length - 1);
  unit = (unit === 'i' || unit === 'j') ? unit : 'i';
  
  // Return error if either coefficient is not a number
  if (x === '#NUM!' || y === '#NUM!') return '#NUM!';

  // Calculate power of modulus
  var s = Math.sqrt(IMABS(inumber));
  
  // Calculate argument
  var t = IMARGUMENT(inumber);

  // Return exponential of complex number
  return COMPLEX(s * Math.cos(t / 2), s * Math.sin(t / 2), unit);
}

function IMSUB(inumber1, inumber2) {
  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  var a = IMREAL(inumber1);
  var b = IMAGINARY(inumber1);
  var c = IMREAL(inumber2);
  var d = IMAGINARY(inumber2);
  
  // Lookup imaginary unit
  var unit1 = inumber1.substring(inumber1.length - 1);
  var unit2 = inumber1.substring(inumber1.length - 1);
  var unit = 'i';
  if (unit1 === 'j') {
    unit = 'j';
  } else if (unit2 === 'j') {
    unit = 'j';
  }

  // Return error if either coefficient is not a number
  if (a === '#NUM!' || b === '#NUM!' || c === '#NUM!' || d === '#NUM!') return '#NUM!';

  // Return difference of two complex numbers
  return COMPLEX(a - c, b - d, unit);
}

function IMSUM() {
  // Initialize result
  var result = arguments[0];
  
  // Loop on all numbers
  for (var i = 1; i < arguments.length; i++) {
    // Lookup coefficients of two complex numbers
    var a = IMREAL(result);
    var b = IMAGINARY(result);
    var c = IMREAL(arguments[i]);
    var d = IMAGINARY(arguments[i]);

    // Return error if either coefficient is not a number
    if (a === '#NUM!' || b === '#NUM!' || c === '#NUM!' || d === '#NUM!') return '#NUM!';
    
    // Complute product of two complex numbers
    result = COMPLEX(a + c, b + d);
  }
  
  // Return sum of complex numbers
  return result;
}

function IMTAN(inumber) {
  // Return error if inumber is a logical value
  if (inumber === true || inumber === false) return '#VALUE!';

  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  var x = IMREAL(inumber);
  var y = IMAGINARY(inumber);
  
  // Return error if either coefficient is not a number
  if (x === '#NUM!' || y === '#NUM!') return '#NUM!';

  // Return tangent of complex number
  return IMDIV(IMSIN(inumber), IMCOS(inumber));
}

function OCT2BIN(number, places) {
  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
  if (!/^[0-7]{1,10}$/.test(number)) return '#NUM!';

  // Check if number is negative
  var negative = (number.length === 10 && number.substring(0, 1) === '7') ? true : false;
  
  // Convert octal number to decimal
  var decimal = (negative) ? parseInt(number, 8) - 1073741824 : parseInt(number, 8);

  // Return error if number is lower than -512 or greater than 511
  if (decimal < -512 || decimal > 511) return '#NUM!';

  // Ignore places and return a 10-character binary number if number is negative
  if (negative) return '1' + _s.repeat('0', 9 - (512 + decimal).toString(2).length) + (512 + decimal).toString(2);

  // Convert decimal number to binary
  var result = decimal.toString(2);

  // Return binary number using the minimum number of characters necessary if places is undefined
  if (typeof places === 'undefined') {
    return result;
  } else {
    // Return error if places is nonnumeric
    if (isNaN(places)) return '#VALUE!';
    
    // Return error if places is negative
    if (places < 0) return '#NUM!';
    
    // Truncate places in case it is not an integer
    places = Math.floor(places);

    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
    return (places >= result.length) ? _s.repeat('0', places - result.length) + result : '#NUM!';
  }
}

function OCT2DEC(number) {
  // Return error if number is not octal or contains more than ten characters (10 digits)
  if (!/^[0-7]{1,10}$/.test(number)) return '#NUM!';
 
  // Convert octal number to decimal
  var decimal = parseInt(number, 8);
 
  // Return decimal number
  return (decimal >= 536870912) ? decimal - 1073741824 : decimal;
}

function OCT2HEX(number, places) {
  // Return error if number is not octal or contains more than ten characters (10 digits)
  if (!/^[0-7]{1,10}$/.test(number)) return '#NUM!';

  // Convert octal number to decimal
  var decimal = parseInt(number, 8);
  
  // Ignore places and return a 10-character octal number if number is negative
  if (decimal >= 536870912) return 'ff' + (decimal + 3221225472).toString(16);

  // Convert decimal number to hexadecimal
  var result = decimal.toString(16);

  // Return hexadecimal number using the minimum number of characters necessary if places is undefined
  if (typeof places === 'undefined') {
    return result;
  } else {
    // Return error if places is nonnumeric
    if (isNaN(places)) return '#VALUE!';
    
    // Return error if places is negative
    if (places < 0) return '#NUM!';
    
    // Truncate places in case it is not an integer
    places = Math.floor(places);

    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
    return (places >= result.length) ? _s.repeat('0', places - result.length) + result : '#NUM!';
  }
}


// Financial functions

function ACCRINT(issue, first, settlement, rate, par, frequency, basis, method) {
  // Return error if either date is invalid
  if (!moment(issue).isValid() || !moment(first).isValid() || !moment(settlement).isValid()) return '#VALUE!';

  // Return error if either rate or par are lower than or equal to zero
  if (rate <= 0 || par <= 0) return '#NUM!';
  
  // Return error if frequency is neither 1, 2, or 4
  if ([1,2,4].indexOf(frequency) === -1) return '#NUM!';

  // Return error if basis is neither 0, 1, 2, 3, or 4
  if ([0,1,2,3,4].indexOf(basis) === -1) return '#NUM!';
  
  // Return error if issue greater than or equal to settlement
  if (moment(issue).diff(moment(settlement)) >= 0) return '#NUM!';

  // Set default values
  var par = (typeof par === 'undefined') ? 0 : 1000;
  var basis = (typeof basis === 'undefined') ? 0 : basis;
  var method = (typeof method === 'undefined') ? true : method;
  
  // Compute accrued interest
  var factor = 0;
  var id = moment(new Date(issue));
  var fd = moment(new Date(first));
  var sd = moment(new Date(settlement));
  var days = (moment([id.year()]).isLeapYear()) ? 366 : 365;
  
  switch (basis) {
    case 0:
      // US (NASD) 30/360
      var factor = YEARFRAC(issue, settlement, basis);
      break;
    case 1:
      // Actual/actual
      var factor = YEARFRAC(issue, settlement, basis);
      break;
    case 2:
      // Actual/360
      var factor = YEARFRAC(issue, settlement, basis);
      break;
    case 3:
      // Actual/365
      var factor = YEARFRAC(issue, settlement, basis);
      break;
    case 4:
      // European 30/360
      var factor = YEARFRAC(issue, settlement, basis);
      break;
  }
  return par * rate * factor;
}

function ACCRINTM() {
  return;
}

function AMORDEGRC() {
  return;
}

function AMORLINC() {
  return;
}

function COUPDAYBS() {
  return;
}

function COUPDAYS() {
  return;
}

function COUPDAYSNC() {
  return;
}

function COUPNCD() {
  return;
}

function COUPNUM() {
  return;
}

function COUPPCD() {
  return;
}

function CUMIPMT(rate, periods, value, start, end, type) {
  // Credits: algorithm inspired by Apache OpenOffice
  // Credits: Hannes Stiebitzhofer for the translations of function and variable names
  // Requires FV() and PMT() from Formula.js [http://stoic.com/formula/]

  // Evaluate rate and periods (TODO: replace with secure expression evaluator)
  rate = eval(rate);
  periods = eval(periods);

  // Return error if either rate, periods, or value are lower than or equal to zero
  if (rate <= 0 || periods <= 0 || value <= 0) return '#NUM!';

  // Return error if start < 1, end < 1, or start > end
  if (start < 1 || end < 1 || start > end) return '#NUM!';

  // Return error if type is neither 0 nor 1
  if (type !== 0 && type !== 1) return '#NUM!';

  // Compute cumulative interest
  var payment = PMT(rate, periods, value, 0, type);
  var interest = 0;
	interest = 0;
	if(start === 1) {
  	if(type === 0) {
    	interest = -value;
    	start++;
    }
  }
  for (var i = start; i <= end; i++) {
    if (type === 1) {
      interest += FV(rate, i - 2, payment, value, 1 ) - payment;
    } else {
      interest += FV(rate, i - 1, payment, value, 0 );
    }
  }
  interest *= rate;

  // Return cumulative interest
  return interest;
}

function CUMPRINC(rate, periods, value, start, end, type) {
  // Credits: algorithm inspired by Apache OpenOffice
  // Credits: Hannes Stiebitzhofer for the translations of function and variable names
  // Requires FV() and PMT() from Formula.js [http://stoic.com/formula/]

  // Evaluate rate and periods (TODO: replace with secure expression evaluator)
  rate = eval(rate);
  periods = eval(periods);

  // Return error if either rate, periods, or value are lower than or equal to zero
  if (rate <= 0 || periods <= 0 || value <= 0) return '#NUM!';

  // Return error if start < 1, end < 1, or start > end
  if (start < 1 || end < 1 || start > end) return '#NUM!';

  // Return error if type is neither 0 nor 1
  if (type !== 0 && type !== 1) return '#NUM!';

  // Compute cumulative principal
  var payment = PMT(rate, periods, value, 0, type);
  var principal = 0;
  if(start === 1) {
    if(type === 0) {
      principal = payment + value * rate;
    } else {
      principal = payment;
    }
    start++;
  }
  for (var i = start; i <= end; i++) {
    if(type > 0) {
      principal += payment - (FV(rate, i - 2, payment, value, 1) - payment) * rate;
    } else {
      principal += payment - FV(rate, i - 1, payment, value, 0) * rate;
    }
  }

  // Return cumulative principal
  return principal;
}

function DB(cost, salvage, life, period, month) {
  // Initialize month
  var month = (typeof month === 'undefined') ? 12 : month;

  // Return error if any of the parameters is not a number
  if (isNaN(cost) || isNaN(salvage) || isNaN(life) || isNaN(period) || isNaN(month)) return '#VALUE!';  

  // Return error if any of the parameters is negative
  if (cost < 0 || salvage < 0 || life < 0 || period < 0) return '#NUM!';
  
  // Return error if month is not an integer between 1 and 12
  if ([1,2,3,4,5,6,7,8,9,10,11,12].indexOf(month) === -1) return '#NUM!';
  
  // Return error if period is greater than life
  if (period > life) return '#NUM!';

  // Return 0 (zero) if salvage is greater than or equal to cost
  if (salvage >= cost) return 0;

  // Rate is rounded to three decimals places
  var rate = (1 - Math.pow(salvage / cost, 1 / life)).toFixed(3);
  
  // Compute initial depreciation
  var initial = cost * rate * month / 12;
  
  // Compute total depreciation
  var total = initial;
  var current = 0;
  var ceiling = (period === life) ? life - 1 : period;
  for (var i = 2; i <= ceiling; i++) {
    current = (cost - total) * rate;
    total += current;
  }
  
  // Depreciation for the first and last periods are special cases
  if (period === 1) {
    // First period
    return initial;
  } else if (period === life) {
    // Last period
    return (cost - total) * rate;
  } else {
    return current;
  }
}

function DDB(cost, salvage, life, period, factor) {
  // Initialize factor
  var factor = (typeof factor === 'undefined') ? 2 : factor;

  // Return error if any of the parameters is not a number
  if (isNaN(cost) || isNaN(salvage) || isNaN(life) || isNaN(period) || isNaN(factor)) return '#VALUE!';  

  // Return error if any of the parameters is negative or if factor is null
  if (cost < 0 || salvage < 0 || life < 0 || period < 0 || factor <= 0) return '#NUM!';
  
  // Return error if period is greater than life
  if (period > life) return '#NUM!';

  // Return 0 (zero) if salvage is greater than or equal to cost
  if (salvage >= cost) return 0;

  // Compute depreciation
  var total = 0;
  var current = 0;
  for (var i = 1; i <= period; i++) {
    current = Math.min((cost - total) * (factor / life), (cost - salvage - total));
    total += current;
  }
  
  // Return depreciation
  return current;
}

function DISC() {
  return;
}

function DOLLARDE(dollar, fraction) {
  // Credits: algorithm inspired by Apache OpenOffice

  // Return error if any of the parameters is not a number
  if (isNaN(dollar) || isNaN(fraction)) return '#VALUE!';
  
  // Return error if fraction is negative
  if (fraction < 0) return '#NUM!';
  
  // Return error if fraction is greater than or equal to 0 and less than 1
  if (fraction >= 0 && fraction < 1) return '#DIV/0!';
  
  // Truncate fraction if it is not an integer
  fraction = parseInt(fraction, 10);

  // Compute integer part
  var result = parseInt(dollar, 10);
  
  // Add decimal part
  result += (dollar % 1) * Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN10)) / fraction;

  // Round result
  var power = Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN2) + 1);
  result = Math.round(result * power) / power;

  // Return converted dollar price
  return result;
}

function DOLLARFR(dollar, fraction) {
  // Credits: algorithm inspired by Apache OpenOffice

  // Return error if any of the parameters is not a number
  if (isNaN(dollar) || isNaN(fraction)) return '#VALUE!';
  
  // Return error if fraction is negative
  if (fraction < 0) return '#NUM!';
  
  // Return error if fraction is greater than or equal to 0 and less than 1
  if (fraction >= 0 && fraction < 1) return '#DIV/0!';
  
  // Truncate fraction if it is not an integer
  fraction = parseInt(fraction, 10);

  // Compute integer part
  var result = parseInt(dollar, 10);
  
  // Add decimal part
  result += (dollar % 1) * Math.pow(10, -Math.ceil(Math.log(fraction) / Math.LN10)) * fraction;

  // Return converted dollar price
  return result;
}

function DURATION() {
  return;
}

function EFFECT(rate, periods) {
  // Return error if any of the parameters is not a number
  if (isNaN(rate) || isNaN(periods)) return '#VALUE!';

  // Return error if rate <=0 or periods < 1
  if (rate <=0 || periods < 1) return '#NUM!';

  // Truncate periods if it is not an integer
  periods = parseInt(periods, 10);

  // Return effective annual interest rate
  return Math.pow(1 + rate / periods, periods) - 1;
}

function FV(rate, periods, payment, value, type) {
  // Credits: algorithm inspired by Apache OpenOffice

  // Initialize type
  var type = (typeof type === 'undefined') ? 0 : type;

  // Evaluate rate (TODO: replace with secure expression evaluator)
  rate = eval(rate);

  // Return future value
  var result;
  if (rate === 0) {
    result = value + payment * periods;
  } else {
    var term = Math.pow(1 + rate, periods);
    if (type === 1) {
      result = value * term + payment * (1 + rate) * (term - 1.0) / rate;
    } else {
      result = value * term + payment * (term - 1) / rate;
    }
  }
  return -result;
}

function FVSCHEDULE(principal, schedule) {
  // Initialize future value
  var future = principal;

  // Apply all interests in schedule
  for (var i = 0; i < schedule.length; i++) {
    // Return error if schedule value is not a number
    if (isNaN(schedule[i])) return '#VALUE!';
    
    // Apply scheduled interest
    future *= 1 + schedule[i];
  }
  
  // Return future value
  return future;
}

function INTRATE() {
  return;
}

function IPMT(rate, period, periods, present, future, type) {
  // Credits: algorithm inspired by Apache OpenOffice

  // Initialize type
  var type = (typeof type === 'undefined') ? 0 : type;

  // Evaluate rate and periods (TODO: replace with secure expression evaluator)
  rate = eval(rate);
  periods = eval(periods);

  // Compute payment
  var payment = PMT(rate, periods, present, future, type);
  
  // Compute interest
  var interest;
  if (period === 1) {
    if (type === 1) {
      interest = 0;
    } else {
      interest = -present;
    }
  } else {
    if (type === 1) {
      interest = FV(rate, period - 2, payment, present, 1) - payment;
    } else {
      interest = FV(rate, period - 1, payment, present, 0);
    }
  }
  
  // Return interest
  return interest * rate;
}

function IRR(values, guess) {
  // Credits: algorithm inspired by Apache OpenOffice
  
  // Calculates the resulting amount
  var irrResult = function(values, dates, rate) {
    var r = rate + 1;
    var result = values[0];
    for (var i = 1; i < values.length; i++) {
      result += values[i] / Math.pow(r, (dates[i] - dates[0]) / 365);
    }
    return result;
  }

  // Calculates the first derivation
  var irrResultDeriv = function(values, dates, rate) {
    var r = rate + 1;
    var result = 0;
    for (var i = 1; i < values.length; i++) {
      var frac = (dates[i] - dates[0]) / 365;
      result -= frac * values[i] / Math.pow(r, frac + 1);
    }
    return result;
  }

  // Initialize dates and check that values contains at least one positive value and one negative value
  var dates = [];
  var positive = false;
  var negative = false;
  for (var i = 0; i < values.length; i++) {
    dates[i] = (i === 0) ? 0 : dates[i - 1] + 365;
    if (values[i] > 0) positive = true;
    if (values[i] < 0) negative = true;
  }
  
  // Return error if values does not contain at least one positive value and one negative value
  if (!positive || !negative) return '#NUM!';

  // Initialize guess and resultRate
  var guess = (typeof guess === 'undefined') ? 0.1 : guess;
  var resultRate = guess;
  
  // Set maximum epsilon for end of iteration
  var epsMax = 1e-10;
  
  // Set maximum number of iterations
  var iterMax = 50;

  // Implement Newton's method
  var newRate, epsRate, resultValue;
  var iteration = 0;
  var contLoop = true;
  do {
    resultValue = irrResult(values, dates, resultRate);
    newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
    epsRate = Math.abs(newRate - resultRate);
    resultRate = newRate;
    contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
  } while(contLoop && (++iteration < iterMax));

  if(contLoop) return '#NUM!';

  // Return internal rate of return
  return resultRate;
}

function ISPMT(rate, period, periods, value) {
  // Evaluate rate and periods (TODO: replace with secure expression evaluator)
  rate = eval(rate);
  periods = eval(periods);

  // Return interest
  return value * rate * (period / periods - 1);
}

function MDURATION() {
  return;
}

function MIRR(values, finance_rate, reinvest_rate) {
  // Initialize number of values
  var n = values.length;

  // Lookup payments (negative values) and incomes (positive values)
  var payments = [];
  var incomes = [];
  for (var i = 0; i < n; i++) {
    if (values[i] < 0) {
      payments.push(values[i]);
    } else {
      incomes.push(values[i]);
    }
  }
  
  // Return modified internal rate of return
  var num = -NPV(reinvest_rate, incomes) * Math.pow(1 + reinvest_rate, n - 1);
  var den = NPV(finance_rate, payments) * (1 + finance_rate);
  return Math.pow(num / den, 1 / (n - 1)) - 1;
}

function NOMINAL(rate, periods) {
  // Return error if any of the parameters is not a number
  if (isNaN(rate) || isNaN(periods)) return '#VALUE!';

  // Return error if rate <=0 or periods < 1
  if (rate <=0 || periods < 1) return '#NUM!';

  // Truncate periods if it is not an integer
  periods = parseInt(periods, 10);
  
  // Return nominal annual interest rate
  return (Math.pow(rate + 1, 1 / periods) - 1) * periods;
}

function NPER(rate, payment, present, future, type) {
  // Initialize type
  var type = (typeof type === 'undefined') ? 0 : type;

  // Initialize future value
  var future = (typeof future === 'undefined') ? 0 : future;

  // Evaluate rate and periods (TODO: replace with secure expression evaluator)
  rate = eval(rate);

  // Return number of periods
  var num = payment * (1 + rate * type) - future * rate;
  var den = (present * rate + payment * (1 + rate * type));
  return Math.log(num / den) / Math.log(1 + rate);
}

function NPV() {
  // Cast arguments to array
  var args = [];
  for (i = 0; i < arguments.length; i++) {
    args = args.concat(arguments[i]);
  }
  
  // Lookup rate
  var rate = args[0];

  // Initialize net present value
  var value = 0;
  
  // Loop on all values
  for (var j = 1; j < args.length; j++) {
    value += args[j] / Math.pow(1 + rate, j);
  }

  // Return net present value
  return value;
}

function ODDFPRICE() {
  return;
}

function ODDFYIELD() {
  return;
}

function ODDLPRICE() {
  return;
}

function ODDLYIELD() {
  return;
}

function PDURATION(rate, present, future) {
  // Return error if any of the parameters is not a number
  if (isNaN(rate) || isNaN(present) || isNaN(future)) return '#VALUE!';

  // Return error if rate <=0
  if (rate <= 0) return '#NUM!';

  // Return number of periods
  return (Math.log(future) - Math.log(present)) / Math.log(1 + rate);
}

function PMT(rate, periods, present, future, type) {
  // Credits: algorithm inspired by Apache OpenOffice

  // Initialize type
  var type = (typeof type === 'undefined') ? 0 : type;

  // Evaluate rate and periods (TODO: replace with secure expression evaluator)
  rate = eval(rate);
  periods = eval(periods);

  // Return payment
  var result;
  if (rate === 0) {
    result = (present + future) / periods;
  } else {
    var term = Math.pow(1 + rate, periods);
    if (type === 1) {
      result = (future * rate / (term - 1) + present * rate / (1 - 1 / term)) / (1 + rate);
    } else {
      result = future * rate / (term - 1) + present * rate / (1 - 1 / term);
    }
  }
  return -result;
}

function PPMT(rate, period, periods, present, future, type) {
  return PMT(rate, periods, present, future, type) - IPMT(rate, period, periods, present, future, type);
}

function PRICE() {
  return;
}

function PRICEDISC() {
  return;
}

function PRICEMAT() {
  return;
}

function PV(rate, periods, payment, future, type) {
  // Initialize type
  var type = (typeof type === 'undefined') ? 0 : type;

  // Evaluate rate and periods (TODO: replace with secure expression evaluator)
  rate = eval(rate);
  periods = eval(periods);

  // Return present value
  if (rate === 0) {
    return - payment * periods - future;
  } else {
    return (((1 - Math.pow(1 + rate, periods)) / rate) * payment * (1 +rate * type) - future) / Math.pow(1 + rate, periods);
  }
}

function RATE(periods, payment, present, future, type, guess) {
  // Credits: rabugento

  // Initialize guess
  var guess = (typeof guess === 'undefined') ? 0.01 : guess;

  // Initialize future
  var future = (typeof future === 'undefined') ? 0 : future;

  // Initialize type
  var type = (typeof type === 'undefined') ? 0 : type;

  // Evaluate periods (TODO: replace with secure expression evaluator)
  periods = eval(periods);

  // Set maximum epsilon for end of iteration
  var epsMax = 1e-10;
  
  // Set maximum number of iterations
  var iterMax = 50;

  // Implement Newton's method
  var y, y0, y1, x0, x1 = 0, f = 0, i = 0;
  var rate = guess;
  if (Math.abs(rate) < epsMax) {
     y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
  } else {
     f = Math.exp(periods * Math.log(1 + rate));
     y = present * f + payment * (1 / rate + type) * (f - 1) + future;
  }
  y0 = present + payment * periods + future;
  y1 = present * f + payment * (1 / rate + type) * (f - 1) + future;
  i = x0 = 0;
  x1 = rate;
  while ((Math.abs(y0 - y1) > epsMax) && (i < iterMax)) {
    rate = (y1 * x0 - y0 * x1) / (y1 - y0);
    x0 = x1;
    x1 = rate;
    if (Math.abs(rate) < epsMax) {
      y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
    } else {
      f = Math.exp(periods * Math.log(1 + rate));
      y = present * f + payment * (1 / rate + type) * (f - 1) + future;
    }
    y0 = y1;
    y1 = y;
    ++i;
  }
  return rate;
}

function RECEIVED() {
  return;
}

function RRI(periods, present, future) {
  // Return error if any of the parameters is not a number
  if (isNaN(periods) || isNaN(present) || isNaN(future)) return '#VALUE!';

  // Return error if periods or present is equal to 0 (zero)
  if (periods === 0 || present === 0) return '#NUM!';
  
  // Return equivalent interest rate
  return Math.pow(future / present, 1 / periods) - 1;
}

function SLN(cost, salvage, life) {
  // Return error if any of the parameters is not a number
  if (isNaN(cost) || isNaN(salvage) || isNaN(life)) return '#VALUE!';

  // Return error if life equal to 0 (zero)
  if (life === 0) return '#NUM!';
  
  // Return straight-line depreciation
  return (cost - salvage) / life;
}

function SYD(cost, salvage, life, period) {
  // Return error if any of the parameters is not a number
  if (isNaN(cost) || isNaN(salvage) || isNaN(life) || isNaN(period)) return '#VALUE!';

  // Return error if life equal to 0 (zero)
  if (life === 0) return '#NUM!';

  // Return error if period is lower than 1 or greater than life
  if (period < 1 || period > life) return '#NUM!';

  // Truncate period if it is not an integer
  period = parseInt(period, 10);

  // Return straight-line depreciation
  return (cost - salvage) * (life - period + 1) * 2 / (life * (life + 1));
}

function TBILLEQ(settlement, maturity, discount) {
  // Return error if either date is invalid
  if (!moment(settlement).isValid() || !moment(maturity).isValid()) return '#VALUE!';

  // Return error if discount is lower than or equal to zero
  if (discount <= 0) return '#NUM!';
  
  // Return error if settlement is greater than maturity
  if (moment(settlement).diff(moment(maturity)) > 0) return '#NUM!';
  
  // Return error if maturity is more than one year after settlement
  if (moment(maturity).diff(moment(settlement), 'years') > 1) return '#NUM!';
  
  // Return bond-equivalent yield
  return (365 * discount) / (360 - discount * DAYS360(settlement, maturity));
}

function TBILLPRICE(settlement, maturity, discount) {
  // Return error if either date is invalid
  if (!moment(settlement).isValid() || !moment(maturity).isValid()) return '#VALUE!';

  // Return error if discount is lower than or equal to zero
  if (discount <= 0) return '#NUM!';
  
  // Return error if settlement is greater than maturity
  if (moment(settlement).diff(moment(maturity)) > 0) return '#NUM!';
  
  // Return error if maturity is more than one year after settlement
  if (moment(maturity).diff(moment(settlement), 'years') > 1) return '#NUM!';
  
  // Return bond-equivalent yield
  return 100 * (1 - discount * DAYS360(settlement, maturity) / 360);
}

function TBILLYIELD(settlement, maturity, price) {
  // Return error if either date is invalid
  if (!moment(settlement).isValid() || !moment(maturity).isValid()) return '#VALUE!';

  // Return error if price is lower than or equal to zero
  if (price <= 0) return '#NUM!';
  
  // Return error if settlement is greater than maturity
  if (moment(settlement).diff(moment(maturity)) > 0) return '#NUM!';
  
  // Return error if maturity is more than one year after settlement
  if (moment(maturity).diff(moment(settlement), 'years') > 1) return '#NUM!';
  
  // Return bond-equivalent yield
  return (100 - price) * 360 / (price * DAYS360(settlement, maturity));
}

function VDB() {
  return;
}


function XIRR(values, dates, guess) {
  // Credits: algorithm inspired by Apache OpenOffice
  
  // Calculates the resulting amount
  var irrResult = function(values, dates, rate) {
    var r = rate + 1;
    var result = values[0];
    for (var i = 1; i < values.length; i++) {
      result += values[i] / Math.pow(r, moment(dates[i]).diff(moment(dates[0]), 'days') / 365);
    }
    return result;
  }

  // Calculates the first derivation
  var irrResultDeriv = function(values, dates, rate) {
    var r = rate + 1;
    var result = 0;
    for (var i = 1; i < values.length; i++) {
      var frac = moment(dates[i]).diff(moment(dates[0]), 'days') / 365;
      result -= frac * values[i] / Math.pow(r, frac + 1);
    }
    return result;
  }

  // Check that values contains at least one positive value and one negative value
  var positive = false;
  var negative = false;
  for (var i = 0; i < values.length; i++) {
    if (values[i] > 0) positive = true;
    if (values[i] < 0) negative = true;
  }
  
  // Return error if values does not contain at least one positive value and one negative value
  if (!positive || !negative) return '#NUM!';

  // Initialize guess and resultRate
  var guess = (typeof guess === 'undefined') ? 0.1 : guess;
  var resultRate = guess;
  
  // Set maximum epsilon for end of iteration
  var epsMax = 1e-10;
  
  // Set maximum number of iterations
  var iterMax = 50;

  // Implement Newton's method
  var newRate, epsRate, resultValue;
  var iteration = 0;
  var contLoop = true;
  do {
    resultValue = irrResult(values, dates, resultRate);
    newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
    epsRate = Math.abs(newRate - resultRate);
    resultRate = newRate;
    contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
  } while(contLoop && (++iteration < iterMax));

  if(contLoop) return '#NUM!';

  // Return internal rate of return
  return resultRate;
}

function XNPV(rate, values, dates) {
  var result = 0;
  for (var i = 0; i < values.length; i++) {
    result += values[i] / Math.pow(1 + rate, moment(dates[i]).diff(moment(dates[0]), 'days') / 365);
  }
  return result;
}

function YIELD() {
  return;
}

function YIELDDISC() {
  return;
}

function YIELDMAT() {
}


// Information functions

function ISNUMBER(number) {
  return (!isNaN(parseFloat(number)) && isFinite(number)) ? true : false;
}


// Logical functions

function AND() {
  result = true;
  for (var i = 0; i < arguments.length; i++) {
    if (!arguments[i]) result = false;
  }
  return result;
}

function FALSE() {
  return false;
}

function IF(test, then_value, otherwise_value) {
  if (test) {
    return (typeof then_value === 'undefined') ? true : then_value;
  } else {
    return (typeof otherwise_value === 'undefined') ? true : otherwise_value;
  }
}

function IFERROR(value, value_if_error) {
  return (['#DIV/0!', '#N/A', '#NAME?', '#NUM!', '#NULL!', '#REF!', '#VALUE!'].indexOf(value) >= 0 ) ? value_if_error : value;
}

function IFNA(value, value_if_na) {
  return (value === '#N/A') ? value_if_na : value;
}

function NOT(logical) {
  return !logical;
}

function OR() {
  result = false;
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i]) result = true;
  }
  return result;
}

function TRUE() {
  return true;
}

function XOR() {
  result = 0;
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i]) result++;
  }
  return (Math.floor(Math.abs(result)) & 1) ? true : false;
}


// Math functions

function ABS(number) {
  return Math.abs(number);
}

function ACOS(number) {
  return Math.acos(number);
}

function ACOSH(number) {
  return Math.log(number + Math.sqrt(number * number - 1));
}

function ACOT(number) {
  return Math.atan(1 / number);
}

function ACOTH(number) {
  return 0.5 * Math.log((number + 1) / (number - 1));
}

function AGGREGATE(function_code, options) {
  var result = [];
  for (var i = 2; i < arguments.length; i++) {
    switch (function_code) {
      case 1:
        result[i - 2] = AVERAGE(arguments[i]);
        break;
      case 2:
        result[i - 2] = COUNT(arguments[i]);
        break;
      case 3:
        result[i - 2] = COUNTA(arguments[i]);
        break;
      case 4:
        result[i - 2] = MAX(arguments[i]);
        break;
      case 5:
        result[i - 2] = MIN(arguments[i]);
        break;
      case 6:
        result[i - 2] = PRODUCT(arguments[i]);
        break;
      case 7:
        result[i - 2] = STDEVS(arguments[i]);
        break;
      case 8:
        result[i - 2] = STDEVP(arguments[i]);
        break;
      case 9:
        result[i - 2] = SUM(arguments[i]);
        break;
      case 10:
        result[i - 2] = VARS(arguments[i]);
        break;
      case 11:
        result[i - 2] = VARP(arguments[i]);
        break;
      case 12:
        result[i - 2] = MEDIAN(arguments[i]);
        break;
      case 13:
        result[i - 2] = MODESNGL(arguments[i]);
        break;
      case 14:
        result[i - 2] = LARGE(arguments[i]);
        break;
      case 15:
        result[i - 2] = SMALL(arguments[i]);
        break;
      case 16:
        result[i - 2] = PERCENTILEINC(arguments[i]);
        break;
      case 17:
        result[i - 2] = QUARTILEINC(arguments[i]);
        break;
      case 18:
        result[i - 2] = PERCENTILEEXC(arguments[i]);
        break;
      case 19:
        result[i - 2] = QUARTILEEXC(arguments[i]);
        break;
    }
  }
  return result;
}

function ARABIC(text) {
  // Credits: Rafał Kukawski
  if(!/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/.test(text)) {
    throw new Error('Incorrect roman number');
  }
  var r = 0;
  text.replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, function(i) {
    r += {M:1000, CM:900, D:500, CD:400, C:100, XC:90, L:50, XL:40, X:10, IX:9, V:5, IV:4, I:1}[i];
  });
  return r;
}

function ASIN(number) {
  return Math.asin(number);
}

function ASINH(number) {
  return Math.log(number + Math.sqrt(number * number + 1));
}

function ATAN(number) {
  return Math.atan(number);
}

function ATAN2(number_x, number_y) {
  return Math.atan2(number_x, number_y);
}

function ATANH(number) {
  return Math.log((1 + number) / (1 - number)) / 2;
}

function BASE(number, radix, min_length) {
  var min_length = (typeof min_length === 'undefined') ? 0 : min_length;
  var result = number.toString(radix);
  return Array(Math.max(min_length + 1 - result.length, 0)).join('0') + result;
}

function CEILING(number, significance, mode) {
  if (significance === 0) return 0;
  var significance = (typeof significance === 'undefined') ? 1 : Math.abs(significance);
  var mode = (typeof mode === 'undefined') ? 0 : mode;
  var precision = -Math.floor(Math.log(significance) / Math.log(10));
  if (number >= 0) {
    return ROUND(Math.ceil(number / significance) * significance, precision);
  } else {
    if (mode === 0) {
      return -ROUND(Math.floor(Math.abs(number) / significance) * significance, precision);
    } else {
      return -ROUND(Math.ceil(Math.abs(number) / significance) * significance, precision);
    }
  }
}

CEILINGMATH = CEILING;

CEILINGPRECISE =  CEILING;

function COMBIN(number, number_chosen) {
  return FACT(number) / (FACT(number_chosen) * FACT(number - number_chosen));
}

function COMBINA(number, number_chosen) {
  return (number === 0 && number_chosen === 0) ? 1 : COMBIN(number + number_chosen - 1, number - 1);
}

function COS(number) {
  return Math.cos(number);
}

function COSH(number) {
  return (Math.exp(number) + Math.exp(-number)) / 2;
}

function COT(number) {
  return 1 / Math.tan(number);
}

function COTH(number) {
  var e2 = Math.exp(2 * number);
  return (e2 + 1) / (e2 - 1);
}

function CSC(number) {
  return 1 / Math.sin(number);
}

function CSCH(number) {
  return 2 / (Math.exp(number) - Math.exp(-number));
}

function DECIMAL(number, radix) {
  return parseInt(number, radix);
}

function DEGREES(number) {
  return number * 180 / Math.PI;
}

function EVEN(number) {
  return CEILING(number, -2, -1);
}

function EXP(number) {
  return Math.exp(number);
}

function FACT(number) {
  var n = Math.floor(number);
  if (n === 0 || n === 1) {
    return 1;
  } else if(MEMOIZED_FACT[n] > 0) {
    return MEMOIZED_FACT[n];
  } else {
    return MEMOIZED_FACT = FACT(n - 1) * n;
  }
}

function FACTDOUBLE(number) {
  var n = Math.floor(number);
  if (n <= 0) {
    return 1;
  } else {
    return n * FACTDOUBLE(n - 2);
  }
}

function FLOOR(number, significance, mode) {
  if (significance === 0) return 0;
  var significance = (typeof significance === 'undefined') ? 1 : Math.abs(significance);
  var mode = (typeof mode === 'undefined') ? 0 : mode;
  var precision = -Math.floor(Math.log(significance) / Math.log(10));
  if (number >= 0) {
    return ROUND(Math.floor(number / significance) * significance, precision);
  } else {
    if (mode === 0) {
      return -ROUND(Math.ceil(Math.abs(number) / significance) * significance, precision);
    } else {
      return -ROUND(Math.floor(Math.abs(number) / significance) * significance, precision);
    }
  }
}

FLOORMATH = FLOOR;

FLOORPRECISE =  FLOOR;

function GCD() {
  // Credits: Andrew Pociu
  var result;
  for (var r, a, i = arguments.length - 1, result = arguments[i]; i;) {
    for (a = arguments[--i]; r = a % result; a = result, result = r);
  }
  return result;
}

function INT(number) {
  return Math.floor(number);
}

function ISEVEN(number) {
  return (Math.floor(Math.abs(number)) & 1) ? false : true;
}

ISOCEILING =  CEILING;

function ISODD(number) {
  return (Math.floor(Math.abs(number)) & 1) ? true : false;
}

function LCM() {
  // Credits: Jonas Raoni Soares Silva
  var o = ARGSTOARRAY(arguments);
  for (var i, j, n, d, r = 1; (n = o.pop()) != undefined;) {
    while(n > 1) {
      if (n % 2) {
        for (i = 3, j = Math.floor(Math.sqrt(n)); i <= j && n % i; i += 2);
        d = i <= j ? i : n;
      } else {
        d = 2;
      }
      for(n /= d, r *= d, i = o.length; i; !(o[--i] % d) && (o[i] /= d) === 1 && o.splice(i, 1));
    }
  }
  return r;
}

function LN(number) {
  return Math.log(number);
}

function LOG(number, base) {
  var base = (typeof base === 'undefined') ? 10 : base;
  return Math.log(number) / Math.log(base);
}

function LOG10(number) {
  return Math.log(number) / Math.log(10);
}

MDETERM = numeric.det;

MINVERSE = numeric.inv;

MMULT = numeric.dot;

function MOD(dividend, divisor) {
  var modulus = Math.abs(dividend % divisor);
  return (divisor > 0) ? modulus : - modulus;
}

function MROUND(number, multiple) {
  if (number * multiple < 0) {
    throw new Error('Number and multiple must have the same sign.');
    return '#NUM!';
  }
    return Math.round(number / multiple) * multiple;
}

function MULTINOMIAL() {
  var sum = 0;
  var divisor = 1;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
    divisor *= FACT(arguments[i]);
  }
  return FACT(sum) / divisor;
}

MUNIT = numeric.identity;

function ODD(number) {
  var temp = Math.ceil(Math.abs(number));
  temp = (temp & 1) ? temp : temp + 1;
  return (number > 0) ? temp : - temp;
}

function PI() {
  return Math.PI;
}

function POWER(number, power) {
  return Math.pow(number, power);
}

function PRODUCT() {
  var result = 1;
  for (var i = 0; i < arguments.length; i++) {
    result *= arguments[i];
  }
  return result;
}

function QUOTIENT(numerator, denominator) {
  return (numerator / denominator).toFixed(0);
}

function RADIANS(number) {
  return number * Math.PI / 180;
}

function RAND() {
  return Math.random();
}

function RANDBETWEEN(bottom, top) {
  // Creative Commons Attribution 3.0 License
  // Copyright (c) 2012 eqcode
  return bottom + Math.ceil((top - bottom + 1) * Math.random()) - 1;
}

function ROUND(number, digits) {
  return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
}

function ROUNDDOWN(number, digits) {
  var sign = (number > 0) ? 1 : -1; 
  return sign * (Math.floor(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
}

function ROUNDUP(number, digits) {
  var sign = (number > 0) ? 1 : -1; 
  return sign * (Math.ceil(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
}

function SERIESSUM(x, n, m, coefficients) {
  var result = coefficients[0] * Math.pow(x, n);
  for (var i = 1; i < coefficients.length; i++) {
    result += coefficients[i] * Math.pow(x, n + i * m);
  }
  return result;
}

function SEC(number) {
  return 1 / Math.cos(number);
}

function SECH(number) {
  return 2 / (Math.exp(number) + Math.exp(-number));
}

function SIGN(number) {
  if (number < 0) {
    return -1;
  } else if (number === 0) {
    return 0;
  } else {
    return 1;
  }
}

function SIN(number) {
  return Math.sin(number);
}

function SINH(number) {
  return (Math.exp(number) - Math.exp(-number)) / 2;
}

function SQRT(number) {
  return Math.sqrt(number);
}

function SQRTPI(number) {
  return Math.sqrt(number * Math.PI);
}

function SUBTOTAL(function_code) {
  var result = [];
  for (var i = 1; i < arguments.length; i++) {
    switch (function_code) {
      case 1:
        result[i - 1] = AVERAGE(arguments[i]);
        break;
      case 2:
        result[i - 1] = COUNT(arguments[i]);
        break;
      case 3:
        result[i - 1] = COUNTA(arguments[i]);
        break;
      case 4:
        result[i - 1] = MAX(arguments[i]);
        break;
      case 5:
        result[i - 1] = MIN(arguments[i]);
        break;
      case 6:
        result[i - 1] = PRODUCT(arguments[i]);
        break;
      case 7:
        result[i - 1] = STDEV(arguments[i]);
        break;
      case 8:
        result[i - 1] = STDEVP(arguments[i]);
        break;
      case 9:
        result[i - 1] = SUM(arguments[i]);
        break;
      case 10:
        result[i - 1] = VAR(arguments[i]);
        break;
      case 11:
        result[i - 1] = VARP(arguments[i]);
        break;
    }
  }
  return result;
}

function SUM() {
  var numbers = ARGSTOARRAY(arguments);
  var result = 0;
  for (var i = 0; i < numbers.length; i++) {
    if (numbers[i] instanceof Array) {
      for (var j = 0; j < numbers[i].length; j++) {
        result += (ISNUMBER(numbers[i][j])) ? numbers[i][j] : 0;
      }
    } else {
      result += (ISNUMBER(numbers[i])) ? numbers[i] : 0;
    }
  }
  return result;
}

function SUMIF(range, criteria) {
  var result = 0;
  for (var i = 0; i < range.length; i++) {
    result += (eval(range[i] + criteria)) ? range[i] : 0;
  }
  return result;
}

function SUMIFS() {
  var criteria = (arguments.length - 1) / 2;
  var range = arguments[0];
  var result = 0;
  for (var i = 0; i < range.length; i++) {
    var fit = true;
    for (var j = 0; j < criteria; j++) {
      if (!eval(arguments[2 * j + 1][i] + arguments[2 * j + 2])) {
        fit = false;
      }
    }
    result += (fit) ? range[i] : 0;
  }
  return result;
}

function SUMPRODUCT() {
  var arrays = arguments.length + 1;
  var result = 0;
  for (var i = 0; i < arguments[0].length; i++) {
    for (var j = 0; j < arguments[0][i].length; j++) {
      var product = 1;
      for (var k = 1; k < arrays; k++) {
        product *= arguments[k - 1][i][j];
      }
      result += product;
    }
  }
  return result;
}

function SUMSQ() {
  var numbers = ARGSTOARRAY(arguments);
  var result = 0;
  for (var i = 0; i < numbers.length; i++) {
    result += (ISNUMBER(numbers[i])) ? numbers[i] * numbers[i] : 0;
  }
  return result;
}

function SUMX2MY2(array_x, array_y) {
  var result = 0;
  for (var i = 0; i < array_x.length; i++) {
    result += array_x[i] * array_x[i] - array_y[i] * array_y[i];
  }
  return result;
}

function SUMX2PY2(array_x, array_y) {
  var result = 0;
  for (var i = 0; i < array_x.length; i++) {
    result += array_x[i] * array_x[i] + array_y[i] * array_y[i];
  }
  return result;
}

function SUMXMY2(array_x, array_y) {
  var result = 0;
  for (var i = 0; i < array_x.length; i++) {
    result += Math.pow(array_x[i] - array_y[i], 2);
  }
  return result;
}

function TAN(number) {
  return Math.tan(number);
}

function TANH(number) {
  var e2 = Math.exp(2 * number);
  return (e2 - 1) / (e2 + 1);
}

function TRUNC(number, digits) {
  var digits = (typeof digits === 'undefined') ? 0 : digits;
  var sign = (number > 0) ? 1 : -1; 
  return sign * (Math.floor(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
}


// Statistical functions
function AVEDEV() {
  var range = ARGSCONCAT(arguments);
  return jStat.sum(jStat(range).subtract(jStat.mean(range)).abs()[0]) / range.length;
}

function AVERAGE() {
  var range = ARGSCONCAT(arguments);
  var n = range.length;
  var count = 0;
  var sigma = 0;
  for (var i = 0; i < n; i++) {
    if (range[i] !== true && range[i] !== false) {
      sigma += range[i];
      count++;
    }
  }
  return sigma / count;
}

function AVERAGEA() {
  return jStat.mean(ARGSCONCAT(arguments));
}

function AVERAGEIF(range, criteria, average_range) {
  var average_range = (typeof average_range === 'undefined') ? range : average_range;
  var average_count = 0;
  var result = 0;
  for (var i = 0; i < range.length; i++) {
    if (eval(range[i] + criteria)) {
      result += average_range[i];
      average_count++;
    }
  }
  return result / average_count;
}

function AVERAGEIFS() {
  var criteria = (arguments.length - 1) / 2;
  var range = arguments[0];
  var count = 0;
  var result = 0;
  for (var i = 0; i < range.length; i++) {
    var fit = true;
    for (var j = 0; j < criteria; j++) {
      if (!eval(arguments[2 * j + 1][i] + arguments[2 * j + 2])) {
        fit = false;
      }
    }
    if (fit) {
      result += range[i];
      count++;
    }
  }
  return result / count;
}

function BETADIST(x, alpha, beta, cumulative, A, B) {
  var A = (typeof A === 'undefined') ? 0 : A;
  var B = (typeof B === 'undefined') ? 1 : B;
  x = (x - A) / (B - A);
  return (cumulative) ? jStat.beta.cdf(x, alpha, beta) : jStat.beta.pdf(x, alpha, beta);
}

function BETAINV(probability, alpha, beta, A, B) {
  var A = (typeof A === 'undefined') ? 0 : A;
  var B = (typeof B === 'undefined') ? 1 : B;
  return jStat.beta.inv(probability, alpha, beta) * (B - A) + A;
}

function BINOMDIST(successes, trials, probability, cumulative) {
  return (cumulative) ? jStat.binomial.cdf(successes, trials, probability) : jStat.binomial.pdf(successes, trials, probability); 
}

function BINOMDISTRANGE(trials, probability, successes, successes2) {
  var successes2 = (typeof successes2 === 'undefined') ? successes : successes2;
  var result = 0;
  for (var i = successes; i <= successes2; i++) {
    result += COMBIN(trials, i) * Math.pow(probability, i) * Math.pow(1 - probability, trials - i);
  }
  return result;
}

function BINOMINV(trials, probability, alpha) {
  var x = 0;
  while (x <= trials) {
    if (jStat.binomial.cdf(x, trials, probability) >= alpha) {
      return x;
    }
    x++;
  }
}

function CHISQDIST(x, k, cumulative) {
  return (cumulative) ? jStat.chisquare.cdf(x, k) : jStat.chisquare.pdf(x, k);
}

function CHISQDISTRT(x, k) {
  return;
}

function CHISQINV(probability, k) {
  return jStat.chisquare.inv(probability, k);
}

function CHISQINVRT() {
  return;
}

function CHISQTEST() {
  return;
}

function CONFIDENCENORM(alpha, sd, n) {
  return jStat.normalci(1, alpha, sd, n)[1] - 1;
}

function CONFIDENCET(alpha, sd, n) {
  return jStat.tci(1, alpha, sd, n)[1] - 1;
}

//CORREL = jStat.corrcoeff;

function COUNT() {
  return ARGSCONCAT(arguments).length;
}

function COUNTA() {
  var range = ARGSCONCAT(arguments);
  return range.length - COUNTBLANK(range);
}

function COUNTBLANK() {
  var range = ARGSCONCAT(arguments);
  var blanks = 0;
  for (var i = 0; i < range.length; i++) {
    if (range[i] === null || range[i] === '') {
      blanks++;
    }
  }
  return blanks;
}

function COUNTIF(range, criteria) {
  var matches = 0;
  for (var i = 0; i < range.length; i++) {
    if (range[i].match(new RegExp(criteria))) {
      matches++;
    }
  }
  return matches;
}

function COUNTIFS() {
  var criteria = (arguments.length - 1) / 2;
  var range = arguments[0];
  var result = 0;
  for (var i = 0; i < range.length; i++) {
    var fit = true;
    for (var j = 0; j < criteria; j++) {
      if (!eval(arguments[2 * j + 1][i] + arguments[2 * j + 2])) {
        fit = false;
      }
    }
    result += (fit) ? 1 : 0;
  }
  return result;
}

function COUNTUNIQUE() {
  return _.uniq(ARGSCONCAT(arguments)).length;
}

function COVARIANCEP(array1, array2) {
  var mean1 = jStat.mean(array1);
  var mean2 = jStat.mean(array2);
  var result = 0;
  var n = array1.length;
  for (var i = 0; i < n; i++) {
    result += (array1[i] - mean1) * (array2[i] - mean2);
  }
  return result / n;
}

//COVARIANCES = jStat.covariance;

function DEVSQ() {
  var range = ARGSCONCAT(arguments);
  var mean = jStat.mean(range);
  var result = 0;
  for (var i = 0; i < range.length; i++) {
    result += Math.pow((range[i] - mean), 2);
  }
  return result;
}

function EXPONDIST(x, lambda, cumulative) {
  return (cumulative) ? jStat.exponential.cdf(x, lambda) : jStat.exponential.pdf(x, lambda);
}

function FDIST(x, d1, d2, cumulative) {
  return (cumulative) ? jStat.centralF.cdf(x, d1, d2) : jStat.centralF.pdf(x, d1, d2);
}

function FDISTRT() {
  return;
}

function FINV(probability, d1, d2) {
  return jStat.centralF.inv(probability, d1, d2);
}

function FINVRT() {
  return;
}

function FTEST() {
  return;
}

function FISHER(x) {
  return Math.log((1 + x) / (1 - x)) / 2;
}

function FISHERINV(y) {
  var e2y = Math.exp(2 * y);
  return (e2y - 1) / (e2y + 1);
}

function FORECAST(x, data_y, data_x) {
  var xmean = jStat.mean(data_x);
  var ymean = jStat.mean(data_y);
  var n = data_x.length;
  var num = 0;
  var den = 0;
  for (var i = 0; i < n; i++) {
    num += (data_x[i] - xmean) * (data_y[i] - ymean);
    den += Math.pow(data_x[i] - xmean, 2);
  }
  var b = num / den;
  var a = ymean - b * xmean;
  return a + b * x;
}

function FREQUENCY(data, bins) {
  var n = data.length;
  var b = bins.length;
  var r = [];
  for (var i = 0; i <= b; i++) {
    r[i] = 0;
    for (var j = 0; j < n; j++) {
      if (i === 0) {
        if (data[j] <= bins[0]) {
          r[0] += 1;
        }
      } else if (i < b) {
        if (data[j] > bins[i - 1] && data[j] <= bins[i]) {
          r[i] += 1;
        }
      } else if (i === b) {
        if (data[j] > bins[b - 1]) {
          r[b] += 1;
        }
      }
    }
  }
  return r;
}

//GAMMA = jStat.gammafn;

function GAMMADIST(x, alpha, beta, cumulative) {
  /*
  var shape = alpha;
  var scale = 1 / beta;
  return (cumulative) ? jStat.gamma.cdf(x, shape, scale) : jStat.gamma.pdf(x, shape, scale);
  */
  return;
}

function GAMMAINV(probability, alpha, beta) {
  /*
  var shape = alpha;
  var scale = 1 / beta;
  return jStat.gamma.inv(probability, shape, scale);
  */
  return;
}

//GAMMALN = jStat.gammaln;

function GAMMALNPRECISE() {
  return;
}

function GAUSS(z) {
  return jStat.normal.cdf(z, 0, 1) - 0.5;
}

function GEOMEAN() {
  return jStat.geomean(ARGSCONCAT(arguments));
}

function GROWTH(known_y, known_x, new_x, use_const) {
  // Credits: Ilmari Karonen

  // Default values for optional parameters:
  if (typeof(known_x) == 'undefined') {
    known_x = [];
    for (var i = 1; i <= known_y.length; i++) known_x.push(i);
  }
  if (typeof(new_x) == 'undefined') {
    new_x = [];
    for (var i = 1; i <= known_y.length; i++) new_x.push(i);
  }
  if (typeof(use_const) == 'undefined') use_const = true;
  
  // Calculate sums over the data:
  var n = known_y.length;
  var avg_x = 0;
  var avg_y = 0;
  var avg_xy = 0;
  var avg_xx = 0; 
  for (var i = 0; i < n; i++) {
    var x = known_x[i];
    var y = Math.log(known_y[i]);
    avg_x += x;
    avg_y += y;
    avg_xy += x*y;
    avg_xx += x*x;
  }
  avg_x /= n;
  avg_y /= n;
  avg_xy /= n;
  avg_xx /= n;
  
  // Compute linear regression coefficients:
  if (use_const) {
    var beta = (avg_xy - avg_x*avg_y) / (avg_xx - avg_x*avg_x);
    var alpha = avg_y - beta*avg_x;
  } else {
    var beta = avg_xy / avg_xx;
    var alpha = 0;
  }
  
  // Compute and return result array:
  var new_y = [];
  for (var i = 0; i < new_x.length; i++) {
    new_y.push(Math.exp(alpha + beta * new_x[i]));
  }
  return new_y;
}

function HARMEAN() {
  var range = ARGSCONCAT(arguments);
  var n = range.length;
  var den = 0;
  for (var i = 0; i < n; i++) {
    den += 1 / range[i];
  }
  return n / den;
}

function HYPGEOMDIST(x, n , M, N, cumulative) {
  function pdf(x, n , M, N) {
    return COMBIN(M, x) * COMBIN (N - M, n - x) / COMBIN(N, n);
  }
  function cdf(x, n , M, N) {
    var result = 0;
    for (var i = 0; i <= x; i++) {
      result += pdf(i, n , M, N);
    }
    return result;
  }
  return (cumulative) ? cdf(x, n , M, N) : pdf(x, n , M, N);
}

function INTERCEPT(data_y, data_x) {
  return FORECAST(0, data_y, data_x);
}

function KURT() {
  var range = ARGSCONCAT(arguments);
  var mean = jStat.mean(range);
  var n = range.length;
  var sigma = 0;
  for (var i = 0; i < n; i++) {
    sigma += Math.pow(range[i] - mean, 4);
  }
  sigma = sigma / Math.pow(jStat.stdev(range, true), 4);
  return ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * sigma - 3 * (n - 1) * (n - 1) / ((n - 2) * (n - 3));
}

function LARGE(array, k) {
  return array.sort(function(a, b) {return b - a})[k - 1];
}

function LINEST(data_y, data_x) {
  var xmean = jStat.mean(data_x);
  var ymean = jStat.mean(data_y);
  var n = data_x.length;
  var num = 0;
  var den = 0;
  for (var i = 0; i < n; i++) {
    num += (data_x[i] - xmean) * (data_y[i] - ymean);
    den += Math.pow(data_x[i] - xmean, 2);
  }
  var m = num / den;
  b = ymean - m * xmean;
  return [m, b];
}

function LOGEST() {
  return;
}

function LOGNORMDIST(x, mean, sd, cumulative) {
  
  return (cumulative) ? jStat.lognormal.cdf(x, mean, sd) : jStat.lognormal.pdf(x, mean, sd);
}

function LOGNORMINV(probability, mean, sd) {
  return jStat.lognormal.inv(probability, mean, sd);
}

function MAX() {
  var range = ARGSCONCAT(arguments);
  var n = range.length;
  var max = (n > 0) ? range[0] : 0;
  for (var i = 0; i < n; i++) {
    max = (range[i] > max && !(range[i] === true) && !(range[i] === false)) ? range[i] : max;
  }
  return max;
}

function MAXA() {
  var range = ARGSCONCAT(arguments);
  return (range.length > 0) ? Math.max.apply(Math, range) : 0;
}

function MEDIAN() {
  return jStat.median(ARGSCONCAT(arguments));
}

function MIN() {
  var range = ARGSCONCAT(arguments);
  var n = range.length;
  var min = (n > 0) ? range[0] : 0;
  for (var i = 0; i < n; i++) {
    min = (range[i] < min && !(range[i] === true) && !(range[i] === false)) ? range[i] : min;
  }
  return min;
}

function MINA() {
  var range = ARGSCONCAT(arguments);
  return (range.length > 0) ? Math.min.apply(Math, range) : 0;
}

function MODEMULT() {
  // Credits: Roönaän
  var range = ARGSCONCAT(arguments),
      n = range.length,
      count= {},
      maxItems = [],
      max = 0,
      currentItem;
  for (var i = 0; i < n; i++) {
    currentItem = range[i];
    count[currentItem] = count[currentItem] ? count[currentItem] + 1 : 1;
    if (count[currentItem] > max) {
      max = count[currentItem];
      maxItems = [];
    }
    if (count[currentItem] === max) {
      maxItems[maxItems.length] = currentItem;
    }
  }
  return maxItems;
}

function MODESNGL() {
  return MODEMULT(ARGSCONCAT(arguments)).sort(function(a, b) {return a - b})[0];
}

function NEGBINOMDIST(k, r, p, cumulative) {
  return (cumulative) ? jStat.negbin.cdf(k, r, p) : jStat.negbin.pdf(k, r, p);
}

function NORMDIST(x, mean, sd, cumulative) {
  // Check parameters
  if (isNaN(x) || isNaN(mean) || isNaN(sd)) return '#VALUE!';
  if (sd <= 0) return '#NUM!';

  // Return normal distribution computed by jStat [http://jstat.org]
  return (cumulative) ? jStat.normal.cdf(x, mean, sd) : jStat.normal.pdf(x, mean, sd);
}

function NORMINV(probability, mean, sd) {
  return jStat.normal.inv(probability, mean, sd);
}

function NORMSDIST(z, cumulative) {
  return (cumulative) ? jStat.normal.cdf(z, 0, 1) : jStat.normal.pdf(z, 0, 1);
}

function NORMSINV(probability) {
  return jStat.normal.inv(probability, 0, 1);
}

function PEARSON(data_x, data_y) {
  var xmean = jStat.mean(data_x);
  var ymean = jStat.mean(data_y);
  var n = data_x.length;
  var num = 0;
  var den1 = 0;
  var den2 = 0;
  for (var i = 0; i < n; i++) {
    num += (data_x[i] - xmean) * (data_y[i] - ymean);
    den1 += Math.pow(data_x[i] - xmean, 2);
    den2 += Math.pow(data_y[i] - ymean, 2);
  }
  return num / Math.sqrt(den1 * den2);
}

function PERCENTILEEXC(array, k) {
  var array = array.sort(function(a, b) {return a - b});
  var n = array.length;
  if (k < 1 / (n + 1) || k > 1 - 1 / (n + 1)) return '#NUM!';
  var l = k * (n + 1) - 1;
  var fl = Math.floor(l);
  return CLEANFLOAT((l === fl) ? array[l] : array[fl] + (l - fl) * (array[fl + 1] - array[fl]));
}

function PERCENTILEINC(array, k) {
  var array = array.sort(function(a, b) {return a - b});
  var n = array.length;
  var l = k * (n - 1);
  var fl = Math.floor(l);
  return CLEANFLOAT((l === fl) ? array[l] : array[fl] + (l - fl) * (array[fl + 1] - array[fl]));
}

function PERCENTRANKEXC(array, x, significance) {
  var array = array.sort(function(a, b) {return a - b});
  var uniques = _.uniq(array);
  var n = array.length;
  var m = uniques.length;
  var significance = (typeof significance === 'undefined') ? 3 : significance;
  var power = Math.pow(10, significance);
  var result = 0;
  var match = false;
  var i = 0;
  while (!match && i < m) {
    if (x === uniques[i]) {
      result = (array.indexOf(uniques[i]) + 1) / (n + 1);
      match = true;
    } else if (x >= uniques[i] && (x < uniques[i+1] || i === m - 1)) {
      result = (array.indexOf(uniques[i]) + 1 + (x - uniques[i]) / (uniques[i+1] - uniques[i])) / (n + 1);
      match = true;
    }
    i++;
  }
  return Math.floor(result * power) / power;
}

function PERCENTRANKINC(array, x, significance) {
  var array = array.sort(function(a, b) {return a - b});
  var uniques = _.uniq(array);
  var n = array.length;
  var m = uniques.length;
  var significance = (typeof significance === 'undefined') ? 3 : significance;
  var power = Math.pow(10, significance);
  var result = 0;
  var match = false;
  var i = 0;
  while (!match && i < m) {
    if (x === uniques[i]) {
      result = array.indexOf(uniques[i]) / (n - 1);
      match = true;
    } else if (x >= uniques[i] && (x < uniques[i+1] || i === m - 1)) {
      result = (array.indexOf(uniques[i]) + (x - uniques[i]) / (uniques[i+1] - uniques[i])) / (n - 1);
      match = true;
    }
    i++;
  }
  return Math.floor(result * power) / power;
}

function PERMUT(number, number_chosen) {
  return FACT(number) / FACT(number - number_chosen);
}

function PERMUTATIONA(number, number_chosen) {
  return Math.pow(number, number_chosen);
}

function PHI(x) {
  return Math.exp(-0.5 * x * x) / SQRT2PI;
}

function POISSONDIST(x, mean, cumulative) {
  return (cumulative) ? jStat.poisson.cdf(x, mean) : jStat.poisson.pdf(x, mean);
}

function PROB(range, probability, lower, upper) {
  if (typeof lower === 'undefined') return 0;
  var upper = (typeof upper === 'undefined') ? lower : upper;
  if (lower === upper) return (range.indexOf(lower) >= 0) ? probability[range.indexOf(lower)] : 0;
  var sorted = range.sort(function(a, b) {return a - b});
  var n = sorted.length;
  var result = 0;
  for (i = 0; i < n; i++) {
    if (sorted[i] >= lower && sorted[i] <= upper) {
      result += probability[range.indexOf(sorted[i])];
    }
  }
  return result;
}

function QUARTILEEXC(range, quart) {
  switch (quart) {
    case 1:
      return PERCENTILEEXC(range, 0.25);
      break;
    case 2:
      return PERCENTILEEXC(range, 0.5);
      break;
    case 3:
      return PERCENTILEEXC(range, 0.75);
      break;
    default:
      return '#NUM!';
      break;
  }
}

function QUARTILEINC(range, quart) {
  switch (quart) {
    case 1:
      return PERCENTILEINC(range, 0.25);
      break;
    case 2:
      return PERCENTILEINC(range, 0.5);
      break;
    case 3:
      return PERCENTILEINC(range, 0.75);
      break;
    default:
      return '#NUM!';
      break;
  }
}

function RANKAVG(number, range, order) {
  var order = (typeof order === 'undefined') ? false : order;
  var sort = (order) ? function(a, b) {return a - b} : function(a, b) {return b - a};
  var range = range.sort(sort);
  var count = COUNTIN(range, number);
  return (count > 1) ? (2 * range.indexOf(number) + count + 1) / 2 : range.indexOf(number) + 1;
}

function RANKEQ(number, range, order) {
  var order = (typeof order === 'undefined') ? false : order;
  var sort = (order) ? function(a, b) {return a - b} : function(a, b) {return b - a};
  var range = range.sort(sort);
  return range.indexOf(number) + 1;
}

function RSQ(data_x, data_y) {
  return Math.pow(PEARSON(data_x, data_y), 2);
}

function SKEW() {
  var range = ARGSCONCAT(arguments);
  var mean = jStat.mean(range);
  var n = range.length;
  var sigma = 0;
  for (var i = 0; i < n; i++) {
    sigma += Math.pow(range[i] - mean, 3);
  }
  return n * sigma / ((n - 1) * (n - 2) * Math.pow(jStat.stdev(range, true), 3));
}

function SKEWP() {
  var range = ARGSCONCAT(arguments);
  var mean = jStat.mean(range);
  var n = range.length;
  var m2 = 0;
  var m3 = 0;
  for (var i = 0; i < n; i++) {
    m3 += Math.pow(range[i] - mean, 3);
    m2 += Math.pow(range[i] - mean, 2);
  }
  m3 = m3 / n;
  m2 = m2 / n;
  return m3 / Math.pow(m2, 3 / 2);
}

function SLOPE(data_y, data_x) {
  var xmean = jStat.mean(data_x);
  var ymean = jStat.mean(data_y);
  var n = data_x.length;
  var num = 0;
  var den = 0;
  for (var i = 0; i < n; i++) {
    num += (data_x[i] - xmean) * (data_y[i] - ymean);
    den += Math.pow(data_x[i] - xmean, 2);
  }
  return num / den;
}

function SMALL(array, k) {
  return array.sort(function(a, b) {return a - b})[k - 1];
}

function STANDARDIZE(x, mean, sd) {
  return (x - mean) / sd;
}

function STDEVA() {
  var range = ARGSCONCAT(arguments);
  var n = range.length;
  var sigma = 0;
  var mean = jStat.mean(range);
  for (var i = 0; i < n; i++) {
    sigma += Math.pow(range[i] - mean, 2);
  }
  return Math.sqrt(sigma / (n - 1));
}

function STDEVP() {
  var range = ARGSCONCAT(arguments);
  var n = range.length;
  var sigma = 0;
  var count = 0;
  var mean = AVERAGE(range);
  for (var i = 0; i < n; i++) {
    if (range[i] !== true && range[i] !== false) {
      sigma += Math.pow(range[i] - mean, 2);
      count++;
    }
  }
  return Math.sqrt(sigma / count);
}

function STDEVPA() {
  var range = ARGSCONCAT(arguments);
  var n = range.length;
  var sigma = 0;
  var mean = jStat.mean(range);
  for (var i = 0; i < n; i++) {
    sigma += Math.pow(range[i] - mean, 2);
  }
  return Math.sqrt(sigma / n);
}

function STDEVS() {
  var range = ARGSCONCAT(arguments);
  var n = range.length;
  var sigma = 0;
  var count = 0;
  var mean = AVERAGE(range);
  for (var i = 0; i < n; i++) {
    if (range[i] !== true && range[i] !== false) {
      sigma += Math.pow(range[i] - mean, 2);
      count++;
    }
  }
  return Math.sqrt(sigma / (count - 1));
}

function STEYX(data_y, data_x) {
  var xmean = jStat.mean(data_x);
  var ymean = jStat.mean(data_y);
  var n = data_x.length;
  var lft = 0;
  var num = 0;
  var den = 0;
  for (var i = 0; i < n; i++) {
    lft += Math.pow(data_y[i] - ymean, 2)
    num += (data_x[i] - xmean) * (data_y[i] - ymean);
    den += Math.pow(data_x[i] - xmean, 2);
  }
  return Math.sqrt((lft - num * num / den) / (n - 2));
}

function TDIST(x, df, cumulative) {
  return (cumulative) ? jStat.studentt.cdf(x, df) : jStat.studentt.pdf(x, df);
}

function TDIST2T() {
  return;
}

function TDISTRT() {
  return;
}

function TINV(probability, df) {
  return jStat.studentt.inv(probability, df);
}

function TINV2T() {
  return;
}

function TTEST() {
  return;
}

function TREND() {
  return;
}

function TRIMMEAN(range, percent) {
  var n = range.length;
  var trim = FLOOR(range.length * percent, 2) / 2;
  return jStat.mean(_.initial(_.rest(range.sort(function(a, b) {return a - b}), trim), trim));
}

function VARA() {
  var range = ARGSCONCAT(arguments);
  var n = range.length;
  var sigma = 0;
  var mean = jStat.mean(range);
  for (var i = 0; i < n; i++) {
    sigma += Math.pow(range[i] - mean, 2);
  }
  return sigma / (n - 1);
}

function VARP() {
  var range = ARGSCONCAT(arguments);
  var n = range.length;
  var sigma = 0;
  var count = 0;
  var mean = AVERAGE(range);
  for (var i = 0; i < n; i++) {
    if (range[i] !== true && range[i] !== false) {
      sigma += Math.pow(range[i] - mean, 2);
      count++;
    }
  }
  return sigma / count;
}

function VARPA() {
  var range = ARGSCONCAT(arguments);
  var n = range.length;
  var sigma = 0;
  var mean = jStat.mean(range);
  for (var i = 0; i < n; i++) {
    sigma += Math.pow(range[i] - mean, 2);
  }
  return sigma / n;
}

function VARS() {
  var range = ARGSCONCAT(arguments);
  var n = range.length;
  var sigma = 0;
  var count = 0;
  var mean = AVERAGE(range);
  for (var i = 0; i < n; i++) {
    if (range[i] !== true && range[i] !== false) {
      sigma += Math.pow(range[i] - mean, 2);
      count++;
    }
  }
  return sigma / (count - 1);
}

function WEIBULLDIST(x, alpha, beta, cumulative) {
  return (cumulative) ? 1 - Math.exp(-Math.pow(x / beta, alpha)) : Math.pow(x, alpha - 1) * Math.exp(-Math.pow(x / beta, alpha)) * alpha / Math.pow(beta, alpha);
}

function ZTEST(range, x, sigma) {
  var n = range.length;
  var sd = (typeof sigma === 'undefined') ? STDEVS(range) : sigma;
  return 1 - NORMSDIST((AVERAGE(range) - x) / (sd / Math.sqrt(n)), TRUE);
}


// Text functions

function CHAR(number) {
  return String.fromCharCode(number);
}

function CLEAN(text) {
  var re = /[\0-\x1F]/g;
  return text.replace(re, "");
}

function CODE(text) {
  return text.charCodeAt(0);
}

function CONCATENATE() {
  var string = '';
  for (var i = 0; i < arguments.length; i++) {
    string += arguments[i];
  }
  return string;
}

function DOLLAR(number, decimals) {
  var decimals = (typeof decimals === 'undefined') ? 2 : decimals;
  var format = '';
  if (decimals <= 0) {
    number = Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
    format = '($0,0)'
  } else if (decimals > 0) {
    format = '($0,0.' + Array(decimals + 1).join('0') + ')';
  }
  return numeral(number).format(format);
}

function EXACT(text1, text2) {
  return text1 === text2;
}

function FIND(find_text, within_text, position) {
  var position = (typeof position === 'undefined') ? 0 : position;
  return within_text.indexOf(find_text, position - 1) + 1;
}

function FIXED(number, decimals, no_commas) {
  var decimals = (typeof decimals === 'undefined') ? 2 : decimals;
  var no_commas = (typeof no_commas === 'undefined') ? false : no_commas;
  var format = no_commas ? '0' : '0,0';
  if (decimals <= 0) {
    number = Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
  } else if (decimals > 0) {
    format += '.' + Array(decimals + 1).join('0');
  }
  return numeral(number).format(format);
}

function JOIN(separator, array) {
  return array.join(separator);
}

function LEFT(text, number) {
  var number = (typeof number === 'undefined') ? 1 : number;
  return text.substring(0, number);
}

function LEN(text) {
  return text.length;
}

function LOWER(text) {
  return text.toLowerCase();
}

function MID(text, start, number) {
  return text.substring(start - 1, number);
}

function NUMBERVALUE(text, decimal_separator, group_separator) {
  var decimal_separator = (typeof decimal_separator === 'undefined') ? '.' : decimal_separator;
  var group_separator = (typeof group_separator === 'undefined') ? ',' : group_separator;
  return Number(text.replace(decimal_separator, '.').replace(group_separator, ''));
}

function PROPER(text) {
  return text.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function REGEXEXTRACT(text, regular_expression) {
  var match = text.match(new RegExp(regular_expression))
  return match ? match[0] : null;
}

function REGEXMATCH(text, regular_expression) {
  return text.match(new RegExp(regular_expression)) ? true : false;
}

function REGEXREPLACE(text, regular_expression, replacement) {
  return text.replace(new RegExp(regular_expression), replacement);
}

function REPLACE(text, position, length, new_text) {
  return text.substr(0, position - 1) + new_text + text.substr(position - 1 + length);
}

function REPT(text, number) {
  return Array(number + 1).join(text);
}

function RIGHT(text, number) {
  var number = (typeof number === 'undefined') ? 1 : number;
  return text.substring(text.length - number);
}

function ROMAN(number) {
  // The MIT License
  // Copyright (c) 2008 Steven Levithan
  var	digits = String(number).split('');
  var key = ['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM','','X','XX','XXX','XL','L','LX','LXX','LXXX','XC','','I','II','III','IV','V','VI','VII','VIII','IX'];
  var roman = '';
  var i = 3;
  while (i--) {
    roman = (key[+digits.pop() + (i * 10)] || '') + roman;
  }
  return Array(+digits.join('') + 1).join('M') + roman;
}

function SEARCH(find_text, within_text, position) {
  var position = (typeof position === 'undefined') ? 0 : position;
  return within_text.toLowerCase().indexOf(find_text.toLowerCase(), position - 1) + 1;
}

function SPLIT(text, separator) {
  return _s.words(text, separator);
}

function SUBSTITUTE(text, old_text, new_text, occurrence) {
  if (typeof occurrence === 'undefined') {
    return text.replace(new RegExp(old_text, 'g'), new_text);
  } else {
    var index = 0;
    var i = 0;
    while(text.indexOf(old_text, index) > 0) {
      index = text.indexOf(old_text, index + 1);
      i++;
      if (i === occurrence) {
        return text.substring(0, index) + new_text + text.substring(index + old_text.length);
      }
    }
  }
}

function T(value) {
  return (typeof value === "string") ? value : null;
}

function TEXT(value, format) {
  return (format.indexOf('0') >= 0) ? numeral(value).format(format) : moment(new Date(value)).format(format);
}

function TRIM(text) {
  return _s.clean(text);
}

UNICHAR = CHAR;

UNICODE = CODE;

function UPPER(text) {
  return text.toUpperCase();
}

function VALUE(text) {
  return numeral().unformat(text);
}