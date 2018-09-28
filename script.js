var sign1;
window.onload = function loadJSON() {
    //let queryURL = "http://www.at3flo.ch/signquizz.json";
    var queryURL = "signquizz.json";
    //let queryURL = "https://jsonplaceholder.typicode.com/users";
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', queryURL, true);
    xhr.onload = function (e) {
        var jsonResponse = xhr.response;
        var signs = JSON.parse(jsonResponse);
        var image = document.querySelector('#image');
        var index;
        index = getRndInteger(0, objectLength(signs) - 1);
        image.innerHTML = "<img src=\"" + signs[index].imageURL + "\">";
        sign1 = signs[index].name;
    };
    xhr.onerror = function (err) {
        console.log("Error: " + err);
    };
    xhr.send();
};
var objectLength = function (obj) {
    var length = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            ++length;
        }
    }
    return length;
};
var getRndInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
var validateAnswer = function (answer) {
    var name = answer.value;
    var validation = false;
    var output = document.querySelector('#output');
    var button = document.querySelector('#displayResult');
    var buttonRecharge = document.createElement('button');
    buttonRecharge.textContent = "Recharger la page";
    buttonRecharge.className = "btn btn-secondary";
    if (name === sign1) {
        validation = true;
    }
    else {
        validation = false;
    }
    button.addEventListener('click', function (e) {
        output.innerHTML = "Résultat : " + validation + '<br><br>';
        document.querySelector('#output').appendChild(buttonRecharge);
    });
    buttonRecharge.addEventListener('click', function (e) {
        location.reload();
    });
};
