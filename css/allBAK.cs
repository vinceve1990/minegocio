/* main styles */
body {
	margin:0;
	padding:0;
	background:#BBD9EE;
  	color:#000;
	font-family:tahoma,arial,sans-serif;
	font-size:11px;
	}
form {
	margin:0;
	padding:0
	}
img {border:none;}
a {color:#060606;text-decoration: none}
a:hover {text-decoration: underline}
input {vertical-align:middle}
.floatleft {float:left !important}
.floatright {float:right !important}
.clear {clear:both !important}
.bold {font-weight:bold !important}
.normal {font-weight:normal !important}
.block {display:block !important}
input.text,
select,
textarea {
	font-family:arial,sans-serif;
	color:#333;
	font-size:12px;
	vertical-align:middle;
	}
input.text {
	padding:1px 0 0 4px;
	height:14px;
	font-weight:normal;
	}
/* main container */
#main {
	width:992px;
	margin:0 auto;
	}
/* header */
#header {
	position:relative;
	width:992px;
	height:106px;
	background:url(../img/bg-header.gif) no-repeat left bottom;
  vertical-align: bottom;
	}
/* site logo */
a.logo {
	position:absolute;
	top:8px;
	right:30px;
	}
	
/* header tabs */
#top-navigation {
	position:absolute;
	top:60px;
	left:20px;
	margin:0;
	padding:0;
	list-style:none;
	}
#top-navigation li {
	float:left;
	margin:0 3px 0 0;
	height:34px;
	background:url(../img/tab.gif) repeat-x top;
	}
#top-navigation li a {
	float:left;
	display:block;
	height:20px;
	line-height:19px;
	color:#606060;
	padding:4px 0 0 0;
	}
#top-navigation li span {
	float:left;
	background:url(../img/tab-left.gif) no-repeat left top;
	}
#top-navigation li span span {
	background:url(../img/tab-right.gif) no-repeat right top;
	padding:7px 10px 0 10px;
	}
#top-navigation li.active {
	padding:0;
	height:34px;
	background:url(../img/tab-active.gif) repeat-x top;
	margin-right:2px;
	}
#top-navigation li.active span {
	background:url(../img/tab-active-left.gif) no-repeat left top;
	height:34px;
	}
#top-navigation li.active span span {
	background:url(../img/tab-active-right.gif) no-repeat right top;
	height:23px;
	padding:11px 10px 0 10px;
	line-height:19px;
	color:#606060;
	}
	
/* middle */
#middle {
	float:left;
	width:967px;
	background:url(../img/bg-middle.gif) repeat-y left;
	padding:0 13px 20px 25px;
	}
/* left column */
#left-column {
	float:left;
	padding:1px 14px 0 12px;
	width:151px;
	/*display:none*/
	}
/* right column */
#right-column {
	float:right;
	padding:0 9px 0 0;
	width:133px;
	}
/* center column */
#center-column {
	float:left;
	width:745px;
	background:url(../img/bg-center-column.jpg) no-repeat left top;
	min-height:584px;
	padding:12px 16px 0 13px;
  /*border-right:2px solid #6DCF0C;*/
	}	
* html #center-column {height:584px;}


/* footer */
#footer {
	float:left;
	width:100%;
	background:url(../img/bg-footer.gif) no-repeat;
	height:15px;
	}
	
/* left column styles */
#left-column a {color:#3E3E3E;}
#left-column h3 {
	font-size:11px;
	margin:0;
	color:#fff;
	background:url(../img/bg-left-header.png) no-repeat left top;
	height:25px;
	line-height:23px;
	padding:0 0 0 9px;
	}
ul.nav {
	margin:0 0 11px 0;
	border-bottom:2px solid #6DCF0C;
	background:#ECEFE7;
	list-style:none;
	padding:0 2px;
	}
ul.nav li {
	padding:4px 4px 6px 5px;
	background:url(../img/bg-dotted.gif) repeat-x bottom;
	}
ul.nav a {
	padding:0 0 0 12px;
	background:url(../img/arrow.gif) no-repeat 0 4px;
	}
ul.nav a:hover {
	font-weight:bold;
	}
ul.nav li.last {background:none;}

#left-column .link {
	display:block;
	width:142px;
	height:25px;
	background:url(../img/bg-left-link.gif);
	margin:0 0 4px 0;
	font-weight:bold;
	padding:0 0 0 9px;
	line-height:25px;
	color:#60635A;
	}
	
/* center column styles */
.top-bar {
	float:left;
	width:920px;
	border-left:2px solid #7E0;
	padding:0 0 0 9px;
	margin:0 0 4px 0;
	}
/* text page header */
.top-bar h1 {
	font:20px/21px verdana,sans-serif;
	color:#43729F;
	margin:0 0 4px 0;
	}
/* orange button */
.top-bar a.button {
	float:right;
	display:block;
	width:75px;
	height:35px;
	text-align:center;
	color:#fff;
	text-transform:uppercase;
	font-weight:bold;
	line-height:27px;
	background:url(../img/bg-orange-button.png) no-repeat;
	}
	
/* bar with select */
.select-bar {
	clear:both;
	border-top:2px solid #7E0;
	border-bottom:2px solid #7E0;
	padding:5px 0 3px 0;
	margin:0 0 17px 0;
	}
.select-bar select {width:145px;margin:0 2px;}

/* table container */
div.table {
	float:left;
	position:relative;
	width:614px;
	margin:0 0 37px 0;
	}
table.listing {
	border-bottom:1px solid #9097A9;
	width:613px;
	padding:0;
	margin:0;
	border:1px solid #9097A9;
	}
table.listing th {
	border-top:0 !important;
	}
table.listing th.full {border-left:0;border-right:0 !important;text-align:left;text-transform:uppercase;}
div.table img.left {
	position:absolute;
	top:0;
	left:0;
	}
div.table img.right {
	position:absolute;
	top:0;
	right:1px;
	}
/* table styles */
table.listing td,
table.listing th {
	border:1px solid #fff;
	text-align:center;
	}	
table.listing th {
	background:#9097A9;
	color:#fff;
	padding:5px;
	}
table.listing td {
	background:#D8D8D8;
	color:#000;
	padding:3px 5px;
	}
table.listing .bg td {
	background:#ECECEC;
	}
table.listing .white td {
	background:#fff;
	}	
table.listing .first {border-left:0px solid #9097A9;text-align:left;}
table.listing .last {border-right:0px solid #9097A9;}

table.listing th.first {background:#9097A9 url(../img/bg-th-left.gif) no-repeat left top;border-left:0;}
table.listing th.last {background:#9097A9 url(../img/bg-th-right.gif) no-repeat right top;border-right:0;}

table.listing .style1 {font-weight:bold;color:#FF7A00;}
table.listing .style2 {font-weight:bold;padding-left:16px;}
table.listing .style3 {padding-left:25px;}
table.listing .style4 {padding-left:35px;}
table.form .last {padding:1px 0 1px 5px;text-align:left;}
table.form th,
table.form td {padding-left:10px;}
table.form input.text {width:262px}

/* table select */
div.table .select {
	float:right;
	margin:2px 1px 0 0;
	width:176px;
	height:25px;
	background:#9097A9 url(../img/bg-select.gif);
	color:#fff;
	}
div.table .select strong {
	float:left;
	padding:5px 0 0 5px;
	}	
div.table .select select {
	float:right;
	width:78px;
	margin:2px 3px 0 0;
	text-align:right;	
	}
	
/* right column header */
#right-column .h {
	float:left;
	background:#7E878A;
	border:1px solid #B8B8B8;
	border-bottom:0;
	padding:3px 10px;
	color:#fff;
	text-transform:uppercase;
	}
/* right column box */
#right-column .box {
	float:left;
	width:121px;
	padding:5px;
	border:1px solid #B8B8B8;
	background:#EBEBEB;
	margin:0 0 15px 0;
	}
	
/* right column buttons */
.buttons {
	clear:both;
	text-align:center;
	padding:30px 0 15px 0;
	}
.buttons input {margin:0 0 6px 0;}
/*
#usuario {
	float:left;
	padding:30px 0 10px 0;
	}
  
  */
  
#rounded-corner
{
	font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
	font-size: 12px;
	margin: 45px;
	/*width: 480px;*/
	text-align: left;
	border-collapse: collapse;
}
#rounded-corner thead th.rounded-company
{
	background: #b9c9fe url('../images/table-images/left.png') left -1px no-repeat;
}
#rounded-corner thead th.rounded-q4
{
	background: #b9c9fe url('../images/table-images/right.png') right -1px no-repeat;
}
#rounded-corner th
{
	padding: 8px;
	font-weight: normal;
	font-size: 13px;
	color: #039;
	background: #b9c9fe;
}
#rounded-corner td
{
	padding: 8px;
	background: #e8edff;
	border-top: 1px solid #fff;
	color: #669;
}
#rounded-corner tfoot td.rounded-foot-left
{
	background: #e8edff url('../images/table-images/botleft.png') left bottom no-repeat;
}
#rounded-corner tfoot td.rounded-foot-right
{
	background: #e8edff url('../images/table-images/botright.png') right bottom no-repeat;
}
#rounded-corner tbody tr:hover td
{
	background: #d0dafd;
}

fieldset
{
	margin:25px 0 10px 0px;
	overflow:hidden;
	width:880px;  
	background:#fafafa;
	border:0px;
	padding:0px 20px 20px 20px;
	-moz-border-radius:15px;
	-webkit-border-radius:15px;
	-moz-box-shadow: 1px 2px 3px 3px #444444;
	-webkit-box-shadow: 1px 2px 3px 3px #444444;
}
legend 
{
	padding:12px 9px 19px;
	margin:-10px 0 0 30px;
	background:#efefef;
	-moz-border-radius:12px;
	-webkit-border-radius:12px;
	background: url('../img/gradient_white.png') repeat-x top left #fafafa;
}
legend span
{
	font-size:100%;
	font-weight:bold;
	color:#fff;
	background: url('../img/gradient.png') repeat-x top left #444;
	-moz-border-radius-topleft:10px;
	-webkit-border-top-left-radius:10px;
	-moz-border-radius-topright:10px;
	-webkit-border-top-right-radius:10px;
	padding:5px 11px 0; 
	border-top:1px;
	border-color: 000;
}
form.datos
{
	font-family:arial;
	font-size:100%;
	color:#666;
}
form.datos label
{
	float:left;
	display:block;
	margin:3px 10px 0 0;
	clear:both; 
	/*width:180px; */
	text-align:right;
}
form.datos input
{
	color:#666;
	margin:0 0 7px 0;
	border:1px solid #d8d8d8;
	/* width:220px; */
	float:left;
	-moz-border-radius:9px;
	-webkit-border-radius:9px;
	background: url('../img/gradient_white.png') repeat-x top left #efefef;
	padding:3px 10px;
}

input.medida
{
	/*color:#666;
	margin:0 0 7px 0;
	border:1px solid #d8d8d8;*/
	width:35px;
	/*float:left;
	-moz-border-radius:9px;
	-webkit-border-radius:9px;
	background: url('../img/gradient_white.png') repeat-x top left #efefef;
	padding:3px 10px;*/
}

input.eje
{
	width: 22px;
}

input.resultado
{
	width: 75px;
}

form.datos select
{
	color:#666;
	margin:0 0 7px 0;
	border:1px solid #d8d8d8;
	width:250px;
	float:left;
	-moz-border-radius:9px;
	-webkit-border-radius:9px;
	background: url('../img/gradient_white.png') repeat-x top left #efefef;
	padding:3px 5px 3px 10px;
}
form.datos option
{
	display:block;
	color:#666;
}

form.datos input[type="checkbox"] 
{
	background:none;
	border:0px;
	width:14px;
	height:14px;
	margin:5px 15px;
	padding:0px;
}
form.datos input[type="radio"]
{
	background:none;
	border:0px;
	width:14px;
	height:14px;
	margin:5px 15px;
	padding:0px;
}

input[type="text"]:disabled
{
	opacity: .5;
	border:1px solid #eee !important;
	filter: alpha(opacity=50);
}

form.datos textarea
{
	color:#666;
	font-size:110%;
	font-family:arial; 
	float:left; 
	height:80px;
	border:1px solid #d8d8d8;
	width:130px;
	-moz-border-radius:12px;
	-webkit-border-radius:12px;
	background: url('../img/gradient_white.png') repeat-x top left #efefef;
	padding:2px 10px;
	margin-bottom:10px;
}

#send
{
	background: url('../img/gradient_black.png') repeat-x top left #a80329;
	-moz-border-radius:15px;
	-webkit-border-radius:15px;
	-moz-box-shadow: 5px 5px 8px #999;
	-webkit-box-shadow: 5px 5px 8px #999;
	border:0;
	cursor:pointer;
	color:#fff;
	margin-top:15px;
	float:right;
	font-weight:bold;
	font-size:110%;
	/*position: fixed;*/
	padding:5px 15px;
}
.faulty_field
{
	background:#fff4f4 !important;
	color:#ff0000;
	border:1px solid #ff0000 !important;
}
label span
{
	color:#ff0000;
	font-size:85%;
}

.msgerror
{
	font-size:11px;
	color:#ff0000;
	text-align:center;
}



