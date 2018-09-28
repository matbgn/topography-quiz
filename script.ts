var sign1 : string;

window.onload = function loadJSON() {
  //let queryURL = "http://www.at3flo.ch/signquizz.json";
  let queryURL = "signquizz.json";
  //let queryURL = "https://jsonplaceholder.typicode.com/users";

  let xhr = new XMLHttpRequest();

  xhr.overrideMimeType("application/json");

  xhr.open('GET', queryURL, true);

  xhr.onload = function(e){
    let jsonResponse = xhr.response;
  
    let signs = JSON.parse(jsonResponse);

    let image : Element = document.querySelector('#image');

    let index : number;

    index = getRndInteger(0,objectLength(signs)-1);

    image.innerHTML = `<img src="${signs[index].imageURL}">`;

    sign1 = signs[index].name; 
  }

  xhr.onerror = function(err){
    console.log("Error: " + err);
  }

  xhr.send();


}

let objectLength : Function = (obj : object) => {
  let length = 0;
  for( var key in obj ) {
      if( obj.hasOwnProperty(key) ) {
          ++length;
      }
  }
  return length;
};

let getRndInteger : Function = (min : number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

let validateAnswer : Function = (answer: any) : void => {
  
  let name : string = answer.value;
  let validation : boolean = false;
  let output : Element = document.querySelector('#output');
  let button : Element = document.querySelector('#displayResult');
  let buttonRecharge : Element = document.createElement('button');

  buttonRecharge.textContent = "Recharger la page";
  buttonRecharge.className="btn btn-secondary";

  if (name === sign1){
    validation = true;
  } else {
    validation = false;
  }
  
  button.addEventListener('click',function(e){
    output.innerHTML = "Résultat : " + validation + '<br><br>';
    document.querySelector('#output').appendChild(buttonRecharge);
  })
  
  buttonRecharge.addEventListener('click', function(e){
    location.reload();
  })

}


