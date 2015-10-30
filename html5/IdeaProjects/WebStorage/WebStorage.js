/**
 * Created by broydenty on 28/10/15.
 */

function saveStorage(id)
{
    var inputData = document.getElementById(id);
    var strInputData = inputData.value
    sessionStorage.setItem("saveData",strInputData);
    //localStorage.setItem("saveData",strInputData);
}

function readStorage(id)
{
    var displayView = document.getElementById(id);
    var savedata = sessionStorage.getItem("saveData");
    //var savedata = localStorage.getItem("saveData");
    displayView.innerHTML = savedata;
}