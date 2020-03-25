let common = {};
common.arraySort = function(jsonData, colId, sequence) {
    //对json进行升序排序函数  
    var asc = function(x, y) {
      return (x[colId] > y[colId]) ? 1 : -1
    }
    //对json进行降序排序函数  
    var desc = function(x, y) {
      return (x[colId] < y[colId]) ? 1 : -1
    }
    if (sequence == "asc") {
      return jsonData.sort(asc);
    }
    if (sequence == "desc") {
      return jsonData.sort(desc);
    } else {
      return jsonData.sort(asc); //默认升序
    }
};
common.makeTreeData = function(jsonData, StartID) {
    var children = [];
    for (var i = 0; i < jsonData.length; i++) {
      if (jsonData[i].PID == StartID) {
        children.push(jsonData[i]);
        jsonData[i].children = this.makeTreeData(jsonData, jsonData[i].NID);
      }
    }
    return children;
};
common.JSONDateToDateStr = function(jsondate) {
  if (jsondate) {
    jsondate = jsondate.split(".")[0];
    jsondate = jsondate.replace("T", " ");
  }
  return jsondate;
};
common.getSecondByTowDate = function (date1, date2) {
  var dateStart = new Date(date1);
  var dateEnd = new Date(date2);
  var second = (dateEnd.getTime() - dateStart.getTime()) / 1000;
  return second;
};


export default common