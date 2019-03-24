// document.querySelector('body').setAttribute('style', 'background-color: #33AFFF;');
// //document.querySelector('.content-div').setAttribute('style', 'height: 400px; width: 400px;');

$(document).ready(function(){
    $("body").css("background-color", "#FFA02E");
    $(".main-div").css("height","58em").css("display", "flex").css("justify-content","center").css("align-items", "center");
    $(".content-div").css("height", "700px").css("width","700px").css("background", "#E4AF70").css("padding-left", "30px").css("padding-right", "30px");
    $(".content-div h2").css("font-family","'Open Sans', sans-serif").css("padding", "40").css("color", "#FF0000").css("text-align", "center");
    $(".content-div p").css("font-family","'Open Sans', sans-serif")

    

})

document.querySelector('.content-div h2').textContent = 'Test Card';
document.querySelector('.content-div button').textContent = 'Add Item';


