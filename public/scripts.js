document
    .querySelector('header button')
    .addEventListener("click", function () {
        document.querySelector('.form').classList.toggle('hide');
    });

var sectionElement = document.querySelector('#doadores');
var inputElementName = document.querySelector('#nome');
var inputElementBlood = document.querySelector('#sangue');

function add() {
    var donorsDiv = document.createElement('div');
    donorsDiv.setAttribute('class', 'donor');

    var bloodDiv = document.createElement('div');
    bloodDiv.setAttribute('class', 'blood');
    var textBlood = document.createTextNode(inputElementBlood.value);
    bloodDiv.appendChild(textBlood);

    var nameP = document.createElement('p');
    var textName = document.createTextNode(inputElementName.value);
    nameP.appendChild(textName);

    donorsDiv.appendChild(bloodDiv);
    donorsDiv.appendChild(nameP);
    
    sectionElement.appendChild(donorsDiv);
}