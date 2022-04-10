let jsmediatags = window.jsmediatags;
const input = document.querySelector('#audio-upload');
const audio = document.querySelector('audio');

function getAudio() {
    
    
    input.type = 'file';
    input.onchange = e => {
      var file = e.target.files[0];
  
      var reader = new FileReader();
      reader.addEventListener('load', function(e) {
        audio.src = e.target.result;
        audio.play();
      });
      reader.readAsDataURL(file);
    }
  }
  getAudio();

//load external mp3/audio file from input field

input.addEventListener("change", (event)=>{
    let file = event.target.files[0];
    

  //jsmediatags library retrieves media data from file
  jsmediatags.read(file, {        

    //if media data is found
    onSuccess: function(tag){
        console.log(tag);
        
        //does picture exist or not?
        if(!tag.tags.picture){
            console.log('picture not available');
            document.querySelector('.img').style.background = "none";
            document.querySelector('.img').style.backgroundColor= "#000";            
            document.querySelector('.img').style.zIndex = '100';
            document.querySelector('.img').innerHtml = "N / A";

        }else{
            let data = tag.tags.picture.data;
            let format = tag.tags.picture.format;
            let base64String = "";


        for (let i=0; i<data.length; i++)
            base64String+= String.fromCharCode(data[i]);

        document.querySelector('.img').style.backgroundImage = `url(data:${format};base64,${window.btoa(base64String)})`;
        document.querySelector('.img').textContent= null;
        }
        

        //does title exist or not?
        
        if(!tag.tags.title){
            console.log('title not available');
        }else{
            document.querySelector('.title').textContent = tag.tags.title;

        }

        //does artist exist or not?
        if(!tag.tags.artist){
            console.log('artist not available');
        }else{
            document.querySelector('.artist').textContent = tag.tags.artist;

        }

        


    },

    //if media data is not found
    onError: function (error){
        
        if(!file.tags){
            console.log('tags dont exit')
            console.log(file);
            document.querySelector('.img').style.backgroundImage ="url(../images/not-available.svg)";
            document.querySelector('.artist').textContent= "N/A";
            document.querySelector('.title').textContent= "N/A";
        }else{
            console.log('tags exist');
        }

    } 

})


    
})



