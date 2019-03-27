// code for getting data

// ID, Key and Token should be in string

var cardID = "5c976eebb77e4583fc7609f5";
var developerKey = "89054c5990edbc128a3b8e87fb053290";
var developerToken = "1c788cb9754bd3aef0f81f69c1418c4522a114cf5aada05f02eb2d5e04b3a1e7";



getData();

function getData() {
    fetch(`https://api.trello.com/1/cards/${cardID}/checklists?key=${developerKey}&token=${developerToken}`)
        .then(response => {
            return response.json();
        }).then(checklistsData => {
            let cardData = checklistsData;
            //console.log(checklistsData);
            return toOperate(cardData);
            
        }).catch(err => {
            console.log(err);
        })
}

// code for Operations

function toOperate(cardData) {

  //console.log(cardID);
    var forI = 0;

    //console.log(cardData);
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



}

// for updating checkbox

function checkboxFunction(paraCB, id) {

    let state;
    if (paraCB == true) state = "incomplete";
    else state = "complete";

    fetch(`https://api.trello.com/1/cards/${cardID}/checkItem/${id}?state=${state}&key=${developerKey}&token=${developerToken}`, {
        method: "PUT",
    }).catch(err => {
        console.log(err);
    })
    

}


// for adding checklists
function buttonFunction() {
    let inputVar = document.querySelector('.mainInput').value;

    fetch(`https://api.trello.com/1/cards/${cardID}/checklists?name=${inputVar}&key=${developerKey}&token=${developerToken}`, {
        method: "POST",
    }).catch(err => {
        console.log(err);
    })
}


//for adding items in checklist

function functionForItems(i, id) {
    
    let itemInput = document.querySelectorAll(".inputForItems")[i].value;

    fetch(`https://api.trello.com/1/checklists/${id}/checkItems?name=${itemInput}&pos=bottom&checked=false&key=${developerKey}&token=${developerToken}`, {
        method: "POST",
    }).catch(err => {
        console.log(err);
    })
}

// for deleting checklists

function deleteChecklist(id) {

    fetch(`https://api.trello.com/1/checklists/${id}?key=${developerKey}&token=${developerToken}`, {
        method: "DELETE",
    }).catch(err => {
        console.log(err);
    })

}

// for deleting items in checklist

function deleteItemsFunction(checklistId, checkItemId) {

    fetch(`https://api.trello.com/1/checklists/${checklistId}/checkItems/${checkItemId}?key=${developerKey}&token=${developerToken}`, {
        method: "DELETE",
    }).catch(err => {
        console.log(err);
    })
}