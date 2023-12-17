const imgSec = document.getElementById("imageSec");
var items = [];
$(document).ready(function(){//not necessary 
    $.getJSON("../product.json", function(data){
     
        $.each(data, function(item, curItem){//each()
            items.push(curItem);//need to store or not?
            //only works when reading index!?
            var cur = ` <p>id: ${curItem.id}</br> ${curItem.name} $${curItem.price}</p>`;
            var img = `<img src = ${curItem.imgUrl} style = "height:50px">`
            imgSec.innerHTML+="<div>"+cur+ img +"</div>";
        });
    });
    
});

function find(id){
    for(var item of items){
        if(id == item.id){
            //return item; 
            console.log(item.name);
        }
    }
}
