import base from '@/assets/api/base'
let tools = {};
// 参数拼接
tools.createURL = function(url,param){
    let myURL = '';
    for(var key in param){
        let link = '&' + key + "=" + param[key];
        myURL += link; 
    };
    myURL= url + "?" + myURL.substr(1);
    return myURL;
};
//parms拼接
tools.createParms = function(param){
  let obj = {}
  obj.appid = base.gAppid
  obj.token = '#R0RV5TD4JF7M'
  // obj.token = tools.gToken()
  if(param){
      for(var key in param){
          obj[key] = param[key]
      }
  }
  return obj
};
//gettoken
tools.gToken = function() {
    try {
      var value = localStorage.getItem("token");
      if (value) {
        return value;
      }
    } catch (e) {
      return "getStorageSync token error";
    }
};
tools.formatTen =function(num) { 
   return num > 9 ? (num + "") : ("0" + num); 
};
tools.formatDate = function(date) { 
   var date = new Date(date)
   var year = date.getFullYear(); 
   var month = date.getMonth() + 1; 
   var day = date.getDate(); 
   var hour = date.getHours(); 
   var minute = date.getMinutes(); 
   return year + "-" + tools.formatTen(month) + "-" + tools.formatTen(day)+ " " +tools.formatTen(hour)+ ":" +tools.formatTen(minute); 
};
// timer
tools.timer = function(){
  let myDate = new Date();
  let year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
  let month = tools.formatTen(myDate.getMonth()+1); //获取当前月份(0-11,0代表1月)
  let date = myDate.getDate(); //获取当前日(1-31)
  let hour = myDate.getHours(); //获取当前小时数(0-23)
  let minute = tools.formatTen(myDate.getMinutes());
  // ////console.log(year, month, date, hour, minute)
  let dateStart = `${year}-${month}-${date}`;
  let dateEnd = `${year}-${month}-${date}`;
  let timeStart = '00:00'
  let timeEnd = `${hour}:${minute}`;
  let dataStart = `${dateStart} ${timeStart}`;
  let dataEnd = `${dateEnd} ${timeEnd}`;
  let dataO = {y:year,m:month,d:date};
  return {dateS:dataStart,dateE:dataEnd,dateO:dataO};
};



export default tools