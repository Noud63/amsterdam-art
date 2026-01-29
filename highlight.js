// Highlight list item on hover

const res = Array.from(document.querySelectorAll('.item'));
console.log(res)

function highLightItem () {

for(const el of res){
    
      el.onmouseover = function (){
          mouseOver();
       }
     function mouseOver(){
      el.style.background = '#cf9451';
      el.marker.bounce(3);
       }  
      }
      
for(const el of res){
      el.onmouseout = function (){
         mouseOut();
      }
     function mouseOut(){
      el.style.background = '#b47630';
      el.marker.stopBouncing();
       }  
   }    
}

highLightItem();


/*
As a forEach() function

var res = Array.from(document.querySelectorAll('.item'));
console.log(res)
res.forEach( el => el.onmouseover = function() {
    mouseOver(el)
});
function mouseOver(el) {
    el.style.backgroundColor = '#f2e8e6';
}
res.forEach( el => el.onmouseout = function() {
    mouseOut(el)
});
function mouseOut(el) {
    el.style.backgroundColor = '#ffffff';
}  
*/































