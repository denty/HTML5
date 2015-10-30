/**
 * Created by broydenty on 29/10/15.
 */

function saveData()
{
    var data = new Object();
    data.name = document.getElementById("name").value;
    data.email = document.getElementById("email").value;
    data.tel = document.getElementById("tel").value;
    data.memo = document.getElementById("memo").value;
    var str = JSON.stringify(data);
    localStorage.setItem(data.name,str);
    alert("数据已存储")
}


function loadData(id)
{
    var keywords = document.getElementById('keyWords').value;
    var data = localStorage.getItem(keywords);
    var result = JSON.parse(data);
    var outPut  = "姓名："+result.name+"<br>";
        outPut += "电话号码："+result.tel+"<br>";
        outPut += "电子邮箱："+result.email+"<br>";
        outPut += "备注："+result.memo+"<br>";
    var target = document.getElementById(id);
    target.innerHTML=outPut;
}
