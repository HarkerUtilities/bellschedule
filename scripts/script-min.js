addEventListener("scroll",function(e){document.getElementById("header").style.left=scrollX+"px"}),Array.prototype.diff=function(e){return this.filter(function(t){return e.indexOf(t)<0})};var schedules,displayDate,updateScheduleID,urlParams,days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],mobile=isMobile(),hasFocus=!0,options={},inputStr="",KEY_LEFT=37,KEY_UP=38,KEY_RIGHT=39,KEY_DOWN=40,KEY_A=65,KEY_B=66,KONAMI=""+KEY_UP+KEY_UP+KEY_DOWN+KEY_DOWN+KEY_LEFT+KEY_RIGHT+KEY_LEFT+KEY_RIGHT+KEY_B+KEY_A,START_DATE=new Date("January 22, 2018"),START_SCHEDULE=1,COLLABORATION_REPLACEMENTS=["Collaboration -> Office Hours","Collaboration -> Office Hours","Collaboration -> Faculty Meeting","Collaboration -> Office Hours","Collaboration -> After School"],TOTAL_SCHEDULES=8,SCHEDULES=["A","B","C","D","A","B","C","D"],MILLIS_PER_DAY=864e5;function updateUrlParams(){urlParams={};for(var e,t=/(?!^)\+/g,a=/([^&=]+)=?([^&]*)/g,n=function(e){return decodeURIComponent(e.replace(t," "))},i=location.search.substring(1);e=a.exec(i);)urlParams[n(e[1])]=n(e[2])}function initViewport(){if(mobile){var e=document.createElement("meta");e.name="viewport",e.content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0",document.getElementsByTagName("head")[0].appendChild(e),document.getElementsByTagName("body")[0].class="mobile"}}function initTitle(){document.getElementById("header").addEventListener("click",setTitleTitle),document.getElementById("leftArrow").addEventListener("click",goLast),document.getElementById("rightArrow").addEventListener("click",goNext),document.getElementById("refresh").addEventListener("click",function(){updateSchedule(null,!0)}),setTitleTitle()}function parseRawSchedule(){var e=document.getElementById("schedules").textContent.split("\n"),t=0;for((schedules=new Array)[0]=new Array;e.length>0;)if(0==e[0].length)schedules[++t]=new Array,e.shift();else{var a=e.shift();if(0==t&&a.indexOf("|")>=0)for(var n=new Date(a.substring(0,a.indexOf("|"))),i=new Date(a.substring(a.indexOf("|")+1,a.indexOf("\t")));n<=i;n.setDate(n.getDate()+1))schedules[0].push(n.getMonth().valueOf()+1+"/"+n.getDate()+"/"+n.getFullYear().toString().substr(-2)+a.substring(a.indexOf("\t")));else schedules[t].push(a)}}function setDisplayDate(e,t){var a=e?new Date(e):getDateFromUrlParams();if(setDayBeginning(a),t||!displayDate||a.valueOf()!=displayDate.valueOf()){var n=document.getElementById("schedule");for(displayDate=new Date(a),displayMessage="Hungry? <a href='https://n3a9.github.io/harker-lunch/'>tiny.cc/lunchmenu</a>. \n Too many tiny.cc links? <a href='https://n3a9.github.io/harker-tiny/'>tiny.cc/harkertiny</a>.",isSameDate(a,new Date("12/12/16"))&&(displayMessage+="<span style='font-weight:bold;color: red;'>Finals Disclaimer:</span> All morning exams have different call times divided by grade or course that are not displayed here. To see when you need to get to school, check out the official schedule <a href='http://resources.harker.org/download/us-final-exams-schedule/'>here</a>."),getMonday(a)>getMonday(new Date)&&(displayMessage+="<br>This is a future date, so the schedule may be incorrect. (In particular, special/alternate schedules may be missing.)"),warn(displayMessage);n.rows.length;)n.deleteRow(-1);var i=n.insertRow(-1);if(options.enableDayView)createDay(i,a);else{a=getMonday(a);for(var o=0;o<5;o++)createDay(i,a),a.setDate(a.getDate()+1)}}}function getDateFromUrlParams(){var e=new Date;return urlParams.y>0&&urlParams.m>0&&urlParams.d>0&&(e=new Date("20"+urlParams.y,urlParams.m-1,urlParams.d)),urlParams.m>0&&urlParams.d>0&&(e=new Date((new Date).getFullYear(),urlParams.m-1,urlParams.d)),options.enableDayView||(e=getMonday(e)),e}function warn(e){var t=document.getElementById("warning");t.style.display=e?"block":"none",t.innerHTML=e}function createDay(e,t){var a=getDayInfo(t),n=e.insertCell(-1);n.date=t.valueOf(),9==t.getMonth()&&31==t.getDate()&&n.classList.add("halloween");var i=document.createElement("div");i.classList.add("head");var o=document.createElement("div");o.classList.add("headWrapper");var r="";void 0===a.name&&null==a.name||(r="("+a.name+")"),"()"===r&&(r=""),o.innerHTML=days[t.getDay()]+'<div class="headDate">'+a.dateString+" "+r+"</div>",i.appendChild(o),n.appendChild(i);var s="8:00";if(a.index>0)for(var d=1;d<schedules[a.index].length;d++){var l=schedules[a.index][d],c=makePeriodNameReplacements(l.substring(0,l.indexOf("\t")),a.replacements),u=l.substring(l.indexOf("\t")+1),p=u.substring(0,u.indexOf("-")),m=u.substring(u.lastIndexOf("-")+1);if(options.showPassingPeriods){var g=document.createElement("div");g.classList.add("period"),createPeriod(g,"",s,p,t),n.appendChild(g)}s=m;var h=document.createElement("div");if(h.classList.add("period"),c.indexOf("|")>=0){var f=document.createElement("table");f.classList.add("lunch");var v=f.insertRow(-1),y=v.insertCell(-1),w=v.insertCell(-1),E=u.substring(0,u.indexOf("||")),b=u.substring(u.indexOf("||")+2),D=c.substring(0,c.indexOf("||")),S=c.substring(c.indexOf("||")+2);4==findNumberOfOccurences(c,"|")?(show1Time=!0,show2Time=!0,createSubPeriods(y,D,p,E.substring(E.indexOf("-")+1,E.indexOf("|")),E.substring(E.indexOf("|")+1,E.lastIndexOf("-")),m,t,show1Time,show2Time),createSubPeriods(w,S,p,b.substring(b.indexOf("-")+1,b.indexOf("|")),b.substring(b.indexOf("|")+1,b.lastIndexOf("-")),m,t,show1Time,show2Time)):(createPeriod(y,D,p,m,t),show1Time=4==a.id||"ReCreate"==a.id,show2Time=!show1Time,createSubPeriods(w,S,p,b.substring(b.indexOf("-")+1,b.indexOf("|")),b.substring(b.indexOf("|")+1,b.lastIndexOf("-")),m,t,show1Time,show2Time)),h.appendChild(f)}else createPeriod(h,c,p,m,t);n.appendChild(h)}}function makePeriodNameReplacements(e,t){if(t.length>0)for(var a=0;a<t.length;a++)if(!t[a].indexOf(e))return t[a].substring(t[a].indexOf("->")+2);return e}function setTitleTitle(){var e=document.getElementById("titleTitles").textContent.split("\n");document.getElementById("title").title=e[Math.floor(Math.random()*e.length)]}function getMonday(e){var t=new Date(e);return t.getDay()>=6?t.setDate(t.getDate()+2):t.setDate(t.getDate()-t.getDay()+1),setDayBeginning(t),t}function setDayBeginning(e){e.setHours(0,0,0,0)}function getDateFromString(e,t){var a=e.substring(0,e.indexOf(":")),n=e.substring(e.indexOf(":")+1);return a<7&&(a=parseInt(a,10)+12),new Date(t.getFullYear(),t.getMonth(),t.getDate(),a,n)}function getDayInfo(e){for(var t,a=e.getMonth().valueOf()+1+"/"+e.getDate().valueOf()+"/"+e.getFullYear().toString().substr(-2),n=0,i=[],o=0;o<schedules[0].length;o++)schedules[0][o].indexOf(a)||(schedules[0][o].indexOf("[")>=0?(t=schedules[0][o].substring(schedules[0][o].indexOf("\t")+1,schedules[0][o].indexOf("[")-1),i=schedules[0][o].substring(schedules[0][o].indexOf("[")+1,schedules[0][o].indexOf("]")).split(",")):t=schedules[0][o].substring(schedules[0][o].indexOf("\t")+1),n=getScheduleIndex(t));void 0===t&&(n=0==(t=e.getDay())||6==t?t=0:getScheduleIndex(t=calculateScheduleRotationID(e)));var r="";return t<=TOTAL_SCHEDULES&&(r=SCHEDULES[t-1]),i.push(COLLABORATION_REPLACEMENTS[e.getDay()-1]),{index:n,id:t,dateString:a,replacements:i,name:r}}function getScheduleIndex(e){if(0==e)return 0;for(var t=1;t<schedules.length;t++)if(e==schedules[t][0])return t;return 0}function calculateScheduleRotationID(e){var t=Math.round((e.getTime()-START_DATE.getTime())/MILLIS_PER_DAY);t-=countWeekendDays(START_DATE,e);for(var a,n=/\d{1,2}\/\d{1,2}\/\d{2}/,i=0;i<schedules[0].length;i++){var o=schedules[0][i];if(-1!=o.search(n)){var r=o.split("\t")[0];r=r.substring(0,r.length-2)+"20"+r.substring(r.length-2);var s=new Date(r);0==getScheduleIndex(o.split("\t")[1])&&e>=s&&s>=START_DATE&&0!=s.getDay()&&6!=s.getDay()&&t--}}return(a=t<0?START_SCHEDULE+Math.floor(t%TOTAL_SCHEDULES)+TOTAL_SCHEDULES:START_SCHEDULE+Math.floor(t%TOTAL_SCHEDULES))>8&&(a-=8),a>4&&a%2==0&&(a-=4),a}function createPeriod(e,t,a,n,i,o){void 0===o&&(o=!0),startDate=getDateFromString(a,i),endDate=getDateFromString(n,i);var r=document.createElement("div");r.classList.add("periodWrapper"),r.periodName=t,r.start=startDate,r.end=endDate;var s=(endDate-startDate)/6e4;if(1==options.color&&("P1"==r.periodName&&r.classList.add("periodone"),"P2"==r.periodName&&r.classList.add("periodtwo"),"P3"==r.periodName&&r.classList.add("periodthree"),"P4"==r.periodName&&r.classList.add("periodfour"),"P5"==r.periodName&&r.classList.add("periodfive"),"P6"==r.periodName&&r.classList.add("periodsix"),"P7"==r.periodName&&r.classList.add("periodseven")),s>0)return r.style.height=s-1+"px",s>=15&&(t&&(r.innerHTML=t),o&&(r.innerHTML+=(s<30?" ":"<br />")+a+" – "+n)),e.appendChild(r)}function createSubPeriods(e,t,a,n,i,o,r,s,d){void 0===s&&(s=!0),void 0===d&&(d=!0);var l=document.createElement("div");if(l.classList.add("period"),createPeriod(l,t.substring(0,t.indexOf("|")),a,n,r,s),e.appendChild(l),options.showPassingPeriods){var c=document.createElement("div");c.classList.add("period"),createPeriod(c,"",n,i,r),e.appendChild(c)}var u=document.createElement("div");u.classList.add("period"),createPeriod(u,t.substring(t.indexOf("|")+1),i,o,r,d),e.appendChild(u)}function create3SubPeriods(e,t,a,n,i,o,r,s,d,l,c){var u=document.createElement("div");u.classList.add("period"),createPeriod(u,t,a,n,c),e.appendChild(u);var p=document.createElement("div");p.classList.add("period"),createPeriod(p,i,o,r,c),e.appendChild(p);var m=document.createElement("div");m.classList.add("period"),createPeriod(m,s,d,l,c),e.appendChild(m)}function goLast(){var e=new Date(displayDate);e.setDate(e.getDate()-(options.enableDayView?1:7)),updateSchedule(e),updateSearch(e)}function goNext(){var e=new Date(displayDate);e.setDate(e.getDate()+(options.enableDayView?1:7)),updateSchedule(e),updateSearch(e)}function goCurr(){var e=new Date;updateSchedule(e),updateSearch(e)}function updateSearch(e,t){var a=new Date;options.enableDayView||(a=getMonday(a)),e.getDate()!=a.getDate()||e.getMonth()!=a.getMonth()?(urlParams.m=e.getMonth()+1,urlParams.d=e.getDate()):(delete urlParams.m,delete urlParams.d),e.getYear()!=a.getYear()?urlParams.y=e.getFullYear().toString().substr(-2):delete urlParams.y;var n="?";for(var i in urlParams)n+=i+"="+urlParams[i]+"&";n=n.slice(0,-1),history.pushState(e,document.title,location.protocol+"//"+location.host+location.pathname+n+location.hash)}function setHighlightedPeriod(e){e||(e=Date.now());var t=new Date(e);t.setHours(0,0,0,0);var a=document.getElementById("today"),n=[];if(a){for(var i=(n=Array.prototype.slice.call(a.getElementsByClassName("now"))).length-1;i>=0;i--){var o=n[i];o.classList.remove("now");var r=o.getElementsByClassName("periodLength")[0];r&&o.removeChild(r)}a.id=""}for(var s=document.getElementById("schedule").rows[0].cells,d=0;d<s.length;d++){var l=s[d];if(t.valueOf()==l.date){l.id="today";for(var c=l.getElementsByClassName("periodWrapper"),u=0;u<c.length;u++){var p=c[u];if(e-p.start>=0&&e-p.end<0&&(p.classList.add("now"),(p.end-p.start)/6e4>=40)){var m=(p.end-e)/6e4;p.innerHTML+='<div class="periodLength">'+(m>1?Math.round(m)+" min. left</div>":Math.round(60*m)+" sec. left</div>")}}}}if(options.enablePeriodNotifications){var g=Array.prototype.slice.call(document.getElementsByClassName("now")),h=g.diff(n),f=n.diff(g);for(i=0;i<h.length;i++){(v=g[i].periodName)&&!hasFocus&&sendNotification(v+" has started.",options.notificationDuration)}for(i=0;i<f.length;i++){var v;(v=n[i].periodName)&&!hasFocus&&sendNotification(v+" has ended.",options.notificationDuration)}}}function updateSchedule(e,t){setDisplayDate(e,t),setHighlightedPeriod()}function expandOptions(){document.getElementById("options").classList.add("expanded"),document.getElementById("optionsArrow").innerHTML="&#8600;"}function contractOptions(){document.getElementById("options").classList.remove("expanded"),document.getElementById("optionsArrow").innerHTML="&#8598;"}function toggleOptions(){document.getElementById("options").classList.contains("expanded")?contractOptions():expandOptions()}function initOptions(){var e=document.getElementById("options");e.addEventListener("mouseover",expandOptions),e.addEventListener("mouseout",contractOptions),mobile&&e.classList.add("mobile"),document.getElementById("optionsArrow").addEventListener("click",toggleOptions);var t=e.getElementsByTagName("input");localStorage.updateScheduleInterval&&(localStorage.activeUpdateInterval=localStorage.updateScheduleInterval,localStorage.removeItem("updateScheduleInterval"));for(var a=0;a<t.length;a++){var n=t[a];"checkbox"==n.type?(n.addEventListener("change",function(e){options[e.target.name]=localStorage[e.target.name]=e.target.checked}),localStorage[n.name]?options[n.name]=n.checked="true"==localStorage[n.name]:options[n.name]=localStorage[n.name]=n.checked):"number"==n.type?(n.addEventListener("change",function(e){options[e.target.name]=parseInt(localStorage[e.target.name]=e.target.value)}),localStorage[n.name]?options[n.name]=parseInt(n.value=localStorage[n.name]):options[n.name]=parseInt(localStorage[n.name]=n.value)):(n.addEventListener("change",function(e){options[e.target.name]=localStorage[e.target.name]=e.target.value}),localStorage[n.name]?options[n.name]=n.value=localStorage[n.name]:options[n.name]=localStorage[n.name]=n.value)}}function createOptions(e){JSON.parse(e).sections.forEach(function(e){(!e.hasOwnProperty("platforms")||mobile&&e.platforms.indexOf("mobile")>=0||!mobile)&&createOptionSection(e)}),initOptions(),attachOptionActions(),updateSchedule(null,!0)}function displayOptionsError(e,t){updateSchedule(),warn(e?"Retrieval of options.json timed out!":"Something went wrong while retrieving options.json!")}function createOptionSection(e){createOptionSectionTitle(e),e.options.forEach(function(e){(!e.hasOwnProperty("platforms")||mobile&&e.platforms.indexOf("mobile")>=0||!mobile)&&createOption(e)})}function createOptionSectionTitle(e){var t=document.createElement("tr"),a=document.createElement("th");if(a.colspan=2,e.hasOwnProperty("tooltip")){var n=document.createElement("span");n.title=e.tooltip,n.innerHTML=e.name+'<sup class="tooltipIndicator">?</sup>',a.appendChild(n)}else a.textContent=e.name;t.appendChild(a),document.getElementById("optionsContent").appendChild(t)}function createOption(e){var t=document.createElement("tr"),a=document.createElement("td"),n=document.createElement("td");if(e.hasOwnProperty("tooltip")){var i=document.createElement("span");i.title=e.tooltip,i.innerHTML=e.description+'<sup class="tooltipIndicator">?</sup>:',a.appendChild(i)}else a.textContent=e.description+":";var o=document.createElement("input");o.name=e.name,o.type=e.type;var r=mobile&&e.hasOwnProperty("mobileDefault")?e.mobileDefault:e.default;"number"==o.type?(o.min=0,o.value=r):"checkbox"==o.type&&r&&(o.checked="checked"),n.appendChild(o),t.appendChild(a),t.appendChild(n),document.getElementById("optionsContent").appendChild(t)}function attachOptionActions(){updateUpdateInterval(),document.getElementsByName("activeUpdateInterval")[0].addEventListener("change",function(e){updateUpdateInterval()}),document.getElementsByName("showPassingPeriods")[0].addEventListener("change",function(e){updateSchedule(null,!0)}),document.getElementsByName("color")[0].addEventListener("change",function(e){updateSchedule(null,!0)}),document.getElementsByName("enablePeriodNotifications")[0].addEventListener("change",function(e){if(options.enablePeriodNotifications){var t=Notification.permission;"Notification"in window?"denied"==t?alert("Please allow desktop notifications for this site to enable this feature."):"default"==t&&Notification.requestPermission():alert("This browser does not support desktop notifications.")}}),document.body.classList.add(options.enableDayView?"day":"week"),document.getElementsByName("enableDayView")[0].addEventListener("change",function(e){updateSchedule(null,!0),document.body.classList.remove("week"),document.body.classList.remove("day"),document.body.classList.add(options.enableDayView?"day":"week"),scrollTo(0,0)}),mobile||document.addEventListener("keydown",function(e){switch(e.keyCode){case 116:options.interceptF5&&(e.preventDefault(),updateSchedule());break;case 82:options.interceptCtrlR&&(e.ctrlKey||e.metaKey)&&(e.preventDefault(),updateSchedule());break;case 37:goLast();break;case 39:goNext();break;case 40:goCurr()}-1!=(inputStr+=e.keyCode).indexOf(KONAMI)&&(inputStr="")})}function download(e,t,a){var n=new XMLHttpRequest;n.open("GET",e,!0),n.onreadystatechange=function(){4==n.readyState&&(200==n.status?t(n.responseText):a&&a(!1,n.status))},n.ontimeout=function(){a(!0,null)},n.send()}function updateUpdateInterval(){document.hidden?setUpdateInterval(options.hiddenUpdateInterval):setUpdateInterval(hasFocus?options.activeUpdateInterval:options.inactiveUpdateInterval)}function setUpdateInterval(e){clearInterval(updateScheduleID),updateScheduleID=e>0?setInterval(function(){updateSchedule()},1e3*e):null}function sendNotification(e,t){if("Notification"in window){var a=new Notification(e);t>0&&setTimeout(function(){a.close()},1e3*t)}}function isMobile(){var e=navigator.userAgent||navigator.vendor||window.opera;return window.innerWidth<=800&&window.innerHeight<=600||(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))}function updateClock(){var e=new Date,t=e.getHours(),a=t%12,n=e.getMinutes();document.getElementById("currentTime").innerHTML=(0==a?12:a)+":"+addLeadingZero(n)+(t>=12?" PM":" AM")}function addLeadingZero(e){return e<10?"0"+e:e}function isSameDate(e,t){return e.getFullYear()===t.getFullYear()&&t.getMonth()==t.getMonth()&&e.getDate()===t.getDate()}function findNumberOfOccurences(e,t){for(var a=-1,n=-2;-1!=n;a++,n=e.indexOf(t,n+1));return a}function countWeekendDays(e,t){var a=1+Math.round((t.getTime()-e.getTime())/MILLIS_PER_DAY);return 2*Math.floor((e.getDay()+a)/7)+(0==e.getDay())-(6==t.getDay())}updateUrlParams(),window.history.replaceState(getDateFromUrlParams(),document.title,document.location),document.addEventListener("visibilitychange",function(e){document.hidden||updateSchedule(),updateUpdateInterval()}),addEventListener("focus",function(e){updateSchedule(),hasFocus=!0,updateUpdateInterval()}),addEventListener("blur",function(e){hasFocus=!1,updateUpdateInterval()}),addEventListener("popstate",function(e){updateUrlParams(),updateSchedule(e.state)}),addEventListener("load",function(e){initViewport(),initTitle(),parseRawSchedule(),download("options.json",createOptions,displayOptionsError)});