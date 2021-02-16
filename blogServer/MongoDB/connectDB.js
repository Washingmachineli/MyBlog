//这个模块里面封装了所有对数据库的常用操作
var MongoClient = require('mongodb').MongoClient;
var settings = require("./setting.js");


//不管数据库什么操作，都是先连接数据库，所以我们可以把连接数据库
//封装成为内部函数
function _connectDB(callback) {
  var url = settings.dburl;   //从settings文件中，都数据库地址
  //连接数据库
  MongoClient.connect(url,function (err, client) {
    if (err) {
      callback(err, null);
      return;
    }
    callback(err, client);
  });
}


//插入数据
exports.insertOne = function (collectionName, json, callback) {
  _connectDB(function (err, client) {
    var db = client.db("Blog")
    db.collection(collectionName).insertOne(json, function (err, result) {
      callback(err, result);
      client.close();
    })
  })
};

//查找数据，找到所有数据。args是个对象{"pageamount":10,"page":10}
exports.find = function (collectionName, json, C, D) {
  var result = [];    //结果数组
  if (arguments.length == 3) {
    //那么参数C就是callback，参数D没有传。
    var callback = C;
    var skipnumber = 0;
    //数目限制
    var limit = 0;
  } else if (arguments.length == 4) {
    var callback = D;
    var args = C;
    //应该省略的条数
    var skipnumber = args.pageamount * args.page || 0;
    //数目限制
    var limit = args.pageamount || 0;
    //排序方式
    var sort = args.sort || {};
  } else {
    throw new Error("find函数的参数个数，必须是3个，或者4个。");
    return;
  }

  //连接数据库，连接之后查找所有
  _connectDB(function (err, client) {
    var db = client.db("Blog")
    var cursor = db.collection(collectionName).find(json).skip(skipnumber).limit(limit).sort(sort);
    cursor.each(function (err, res) {
      if (err) {
        callback(err, null);
        client.close(); //关闭数据库
        return;
      }
      if (res != null) {
        result.push(res);   //放入结果数组
      } else {
        //遍历结束，没有更多的文档了
        callback(null, result);
        client.close(); //关闭数据库
      }
    });
  });
};





//删除
exports.deleteMany = function (collectionName, json, callback) {
  _connectDB(function (err, db) {
    //删除
    db.collection(collectionName).deleteMany(json,function (err, results) {
          callback(err, results);
          db.close(); //关闭数据库
        }
    );
  });
};

//修改
exports.updateMany = function (collectionName, json1, json2, callback) {
  _connectDB(function (err, client) {
    var db = client.db("Blog")
    db.collection(collectionName).updateMany(json1,json2,function (err, results) {
      callback(err, results);
      client.close();
    });
  });
};



/*
exports.getAllCount = function (collectionName,json,callback) {
  _connectDB(function (err, db) {
    db.collection(collectionName).find(json).count({}).then(function(count) {
      callback(count);
      db.close();
    });
  })
};
*/


//查找不重复的值
exports.distinct = function (collectionName, json, callback) {
  var result = [];    //结果数组
  /*1	$project	增加、删除、重命名字段(查询的字段)
    2	$match	条件匹配查询,只有符和条件的数据才能查询出来
    3	$limit	限制结果的数量
    4	$skip	跳过文档的数量
    5	$sort	排序
    6	$group	根据条件分组
    7	$lookup	用来引入别的集合(多表查询)
    ex: ([{$match: {states: 'A'}}, {$group: {_id:'$_id',total: {$sum: '$amount'} },....]
   */
  //连接数据库，连接之后查找所有
  _connectDB(function (err, client) {
    var db = client.db("Blog")
    var cursor = db.collection(collectionName).aggregate(json);
    cursor.each(function (err, res) {
      if (err) {
        callback(err, null);
        client.close(); //关闭数据库
        return;
      }
      if (res != null) {
        result.push(res);   //放入结果数组
      } else {
        //遍历结束，没有更多的文档了
        callback(null, result);
        client.close(); //关闭数据库
      }
    });
  });
};


//获取所有符合条件的值的数量
exports.getAllCount = function (collectionName, json, callback) {
  _connectDB(function (err, client) {
    let db = client.db("Blog")
    db.collection(collectionName).count(json).then(function(count) {
      callback(err, count);
      client.close(); //关闭数据库
    });
  })
};

/*
//查通过id查找
exports.findById = function (collectionName, json, C, D) {
  var result = [];    //结果数组
  if (arguments.length == 3) {
    //那么参数C就是callback，参数D没有传。
    var callback = C;
    var skipnumber = 0;
    //数目限制
    var limit = 0;
  } else if (arguments.length == 4) {
    var callback = D;
    var args = C;
    //应该省略的条数
    var skipnumber = args.pageamount * args.page || 0;
    //数目限制
    var limit = args.pageamount || 0;
    //排序方式
    var sort = args.sort || {};
  } else {
    throw new Error("find函数的参数个数，必须是3个，或者4个。");
    return;
  }

  //连接数据库，连接之后查找所有
  _connectDB(function (err, client) {
    var db = client.db("Blog")
    var cursor = db.collection(collectionName).find(json).skip(skipnumber).limit(limit).sort(sort);
    cursor.each(function (err, res) {
      if (err) {
        callback(err, null);
        client.close(); //关闭数据库
        return;
      }
      if (res != null) {
        result.push(res);   //放入结果数组
      } else {
        //遍历结束，没有更多的文档了
        callback(null, result);
        client.close(); //关闭数据库
      }
    });
  });
};
*/
