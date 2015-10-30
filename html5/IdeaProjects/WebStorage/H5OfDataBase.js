/**
 * Created by broydenty on 29/10/15.
 */

var datatable = null;
var db = openDatabase("MyData","","my DataBase","1024*100");

function init()
{
    datatable = document.getElementById("datatable");
    //alert("asdf");
    showAllData();
}

/*清除dataTable中的数据，并且制作表头*/
function removeAllData()
{
    for(var i = 0;i<datatable.childNodes.length;i++)
    {
        datatable.removeChild(datatable.childNodes[i]);
    }
    var tr  = document.createElement("tr");
    var th1 = document.createElement("th");
    var th2 = document.createElement("th");
    var th3 = document.createElement("th");
    th1.innerHTML = "姓名";
    th2.innerHTML = "留言";
    th3.innerHTML = "时间";
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    datatable.appendChild(tr);
}

/*将数据库中一条数据组成元素，添加在dataTable的表格中*/
function showData(resultRow)
{
    var tr  = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    td1.innerHTML = resultRow.name;
    td2.innerHTML = resultRow.memo;
    //td3.innerHTML = resultRow.time;
    var time = new Date();
    time.setTime(resultRow.time);
    td3.innerHTML = time.toLocaleDateString()+" "+time.toLocaleTimeString();
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    datatable.appendChild(tr);
}

/*清理HTML上次查询的数据，再将数据库中的数据取出放入HTMl中*/
function showAllData()
{
    db.transaction(function(callBack)
    {
        callBack.executeSql("CREATE TABLE IF NOT EXISTS MsgData(name TEXT,memo TEXT,time INTEGER)",[], function (callBack,result) {
            //alert("数据库表结构创建成功");
        }, function (callBack,error) {
            alert(error.source+"::"+error.message);
        });
        callBack.executeSql("SELECT * FROM MsgData",[],function(callBack,result)
        {
            //alert("清除数据");
            removeAllData();
            for(var i = 0;i<result.rows.length;i++)
            {
                showData(result.rows.item(i));
            }
        });
    });
}

/*向数据库表中添加数据*/
function addData(name,memo,time)
{
    db.transaction(function(callBack)
    {
        callBack.executeSql("INSERT INTO MsgData VALUES(?,?,?)",[name,memo,time],function(callBack,result){
          alert("成功");
        },
            function(callBack,error)
            {
                alert(error.source+"::"+error.message);
            }
        );
    })
}

/*读取HTML数据，准备填充到数据库表中*/
function saveData()
{
    var name = document.getElementById("name").value;
    var memo = document.getElementById("memo").value;
    var time = new Date().getTime();
    addData(name,memo,time);
    showAllData();
}