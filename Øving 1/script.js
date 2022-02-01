var number = 0;

function increaseNumber() {
    number++;
    var paraNumber = document.getElementById("increaseNumber");
    paraNumber.innerHTML = number;
}

function showHide(){
    var secret = document.getElementById("secret");
    if(secret.style.display === "none"){
        secret.style.display = "block";
    } else {
        secret.style.display = "none";
    }
}

function showArray(){
    const array = ["kaptein sabeltann", "enchilada", "rompetroll", "krokodille"];
    var ulEl = document.createElement("ul");
    document.getElementById("list").appendChild(ulEl);
    ulEl.setAttribute("class", "float");

    for(let i = 0; i < array.length; i++){
        var listEl = document.createElement("li")
        listEl.innerHTML = array[i];
        console.log(array[i]);
        ulEl.appendChild(listEl);
    }
}