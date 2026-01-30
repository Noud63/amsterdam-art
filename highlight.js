// Highlight list item on hover

const res = Array.from(document.querySelectorAll('.item'));
// console.log(res)

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
































