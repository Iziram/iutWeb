import {Crowd, Querie} from './types';
'use strict';
function generateMediaQA(userInfos : string[], mediaText : string, avatarIcon : string, mobile : boolean, modal ? : HTMLElement){
  var media = null
  console.log(mobile)
  if(!mobile){
    media = document.createElement('div')
    media.className="mx-2 my-2 bg-secondary text-dark text-center"

    const columns = document.createElement('div')
      columns.className="columns"

      const user = document.createElement('div')
        user.className="column col-3"

        const hero = document.createElement('div')
          hero.className="hero hero-sm p-centered"

          const avatar = document.createElement('div')
            avatar.className="avatar avatar-xl mx-2 my-2 bg-secondary"

            const presence = document.createElement('i')
              presence.className="avatar-presence"
              const status = ["online","away","busy",""]
              const i = status[Math.floor(Math.random()*status.length)];
              if (i != "") presence.classList.add(i);
            
            const icon = document.createElement('img')
              icon.src = avatarIcon
            
            avatar.appendChild(presence)
            avatar.appendChild(icon)

          const userInfo = document.createElement('div')
            userInfo.className="container"
            
            const p = document.createElement('p')
              p.innerHTML = "<u>"+userInfos[0]+"</u>"
            const p2 = document.createElement('p')
              p2.className = "text-gray"
              p2.innerText = " @"+userInfos[1]
          
            userInfo.appendChild(p)
            userInfo.appendChild(p2)
          
          hero.appendChild(avatar)
          hero.appendChild(userInfo)

        user.appendChild(hero)

      columns.appendChild(user)
      const divider = document.createElement('div')
        divider.className="divider-vert"
      
      columns.appendChild(divider)

      const content = document.createElement('div')
        content.className ="column"

        const text = document.createElement("div")
          text.className="hero hero-sm mx-2 answer"

          const p3 = document.createElement('p')
            p3.className = "mx-2"
            p3.textContent = mediaText
          
        text.appendChild(p3)
        if(modal) text.appendChild(modal);
        
        content.appendChild(text)
      columns.appendChild(content)

    media.appendChild(columns)
  }else{
    media = document.createElement('div')
    media.className="mx-2 my-2 bg-secondary text-dark text-center"

        const hero = document.createElement('div')
          hero.className="hero hero-sm p-centered"

          const avatar = document.createElement('div')
            avatar.className="avatar avatar-xl mx-2 my-2 bg-secondary"

            const presence = document.createElement('i')
              presence.className="avatar-presence"
              const status = ["online","away","busy",""]
              const i = status[Math.floor(Math.random()*status.length)];
              if (i != "") presence.classList.add(i);
            
            const icon = document.createElement('img')
              icon.src = avatarIcon
            
            avatar.appendChild(presence)
            avatar.appendChild(icon)

          const userInfo = document.createElement('div')
            userInfo.className="container"
            
            const p = document.createElement('p')
              p.innerHTML = "<u>"+userInfos[0]+"</u>"
            const p2 = document.createElement('p')
              p2.className = "text-gray"
              p2.innerText = " @"+userInfos[1]
          
            userInfo.appendChild(p)
            userInfo.appendChild(p2)
          
          hero.appendChild(avatar)
          hero.appendChild(userInfo)

      media.appendChild(hero)

        const text = document.createElement("div")
          text.className="container mx-2 answer"

          const p3 = document.createElement('p')
            p3.className = "mx-2 md-2"
            p3.textContent = mediaText
          
        text.appendChild(p3)
        if(modal) text.appendChild(modal);
        else{
          const divider = document.createElement('div')
            divider.className="divider"
          text.appendChild(divider)
        }
        

    media.appendChild(text)
  }

  return media
        
}

function appendAnwser(mediaQuery : HTMLElement, mediaAnswer : HTMLElement){
  const div = document.createElement('div')
    div.appendChild(mediaQuery.cloneNode(true))
    div.appendChild(mediaAnswer)

    const title = "Question Thread :"
  const answer = modalButtonGenerator(function() {generateModal(div, title)}, "Click to see the answer")
  mediaQuery.getElementsByClassName("answer")[0].appendChild(answer)
}

function generateAllMediaQueries(array : Querie[], observer : IntersectionObserver, mobile : boolean){
  var medias = []
  var answers = []
  for(var i  = 0; i< array.length; i++){
    const obj = array[i];
    const mediaObject = generateMediaQA(obj.userInfos, obj.mediaText, obj.avatarIcon, mobile, obj.modal)
    if(obj.mediaAnswer != null){
      answers.push([i,obj.mediaAnswer])
      mediaObject.classList.add("media-answer")
    }
    medias.push(mediaObject)

  }

    answers.forEach((ans)=>{
      var parent = medias[ans[1]]
      var child = medias[ans[0]]
      appendAnwser(parent, child)
    });


  const currentBox = document.getElementsByClassName("holder")[0]

  medias.forEach((mediaObject)=>{
    if(!mediaObject.classList.contains("media-answer")){
      observer.observe(mediaObject)
      currentBox.appendChild(mediaObject)
    }
  });


}

function generateBox(id : string){
  //title 
  var title = document.createElement("h1")
  title.classList.add("text-center")
  title.innerHTML = id
  //box
  var box = document.createElement("div")
  box.classList.add("box", "has-background-info", "holder","animate__animated","animate__fadeIn","animate__slow")
  box.id = id
  //placing in media playground
  const doc = document.getElementById("Media Playground")
  doc.innerHTML = ''
  box.appendChild(title)
  doc.appendChild(box)
}

function generateComments(crowd : Crowd[]){
  var array : Querie[]= [] 
  const currentBox = document.getElementsByClassName("holder")[0].id as string
  crowd.forEach(people =>{
      if (currentBox == people.subject){
        var button = null;
        if(people.media) button = modalButtonGenerator(people.media, people.name+" shared a media")
        const obj = {
          userInfos: [people.name, people.username],
          mediaText: people.message,
          avatarIcon: people.icon,
          modal: button,
          parent: people.parent,
          mediaAnswer: people.answer
        } as Querie
        array.push(obj)
      }
      
  })
  return array
}

function generateModalImg(image : string, title ?: string){
  var img = document.createElement("img")
  img.className = "img-responsive img-fit-cover text-center"
  img.src =image

  generateModal(img, title)
}

function generateModalText(text : string, title ?: string ){
  var box = document.createElement('div')
  box.classList.add("box")

  var texte = document.createTextNode(text)
  
  box.appendChild(texte)
  box.className="text-dark bg-gray"

  generateModal(box,title)
}

function generateModalVideo(vid : string, title ?: string){
  var video = document.createElement('video')
  video.className = "video-responsive"
  video.src = vid
  video.controls = true

  generateModal(video,title)
}

function generateModal(innerContent : HTMLElement, modalTitle : string = "Modal Title"){
  const modal = document.createElement('div')
    modal.className = "modal active modal-lg"

    const modalContainer = document.createElement('div')
      modalContainer.className = "modal-container bg-gray"

      const modalHeader = document.createElement('div')
      modalHeader.className = "modal-header"

        const close = document.createElement('button')
          close.className = "btn s-circle float-right"
          close.onclick = closeModal 
          close.ariaLabel = "Close"

          const icon = document.createElement('i')
            icon.className = "icon icon-cross text-dark"
          close.appendChild(icon)

        const title = document.createElement('div')
          title.className = "modal-title h5 text-center"
          title.innerText = modalTitle
        
          modalHeader.appendChild(close)
          modalHeader.appendChild(title)
      
      const modalBody = document.createElement('div')
        modalBody.className = "modal-body s-rounded"
        
        const content = document.createElement('div')
          content.className="content"
          content.appendChild(innerContent)
        
        modalBody.appendChild(content)
      
      const modalFooter = document.createElement('div')
        modalFooter.className = "modal-footer"

     modalContainer.appendChild(modalHeader) 
     modalContainer.appendChild(modalBody) 
     modalContainer.appendChild(modalFooter) 

    modal.appendChild(modalContainer)

  
  document.getElementById("Media Playground").appendChild(modal)
}

function modalButtonGenerator(func : any, text : string ="Click to open the media") : HTMLButtonElement{
  var button = document.createElement('button')
  button.innerHTML = text
  button.classList.add("btn","s-rounded","my-2")
  button.title = text
  button.onclick = func
  return button
}

function closeModal(){
  var classes = document.getElementsByClassName("modal active modal-lg")
  classes[classes.length-1].remove()
}

function iziram(subject : string, message : string, media : null | Function = null): Crowd{
  var obj = {
    name : "Matthias Hartmann",
    username : "Iziram",
    message : message,
    subject : subject,
    icon : "images/logo.svg"
  } as Crowd

  if(media) {
    obj.media = media;
  }
  return obj
}

export function displayComments(subject : string , id : string){
  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
          entry.target.classList.add("animate__animated","animate__fadeInUp")
      }
    })
  })
  
  const crowd = [
    {
      name : "Anne Onymous",
      username : "Anonymous",
      message : "Sacristi de sacréfice de câline de bine de calvaire de cul de ciboire de charrue de géritole de bout d'ciarge d'étole de gériboire de boswell.",
      subject : "Personal Informations",
      icon : "images/Sabrina.jpeg"
    },
    iziram("Personal Informations","This is an example of a simple answer without media"),
    {
      name : "John Doe",
      username : "DoeNUTS",
      message : "This is an example of a question with a media : Picture.",
      media : function() {generateModalImg('images/cristof.jpeg')},
      subject : "Personal Informations",
      icon : "images/cristof.jpeg"
    },
    iziram("Personal Informations","this is an example of an answer with a media : Text", function() {generateModalText("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non felis enim. Donec metus sapien, aliquam eu ullamcorper hendrerit, posuere non ante. Vivamus efficitur, sem quis venenatis suscipit, dui velit tincidunt lacus, quis dignissim odio leo sed dolor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi vulputate vestibulum ultrices. Praesent convallis, elit vel finibus venenatis, purus sapien condimentum justo, nec varius metus nibh et mauris. Morbi pretium arcu purus, in dictum neque malesuada et. In a ultricies nulla. Nunc tristique pharetra magna nec facilisis. Ut aliquam tortor ac laoreet aliquet. Morbi lobortis iaculis purus. Ut ac metus venenatis, rhoncus quam nec, blandit dolor. Praesent volutpat pellentesque molestie. ")}),
    {
      name : "Hyser Anybody",
      username : "WhereIsWaldo19",
      message : "This is an example of a question with a media : Video.",
      media : function() {generateModalVideo('images/video_placeholder.mp4',"Video of my Minecraft Trailer")},
      subject : "Personal Informations",
      icon : "images/Taï.jpeg",
      answer: 0
    }
  ];
  generateBox(subject)
  const array = generateComments(crowd)
  generateAllMediaQueries(array, observer, mobile)

  const activated = document.getElementsByClassName('tab-item active');
  for(var i = 0 ; i < activated.length; i++){
    activated[i].classList.remove("active")
  }
  const active = document.getElementById(id)
  active.classList.add("active")

}

displayComments("Personal Informations","0")