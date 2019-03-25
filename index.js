// document.querySelector('body').setAttribute('style', 'background-color: #33AFFF;');
// //document.querySelector('.content-div').setAttribute('style', 'height: 400px; width: 400px;');

$(document).ready(function () {
    $("body").css("background-color", "#FFA02E").css("font-family", "'Open Sans', sans-serif");
    $(".main-div").css("height", "58em").css("display", "flex").css("justify-content", "center").css("align-items", "center");
    $(".content-div").css("height", "700px").css("width", "700px").css("background", "#E4AF70").css("padding-left", "30px").css("padding-right", "30px");
    $(".content-div h2").css("padding", "40").css("color", "#BD0000").css("text-align", "center");
    $(".content-div button").css("background", "black").css("color", "white");



})
document.querySelector('.mainInput').placeholder = 'Checklist';
document.querySelector('.content-div h2').textContent = 'Test Card';
let buttonCL = document.querySelector('.content-div button');
buttonCL.textContent = 'Add Checklist';

//buttonCL.onclick = function() {buttonFunction()};





// code for API

fetch('https://api.trello.com/1/cards/5c976eebb77e4583fc7609f5/checklists?key=89054c5990edbc128a3b8e87fb053290&token=1c788cb9754bd3aef0f81f69c1418c4522a114cf5aada05f02eb2d5e04b3a1e7')
    .then(response => {
        return response.json();
    }).then(cardData => {


        //console.log(data);
        for (let i = 0; i < cardData.length; i++) {

            let newPara = document.createElement("h3");
            newPara.innerHTML = cardData[i]['name'];
            document.querySelector(".content-div").appendChild(newPara);

            for (let j = 0; j < cardData[i]["checkItems"].length; j++) {

                let creDiv = document.createElement('div');
                creDiv.className = "divByApi";
                creDiv.style.cssText = "display: flex; align-Items:center";
                document.querySelector(".content-div").appendChild(creDiv);
                //console.log(cardData[i]["checkItems"][j]);
                let childDivForCB = document.createElement('div');
                creDiv.appendChild(childDivForCB);
                let paraCB = document.createElement("INPUT");
                paraCB.setAttribute("type", "checkbox");
                paraCB.style.cssText = "height:16px; width:16px";
                var x;
                if (cardData[i]["checkItems"][j]["state"] === "complete") {
                    paraCB.checked = true;
                    x = true;
                } else {
                    paraCB.checked = false;
                    x = false;
                }
                var fn = "checkboxFunction("+x+", \"" + cardData[i]["checkItems"][j]["id"] + "\")";
                paraCB.setAttribute("onclick", fn);


                childDivForCB.appendChild(paraCB);
                let childDivForPara = document.createElement('div');
                creDiv.appendChild(childDivForPara);
                let elePara = document.createElement('p');
                elePara.textContent = cardData[i]["checkItems"][j]["name"];
                childDivForPara.appendChild(elePara);
            }
        }



    })
    .catch(err => {
        console.log(err);
    })



function checkboxFunction(paraCB, id) {
    console.log(id)
    if (paraCB.checked = true) {

        var data = null;

        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
            }
        });

        var urlAPIPut = "https://api.trello.com/1/cards/5c976eebb77e4583fc7609f5/checkItem/"+id+"?state=complete&key=89054c5990edbc128a3b8e87fb053290&token=1c788cb9754bd3aef0f81f69c1418c4522a114cf5aada05f02eb2d5e04b3a1e7"

        xhr.open("PUT", urlAPIPut);

        xhr.send(data);
        

    }

    else {
        var data = null;

        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
            }
        });

        var urlAPIPut = "https://api.trello.com/1/cards/5c976eebb77e4583fc7609f5/checkItem/"+id+"?state=incomplete&key=89054c5990edbc128a3b8e87fb053290&token=1c788cb9754bd3aef0f81f69c1418c4522a114cf5aada05f02eb2d5e04b3a1e7"

        xhr.open("PUT", urlAPIPut);

        xhr.send(data);
    
    }

   
}

function buttonFunction() {
    let inputVar = document.querySelector('.mainInput').value;

    var data = null;

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });

    var urlAPI = "https://api.trello.com/1/checklists?idCard=5c976eebb77e4583fc7609f5&name=" + inputVar + "&key=89054c5990edbc128a3b8e87fb053290&token=1c788cb9754bd3aef0f81f69c1418c4522a114cf5aada05f02eb2d5e04b3a1e7"

    xhr.open("POST", urlAPI);

    xhr.send(data);

    location.reload();
}