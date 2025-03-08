
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

let lat = getCookie('locLatitude')

let lng = getCookie('locLongitude')



var today=new Date();
                //var theday=today.toLocaleDateString("en-US",options);
var theday=today.getFullYear()  + "-" + (today.getMonth()+1) + "-" + today.getDate();


var _now = new Date();
//_now.setDate(_now.getDate() + 7);

var thenextday=today;

var thenext=theday;

var sunset1,sunset2;
    //the next sunset
    if(today.getDay()!=6 && today.getDay()!=5){
        thenextday.setDate(today.getDate() + (5 - today.getDay()));
        theday=thenextday.getFullYear()  + "-" + (thenextday.getMonth()+1) + "-" + thenextday.getDate();
        sunset1 = theday;
    }else{
        thenextday.setDate(today.getDate());
        theday=thenextday.getFullYear()  + "-" + (thenextday.getMonth()+1) + "-" + thenextday.getDate();
        sunset1 = theday;
    }

    //the current sunset
    if(today.getDay()==6){
        thenextday.setDate(today.getDate() + 6);
        theday=thenextday.getFullYear()  + "-" + (thenextday.getMonth()+1) + "-" + thenextday.getDate();
        sunset2 = theday;
    }else if(today.getDay()<=5){
        thenextday.setDate(today.getDate() + (6 - today.getDay()));
        theday=today.getFullYear()  + "-" + (today.getMonth()+1) + "-" + today.getDate();
        sunset2 = theday;
    }

console.log(today.getDay())
console.log(theday)
var xmlhttp = new XMLHttpRequest();

if( theday==""){
    
}
console.log("theday: " + theday)
var url = "https://api.sunrise-sunset.org/json?lat="+ lat +"&lng="+ lng +"&date="+theday;

console.log(url)
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = this.responseText;
    
    myFunction(myArr)
  
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}



function myFunction(arr) {
  var out = "";
  var i;
  var jsontext=JSON.parse(arr)

  var sunset_1=new Date(sunset1 + " " + jsontext.results.sunset + " UTC")
  var sunset_2=new Date(sunset2 + " " + jsontext.results.sunset + " UTC")

  var options = {timeZone, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var options2={timeZone, hour: 'numeric', minute: 'numeric',second: 'numeric'};

console.log("--" + sunset2);
console.log("--" + sunset1);

  document.getElementById("friSunset").innerHTML = sunset_1.toLocaleDateString("en-US", options) + " " + formatAMPM(sunset_1) ;
  document.getElementById("satSunset").innerHTML = sunset_2.toLocaleDateString("en-US", options) + " " + formatAMPM(sunset_2) ;
}