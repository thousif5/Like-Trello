// code for getting data
// ID, Key and Token should be in string

var cardID = "5c976eebb77e4583fc7609f5";
var developerKey = "89054c5990edbc128a3b8e87fb053290";
var developerToken = "1c788cb9754bd3aef0f81f69c1418c4522a114cf5aada05f02eb2d5e04b3a1e7";

function getData() {
  fetch(`https://api.trello.com/1/cards/${cardID}/checklists?key=${developerKey}&token=${developerToken}`)
    .then(response => {
      return response.json();
    }).then(checklistsData => {
      let cardData = checklistsData;
      return toPopulateData(cardData);
    }).catch(err => {
      console.log(err)
    })
}

$(document).ready(function () {
  getData();
});

// code for populating data from API
function toPopulateData(cardData) {

  let htmlForChecklistData =
    `<div class = "divForChecklist">
          <h3>${cardData[0]['name']}</h3>
          <div class = "divForInput">
             <input class="inputForItems" placeholder = "Add Item">
             <button class = "itemButton">Add Items</button>
          </div>
       </div>`;
  $(".content-div").append(htmlForChecklistData);


  cardData[0]["checkItems"].forEach(item => {

    let createNewHtmlForCheckItems =
      `<div class = "divByApi" id = "${item['id']}">
            <div>
                <input type="checkbox" class = "checkbox">
            </div>
            <div class = "divForCheckItem">
                <p>${item["name"]}</p>
            </div>
            <div>
                <button class = "divForDelete">Delete Item</button>
            </div>
        </div>`

    $(".divForChecklist").append(createNewHtmlForCheckItems);

    let checkboxForCheckItems = document.querySelector(".checkbox");
    if (item["state"] === "complete") {
      checkboxForCheckItems.checked = true;
    } else {
      checkboxForCheckItems.checked = false;
    }

  })

}

// on-click function
$(".content-div").click(function (e) {
  if (e.target.className === "divForDelete") deleteItems(`${e.target.parentElement.parentElement.id}`);
  if (e.target.className === "itemButton") AddItemButton();
  if (e.target.className === "checkbox") checkboxStateUpdate(`${e.target.parentElement.parentElement.id}`);
})


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
    //stateCheck.checked = false;
    stateCheck.disabled = true;
    alert("You're Offline!");
  })
}

// for adding checkItems
function AddItemButton() {

  let inputForCheckItems = document.querySelector('.inputForItems').value;
  if (inputForCheckItems == "") {
    inputForCheckItems = "Item";
  }

  let htmlToPopulateData =
    `<div class="divByApi" id = "">
        <div>
            <input type="checkbox" class="checkbox">
        </div>newItem
        newItem
        <div class="divForCheckItem">
            <p>${inputForCheckItems}</p>
        </div>
        <div>
            <button class="divForDelete">Delete Item</button>
        </div>
     </div>`;

  fetch(`https://api.trello.com/1/checklists/5c9c47c9a0bcac2460441862/checkItems?name=${inputForCheckItems}&pos=bottom&checked=false&key=${developerKey}&token=${developerToken}`, {
    method: "POST",
  }).then(response => {
    if (response.status === 200) {
      $(".divForChecklist").append(htmlToPopulateData);
    }
  }).catch(err => {
    alert("You're Offline!")
  })
}

// for deleting items in checklist
function deleteItems(checkItemId) {

  fetch(`https://api.trello.com/1/checklists/5c9c47c9a0bcac2460441862/checkItems/${checkItemId}?key=${developerKey}&token=${developerToken}`, {
    method: "DELETE",
  }).then(response => {
    if (response.status === 200) {
      document.getElementById(`${checkItemId}`).remove();
    }
  }).catch(err => {
    alert("You're Offline!")
  })
}