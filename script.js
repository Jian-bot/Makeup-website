var cur;
var pg;

let curItem = 1;
var id = 1;
//for about form 

const clear = (page, cur) => {
  if (cur != null && pg != null) {
    //console.log(`clear color`);
    pg.style.backgroundColor = "";
    document.getElementById(cur).style.display = `none`;
    //document.getElementById(cur).style.visibility = `hidden`;
    document.body.style.backgroundColor = "";
  } else {
    return;
  }
};

function nav(page, color, id) {
  clear(page, cur);
  //console.log(page, color, id,page==null);
  page.style.backgroundColor = color;
  document.getElementById(id).style.display = `block`;
  document.body.style.backgroundColor = color;
  cur = id;
  pg = page;
}
function defultpage() {
  nav(document.getElementById(`df`), `#656d4f`, `home`);
  document.getElementById("loader").style.display = `none`;
}

//for news section
//const items = JSON.parse(itemList);

//jQery functions to read Json
var items = [];
$(document).ready(function(){
  $.getJSON("product.json", function(data){
    $.each(data, function(index, itemObjects){
        items.push(itemObjects);
    });
  });
});

function findItem(incre) {
  //takes increment, default id = 1 range 1-4
  id += incre;
  if (id > items.length) {
    id = 1;
  }
  if (id < 1) {
    id = items.length;
  }
  for (const item of items) {
    if (item.id === id) {
      const imgLink = document.getElementById(`itemImg`);
      const itemDSCRIP = document.getElementById(`itemDs`);

      if (imgLink.src != null) {
        imgLink.src = item.imgUrl;
        itemDSCRIP.innerHTML = item.name;
      }
    }
  }
}

//Home item display
// Home item
const cart = [];
const quality = new Map(); //map id: (idnum:num)

function addItem(id) {
  //id = item id string
  document.getElementById(`CartTop`).innerHTML = ` `;
  let idN = parseInt(id); //Json id is a int
  for (const item of items) {
    if (item.id === idN) {
      if (quality.has(idN)) {
        let cur = quality.get(idN);
        cur++; //get current quality
        quality.set(idN, cur);
        let newQ = quality.get(idN);
        //console.log(`Id: ${idN}: added:${newQ}`);

        let qid = `Q` + id;
        updateQ(qid, newQ);
        
      }else {
        cart.push(item);
        quality.set(idN, 1);
        //console.log(quality+"first time add");
        //cartPass(item);
      }
      cartPass();
      subtotal(); //add the total
    } //end if
  } //end for
}


//pass item to cart page
function cartPass() {
  var cartitem = ``;

  for(const obj of cart){
    var idString = obj.id.toString();
    cartitem += `<div class = "ListOfItems" id ="${obj.id}">
                  <img src = "${obj.imgUrl}" alt = "id:${obj.id}" class = "CartItemImg"/>
                  <p>${obj.name}</br><a href = "#" class = "remove" onclick = "remove(${obj.id} )">remove</a></p>
                  <p>	&#36; ${obj.price}</p>
                  <div  class = "quantity">
                    <button class = "less" onclick = less(${obj.id})>&#8722; </button>
                       <p id = "Q${idString}">
                          ${quality.get(parseInt(obj.id))}
                      </p>        
                    <button class = "more" onclick = addItem(${idString}) >&#x2b;</button>
                  </div>
                       
              </div>`;
  }
  document.getElementById(`cartList`).innerHTML = cartitem;
  //but it takes out the subtotal
}
  //update item quantity
  function updateQ(idN, newQ) {
    let idString = idN.toString();
    document.getElementById(idString).innerHTML = `${newQ}`;
  }

//calculate the total.
function subtotal() {
  var sub = 0;

  for (const cartItem of cart) {
    var price = cartItem.price;
    var q = quality.get(cartItem.id);
    sub += q * price;
    //loop though cart, for each get q from quality.get(id), sub +=q* price
  }
  document.getElementById(`subtotal`).innerHTML = `Subtotal: &#36;` + sub;
}

//remove an item 
function remove(id){
  quality.delete(id); //remove from map
  const selected = document.getElementById(id);

  selected.remove();
//update cart too
  for (const item of cart) {
    if (item.id === id) {
      cart.splice(cart.indexOf(item), 1);
      subtotal();
    }
  }
  
}
function less(id){
  //id is int 
  if(quality.get(id)==1){
    remove(id);
  }else{
    let cur = quality.get(id);
    cur--;
    quality.set(id,cur);
    
     let qid = `Q` + id;
     updateQ(qid, cur);
    
    subtotal(); 
  }
}
//for handling login form from about

const contactForm  = document.getElementById(`aboutForm`);

contactForm.addEventListener(`submit`, (e)=>{
  e.preventDefault();//no refresh
  console.log(`About form submit`);
  
  let name  = contactForm.querySelector(`#abtName`).value;
  let email = contactForm.querySelector(`#abtEmail`).value;

 // console.log(`name:${name} eamil: ${email}`);
  LoadingScreen(contactForm);

 //now add a Ajax(alternative: API fetch) to process the data and exacute the email.php
  $.ajax({
    url:"email.php",
    type: "POST",
    data:{
      'name' :name,
      'email' :email,
    },
    //cache: false,
    success: (data)=>{
      console.log("Data submitted successful");
      contactForm.innerHTML=
      `<h3 style = "font-weight: normal;">Thank you for connecting ${name},</h3>
       <h3 style = "font-weight: normal;">please check your email ${email} shortly.</h3>`;
    }, 
    error: (data)=>{
      console.log("Error occurred");
      var fail = `<img src = https://cdn3.iconfinder.com/data/icons/emoji/100/Emoji_Sorry-512.png style = "filter: invert(1); margin: auto; width: 50px;">`;
      contactForm.innerHTML= fail + `<div style = "font-weight: bold;
      font-size: 20px;">failed to send</div>`;

    },
  });
  
 //for login?
 let lettersonly = /^[a-zA-Z0-9]+$/;
  if(lettersonly.test(name)&& email.length!==0){
    //has to be sth and also not empty 
  }else{
    alert(`Enter letters or numbers only for name, \nThank you!`);
  }


});

function LoadingScreen(id){
  //pass the id then change 
  id.innerHTML = '<img src = "https://media.tenor.com/RbKRfQfIcXIAAAAi/roblox-loading.gif" style = "margin: auto; width:40px;">';
}
