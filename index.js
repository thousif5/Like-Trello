
//buttonCL.onclick = function() {buttonFunction()};

// code for API

fetch('https://api.trello.com/1/cards/5c976eebb77e4583fc7609f5/checklists?key=89054c5990edbc128a3b8e87fb053290&token=1c788cb9754bd3aef0f81f69c1418c4522a114cf5aada05f02eb2d5e04b3a1e7')
    .then(response => {
        return response.json();
    }).then(cardData => {
        var forI = 0;

        //console.log(data);
        for (let i = 0; i < cardData.length; i++) {
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class", "newDivFor");

            let newPara = document.createElement("h3");
            newPara.innerHTML = cardData[i]['name'];

            newDiv.appendChild(newPara);

            let newDivForFlex = document.createElement("div");
            newDivForFlex.setAttribute("class", "newDivForFlex");

            let newInput = document.createElement("input");
            newInput.placeholder = "Add Item";

            newInput.setAttribute("class", "inputForItems");

            let buttonForItem = document.createElement("button");
            buttonForItem.setAttribute("class", "buttonItem");
            buttonForItem.textContent = "Add Items";


            let deleteButton = document.createElement("button");
            deleteButton.setAttribute("Class", "delButton");
            deleteButton.setAttribute("onclick", "deleteChecklist(\"" + cardData[i]['id'] + "\")");

            deleteButton.textContent = "Delete Checklist";




            var func = "functionForItems(" + forI + ", \"" + cardData[i]['id'] + "\")";
            buttonForItem.setAttribute("onclick", func);

            newDivForFlex.appendChild(newInput);

            newDivForFlex.appendChild(buttonForItem);
            newDivForFlex.appendChild(deleteButton);

            newDiv.appendChild(newDivForFlex);





            document.querySelector(".content-div").appendChild(newDiv);

        // for checkitems
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
                var fn = "checkboxFunction(" + x + ", \"" + cardData[i]["checkItems"][j]["id"] + "\")";
                paraCB.setAttribute("onclick", fn);

                let deleteDiv = document.createElement("div");
                deleteDiv.setAttribute("class", "divDelete");


                deleteDiv.setAttribute("onclick", "deleteItemsFunction(\"" + cardData[i]['id'] + "\",\"" + cardData[i]['checkItems'][j]['id'] + "\")");
                deleteDiv.style.cssText = "padding-left:10px";

                let deleteForItems = document.createElement("button");
                deleteForItems.setAttribute("class", "delButtonForItems");
                deleteForItems.textContent = "Delete Item";

                deleteDiv.appendChild(deleteForItems);




                childDivForCB.appendChild(paraCB);
                let childDivForPara = document.createElement('div');
                creDiv.appendChild(childDivForPara);
                creDiv.appendChild(deleteDiv);
                let elePara = document.createElement('p');
                elePara.textContent = cardData[i]["checkItems"][j]["name"];
                childDivForPara.appendChild(elePara);
            }
            forI++;
        }



    })
    .catch(err => {
        console.log(err);
    })



function checkboxFunction(paraCB, id) {
   // console.log(id)


    var data = null;

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });

    if (paraCB == true) {

        var urlAPIPut = "https://api.trello.com/1/cards/5c976eebb77e4583fc7609f5/checkItem/" + id + "?state=incomplete&key=89054c5990edbc128a3b8e87fb053290&token=1c788cb9754bd3aef0f81f69c1418c4522a114cf5aada05f02eb2d5e04b3a1e7";
    } else {
        var urlAPIPut = "https://api.trello.com/1/cards/5c976eebb77e4583fc7609f5/checkItem/" + id + "?state=complete&key=89054c5990edbc128a3b8e87fb053290&token=1c788cb9754bd3aef0f81f69c1418c4522a114cf5aada05f02eb2d5e04b3a1e7";

    }

    xhr.open("PUT", urlAPIPut);

    xhr.send(data);
    // location.reload();
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

function functionForItems(i, id) {
   // console.log(id);
    let itemInput = document.querySelectorAll(".inputForItems")[i].value;
    //console.log(itemInput);
    var data = null;

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });

    var urlAPIForItems = "https://api.trello.com/1/checklists/" + id + "/checkItems?name=" + itemInput + "&pos=bottom&checked=false&key=89054c5990edbc128a3b8e87fb053290&token=1c788cb9754bd3aef0f81f69c1418c4522a114cf5aada05f02eb2d5e04b3a1e7";

    xhr.open("POST", urlAPIForItems);

    xhr.send(data);
    location.reload();
}

function deleteChecklist(id) {
    var data = null;

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });

    let deleteUrl = "https://api.trello.com/1/checklists/" + id + "?key=89054c5990edbc128a3b8e87fb053290&token=1c788cb9754bd3aef0f81f69c1418c4522a114cf5aada05f02eb2d5e04b3a1e7";

    xhr.open("DELETE", deleteUrl);

    xhr.send(data);
    setTimeout(location.reload.bind(location), 1000);

}

function deleteItemsFunction(checklistId, checkItemId) {

   // console.log(checkItemId, checklistId);
    var data = null;

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });

    let deleteItemsUrl = "https://api.trello.com/1/checklists/" + checklistId + "/checkItems/" + checkItemId + "?key=89054c5990edbc128a3b8e87fb053290&token=1c788cb9754bd3aef0f81f69c1418c4522a114cf5aada05f02eb2d5e04b3a1e7";

    xhr.open("DELETE", deleteItemsUrl);

    xhr.send(data);
    setTimeout(location.reload.bind(location), 1000);
}