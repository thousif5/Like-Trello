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
                if (response.status != 200) {
                    alert("You're offline");
                }
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

    let newDiv = `<div class = "newDivFor"><h3>${cardData[0]['name']}</h3><div class = "newDivForFlex"><input class="inputForItems" placeholder = "Add Item"><button class = "buttonItem">Add Items</button></div></div>`;
    $(".content-div").append(newDiv);


    cardData[0]["checkItems"].forEach(item => {

        let creDiv = `<div class = "divByApi" id = "${item['id']}"><div><input type="checkbox" class = "checkboxForP"></div><div class = "classForCheckItem"><p>${item["name"]}</p></div><div><button class = "divDelete">Delete Item</button></div></div>`

        $(".newDivFor").append(creDiv);

        let paraCB = document.querySelector(".checkboxForP");
        if (item["state"] === "complete") {
            paraCB.checked = true;
        } else {
            paraCB.checked = false;
        }
        $(".content-div").click(function (e) {
            if (e.target.className === undefined) return;
            if (e.target.className === "divDelete") deleteItems(`${cardData[0]['id']}`, `${item['id']}`);
            if (e.target.className === "buttonItem") AddItemButton(`${cardData[0]["id"]}`);
            if (e.target.className === "checkboxForP") checkboxStateUpdate(item["id"]);
        })

    })

}

// for updating checkbox

function checkboxStateUpdate(id) {

    let getCheckboxElement = document.getElementById(id)
    let stateCheck = getCheckboxElement.querySelector('input')
    let state;

    if (stateCheck.checked) {
        state = 'complete'
    } else {
        state = 'incomplete'
    }

    fetch(`https://api.trello.com/1/cards/${cardID}/checkItem/${id}?state=${state}&key=${developerKey}&token=${developerToken}`, {
        method: "PUT",
    }).catch(err => {
        console.log(err);
    })
}

// for adding checkItems

function AddItemButton(id) {

    let inputVar = document.querySelector('.inputForItems').value;
    if (inputVar == "") {
        inputVar = "Item";
    }

    let newItem = `<div class="divByApi" id = ""><div><input type="checkbox" class="checkboxForP"></div><div class="classForCheckItem"><p>${inputVar}</p></div><div><button class="divDelete">Delete Item</button></div></div>`
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

function deleteItems(checklistId, checkItemId) {
    //console.log("Delete Items", checkItemId);

    //$(`#${checkItemId}`).remove();
    document.getElementById(`${checkItemId}`).remove();

    fetch(`https://api.trello.com/1/checklists/${checklistId}/checkItems/${checkItemId}?key=${developerKey}&token=${developerToken}`, {
        method: "DELETE",
    }).catch(err => {
        console.log(err);
    })
}