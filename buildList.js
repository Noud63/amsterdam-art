
// Sort JSON file by key name alphabetically

function sortJson() {
        var name = [];
    for( const el of art.features){
        name.push(el);
        
  }
    return name;
}

var artName = sortJson();
// console.log(artName);


myArt = artName.sort((a,b)=> {
        var x = a.properties.name.toLowerCase();
        var y = b.properties.name.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
})

console.log(myArt)



// Add items and build list

var i = 1;
const buildItemList = (data) =>  {
        
        for( const el of data){
            var prop = el.properties;
            var myMarker = el.marker;
            
        var listings = document.getElementById('listings');
        var listing = listings.appendChild(document.createElement('div'));
        listing.className = 'item';
        listing.id = 'newItem' + i++;
        listing.marker = myMarker;

        var content = document.createElement('div');
            listing.appendChild(content);
                content.className = 'content';
                    content.innerHTML= `<div class="box">
                                        <div class="flex">
                                        <div class="space">${prop.name}</div>
                                        <span class="info">Title: "${prop.title}"</span><br>
                                        <span class="extra">${prop.extra}<br>Adress: ${prop.adress}</span>
                                        </div>
                                        <img src="images/thumbs/${prop.image}" id="pic">
                                        </div>`;
                        
                        
            if(!prop.extra){
                    content.innerHTML = `<div class="box">
                                         <div class="flex">
                                         <div class="space">${prop.name}</div> 
                                         <span class="info">Title: "${prop.title}"</span><br>
                                         <span class="extra">Adress: ${prop.adress}</span>
                                         </div>
                                         <img src="images/thumbs/${prop.image}" id="pic">
                                         </div>`;
                                        
                        }

            if(!prop.title){
                    content.innerHTML = `<div class="box">
                                         <div class="flex">
                                         <div class="space">${prop.name}</div> 
                                         <span class="extra2">${prop.extra}<br>Adress: ${prop.adress}</span>
                                         </div>
                                         <img src="images/thumbs/${prop.image}" id="pic">
                                         </div>`;
                                
                        }
            
              }                    
        
    }

buildItemList(myArt);

/*
var content = document.createElement('div');
        listing.appendChild(content);
        content.className = 'content';
        content.innerHTML=  `<div class="space">${prop.name}</div>
                             <span class="info">Title: "${prop.title}"</span><br>
                             <span class="extra">${prop.extra}<br>Adress: ${prop.adress}</span>`;
                            
                            
    if(!prop.extra){
            content.innerHTML = `<div class="space">${prop.name}</div> 
                                 <div><span class="info">Title: "${prop.title}"</span></div>
                                 <div><span class="extra">Adress: ${prop.adress}</span></div>`;
                                
                }

    if(!prop.title){
            content.innerHTML = `<div class="space">${prop.name}</div> 
                                 <span class="info"></span>
                                 <span class="extra2">${prop.extra}<br>Adress: ${prop.adress}</span><div>`;
                                
            }
            
        }                    
        
    }
    */
  

        
