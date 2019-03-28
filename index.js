// code for getting data
// ID, Key and Token should be in string

var cardID = "5c976eebb77e4583fc7609f5";
var developerKey = "89054c5990edbc128a3b8e87fb053290";
var developerToken = "1c788cb9754bd3aef0f81f69c1418c4522a114cf5aada05f02eb2d5e04b3a1e7";

$(document).ready(function () {

    getData();

    function getData() {
        fetch(`https://api.trello.com/1/cards/${cardID}/checklists?key=${developerKey}&token=${developerToken}`)
            .then(response => {
                return response.json();
            }).then(checklistsData => {
                let cardData = checklistsData;
                return toOperate(cardData);
            }).catch(err => {
                console.log(err);
            })
    }



});

// code for Operations


function toOperate(cardData) {

    for (let i = 0; i < cardData.length; i++) {

        let newDiv = `<div class = "newDivFor"><h3>${cardData[i]['name']}</h3><div class = "newDivForFlex"><input class="inputForItems" placeholder = "Add Item"><button class = "buttonItem">Add Items</button></div></div>`;
        $(".content-div").append(newDiv);
        for (let j = 0; j < cardData[i]["checkItems"].length; j++) {


            let creDiv = `<div class = "divByApi" id = id = "${cardData[i]['id']}"><div><input type="checkbox" class = "checkboxForP"></div><div class = "classForCheckItem"><p>${cardData[i]["checkItems"][j]["name"]}</p></div><div><button class = "divDelete">Delete Item</button></div></div>`

            $(".newDivFor").append(creDiv);

            let paraCB = document.querySelector(".checkboxForP");

            paraCB.style.cssText = "height:16px; width:16px";
            var x;
            if (cardData[i]["checkItems"][j]["state"] === "complete") {
                paraCB.checked = true;
                x = true;
            } else {
                paraCB.checked = false;
                x = false;
            }

            $(".checkboxForP").click(function () {
                checkboxFunction(x, `${cardData[i]["checkItems"][j]["id"]}`)
            });


            $(".divDelete").click(function () {
                deleteItemsFunction(`${cardData[i]['id']}`, `${cardData[i]['checkItems'][j]['id']}`)
            });

        }

        $(".buttonItem").click(function () {
            buttonFunction(`${cardData[i]["id"]}`)
        });

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

function buttonFunction(id) {

    let inputVar = document.querySelector('.inputForItems').value;
    if (inputVar == "") {
        inputVar = "Item";
    }


    let newItem = `<div class="divByApi"><div><input type="checkbox" class="checkboxForP" style="height: 16px; width: 16px;"></div><div class="classForCheckItem"><p>${inputVar}</p></div><div><button class="divDelete">Delete Item</button></div></div>`
    $(".newDivFor").append(newItem);


    fetch(`https://api.trello.com/1/checklists/${id}/checkItems?name=${inputVar}&pos=bottom&checked=false&key=${developerKey}&token=${developerToken}`, {
        method: "POST",
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    })


}


// for deleting items in checklist

function deleteItemsFunction(checklistId, checkItemId) {
    console.log("Delete Items", checklistId);

    $(`#${checklistId}`).remove();

    fetch(`https://api.trello.com/1/checklists/${checklistId}/checkItems/${checkItemId}?key=${developerKey}&token=${developerToken}`, {
        method: "DELETE",
    }).catch(err => {
        console.log(err);
    })
}