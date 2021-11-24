function generateMediaQA(userInfos, mediaText , avatarIcon, mobile, modal){
  var media = null
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

function appendAnwser(mediaQuery, mediaAnswer){
  const div = document.createElement('div')
    div.appendChild(mediaQuery.cloneNode(true))
    div.appendChild(mediaAnswer)

    const title = "Question Thread :"
  const answer = modalButtonGenerator(function() {generateModal(div, title)}, "Click to see the answer")
  mediaQuery.getElementsByClassName("answer")[0].appendChild(answer)
}

function generateAllMediaQueries(array, observer, mobile){
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

function generateBox(id){
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

function generateComments(crowd){
  var array= [] 
  const currentBox = document.getElementsByClassName("holder")[0].id
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
        }
        array.push(obj)
      }
      
  })
  return array
}

function generateModalImg(image, title){
  var img = document.createElement("img")
  img.className = "img-responsive img-fit-cover text-center"
  img.src =image

  generateModal(img, title)
}

function generateModalText(text, title){
  var box = document.createElement('div')
  box.classList.add("box")

  var texte = document.createTextNode(text)
  
  box.appendChild(texte)
  box.className="text-dark bg-gray"

  generateModal(box,title)
}

function generateModalVideo(vid, title){
  var video = document.createElement('video')
  video.className = "video-responsive"
  video.src = vid
  video.controls = true

  generateModal(video,title)
}

function generateModal(innerContent, modalTitle = "Modal Title"){
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

function modalButtonGenerator(func, text ="Click to open the media"){
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

function iziram(subject, message, media= null, answer = null){
  var obj = {
    name : "Matthias Hartmann",
    username : "Iziram",
    message : message,
    subject : subject,
    icon : "images/logo.svg"
  }

  if(media) {
    obj.media = media;
  }
  if(answer != null){
    obj.answer = answer
  }
  return obj
}

function displayComments(subject, id){
  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
          entry.target.classList.add("animate__animated","animate__fadeInUp")
      }
    })
  })
  
  
  generateBox(subject)
  const array = generateComments(getCrowd())
  generateAllMediaQueries(array, observer, mobile)

  const activated = document.getElementsByClassName('tab-item active');
  for(var i = 0 ; i < activated.length; i++){
    activated[i].classList.remove("active")
  }
  const active = document.getElementById(id)
  active.classList.add("active")

}

displayComments("Personal Informations","0")


function getCrowd(){
  // return [
  //     {
  //         name : "Anne Onymous",
  //         username : "Anonymous",
  //         message : "Sacristi de sacréfice de câline de bine de calvaire de cul de ciboire de charrue de géritole de bout d'ciarge d'étole de gériboire de boswell.",
  //         subject : "Personal Informations",
  //         icon : "images/Sabrina.jpeg"
  //       },
  //       iziram("Personal Informations","This is an example of a simple answer without media"),
  //       {
  //         name : "John Doe",
  //         username : "DoeNUTS",
  //         message : "This is an example of a question with a media : Picture.",
  //         media : function() {generateModalImg('images/cristof.jpeg')},
  //         subject : "Personal Informations",
  //         icon : "images/cristof.jpeg"
  //       },
  //       iziram("Personal Informations","this is an example of an answer with a media : Text", function() {generateModalText("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non felis enim. Donec metus sapien, aliquam eu ullamcorper hendrerit, posuere non ante. Vivamus efficitur, sem quis venenatis suscipit, dui velit tincidunt lacus, quis dignissim odio leo sed dolor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi vulputate vestibulum ultrices. Praesent convallis, elit vel finibus venenatis, purus sapien condimentum justo, nec varius metus nibh et mauris. Morbi pretium arcu purus, in dictum neque malesuada et. In a ultricies nulla. Nunc tristique pharetra magna nec facilisis. Ut aliquam tortor ac laoreet aliquet. Morbi lobortis iaculis purus. Ut ac metus venenatis, rhoncus quam nec, blandit dolor. Praesent volutpat pellentesque molestie. ")}),
  //       {
  //         name : "Hyser Anybody",
  //         username : "WhereIsWaldo19",
  //         message : "This is an example of a question with a media : Video.",
  //         media : function() {generateModalVideo('images/video_placeholder.mp4',"Video of my Minecraft Trailer")},
  //         subject : "Personal Informations",
  //         icon : "images/Taï.jpeg",
  //         answer: 0
  //       }
  // ]

  return [
    //Personnal informations
    {
      name : "Cristof Ornal",
      username : "SuperCristof9000",
      message : "What is your name ?",
      subject : "Personal Informations",
      icon : "images/cristof.jpeg"
    },
    iziram("Personal Informations", 
    "As it is obviously stated in the title of this QA, My name is Matthias HARTMANN.",
    null, 0),
    {
      name : "Hyser Anybody",
      username : "WhereIsWaldo19",
      message : "Where are you from ?",
      subject : "Personal Informations",
      icon : "images/waldo.jpeg"
    },
    iziram("Personal Informations", 
    "I was born in France, in a town named Brest, near the atlantic ocean in Brittanny",
    null, 2),
    {
      name : "Anne Onymous",
      username : "Annonymous",
      message : "Where do you live ?",
      subject : "Personal Informations",
      icon : "images/Taï.jpeg"
    },
    iziram("Personal Informations", 
    "I lived my past years in a little town next to Brest, however, because of my studies I now live in Lannion.",
    null, 4),
    {
      name : "Kailee Camila",
      username : "KaileeMila",
      message : "Do you have any brother or sisters ?",
      subject : "Personal Informations",
      icon : "images/kailee.jpeg"
    },
    iziram("Personal Informations", 
    "I do have 2 older brothers, respectively named Dorian (the oldest, he's 22) and Cyril (he's 20)",
    null, 6),
    {
      name : "Sarah Pelle",
      username : "Saracroche",
      message : "How old are you ?",
      subject : "Personal Informations",
      icon : "images/sarah.jpeg"
    },
    iziram("Personal Informations",
    "It might surprise you but my brothers and I share were born following a arithmetical sequence with a commmon difference of 2. It is a scientific way to say that I'm 18",
    null, 8),
    {
      name : "Suzzie Ki",
      username : "SuzzieSquad",
      message : "Do you have any pets ?",
      subject : "Personal Informations",
      icon : "images/suzzie.jpeg"
    },
    iziram("Personal Informations",
    "Yeah, I have a cat named pixel, I love her, and on her side, she loves when I feed her. So mutual love I guess.",
    function() {generateModalImg("images/pixel.jpg", "The best picture of Pixel")},
    10),

    //Studies

    {
      name : "",
      username : "",
      message : "What is you school curriculum ?",
      subject : "Studies",
      icon : "images/"
    },
    iziram("Studies",
    "Well, Last year (2020) I got my baccalaureate (my specialities were Mathematics and computer science), an equivalent in UK would be the A level.",
    null,0),
    {
      name : "",
      username : "",
      message : "Are you following any university course ?",
      subject : "Studies",
      icon : "images/"
    },
    iziram("Studies",
    "I pursue a Network and Telecommunications' degree in the Univeristy Institute of Technology of Lannion.",
    null,2),
    {
      name : "",
      username : "",
      message : "Do you have any diploma ?",
      subject : "Studies",
      icon : "images/"
    },
    iziram("Studies",
    "Other than the baccalaureate, I have the FCE (Cambridge English: First) and a fencing activity leader that allows me to teach fencing.",
    null,4),
    {
      name : "",
      username : "",
      message : "Where do you see you in 5 years ?",
      subject : "Studies",
      icon : "images/"
    },
    iziram("Studies",
    "I don't plan that far away in the futur but if things go well I should be studing my last year of engineering school to get a master's degree.",
    null,6),
    {
      name : "",
      username : "",
      message : "What do you want to do for a living ?",
      subject : "Studies",
      icon : "images/"
    },
    iziram("Studies",
    "I've always wanted to work in the Computer Science domain, now for the specific job I want to do my mind is still blurry. I love a lot of things and for now can't find a way of choosing which is better.",
    null,8),

    //Skills

    {
      name : "",
      username : "",
      message : "Are you able to work with people or do you prefer to do everything by yourself ?",
      subject : "Skills",
      icon : "images/"
    },
    iziram("Skills",
    "I tend to do everything by myself when the people that are working with me aren't doing what they have to fast enough. However I'll still try to help them to learn faster ways to do their work so next time I don't have to do everything.",
    null,0),
    {
      name : "",
      username : "",
      message : "Can you describe what computer science's skills you have ?",
      subject : "Skills",
      icon : "images/"
    },
    iziram("Skills",
    "Because i'm fond of IT, I always want to learn new things and skills related to projects I make. For example, I recently learnt how to use the VSCode Extension API written in Typescript to create my own extension to generate Doxygen Docstring (description of functions and variables in a program) in python file. Last year I wanted to mod Minecraft, a game made in Java so I spend most of my free time studying and learning Java.",
    null,2),
    {
      name : "",
      username : "",
      message : "What projects have you done recently ?",
      subject : "Skills",
      icon : "images/"
    },
    iziram("Skills",
    "As stated in the previous Question's anwser, I made a VSCode extension, I also created multiple plugins (modifications of the server side) for Minecraft, all written in Java, I did some web developping such as this website. In general you can see what projects I have done on my github : https://github.com/Iziram",
    null,4),

    //Hobbies

    {
      name : "",
      username : "",
      message : "Do you play video games ?",
      subject : "Hobbies",
      icon : "images/"
    },
    iziram("Hobbies",
    "Yeah, I do play, most of the time I play Minecraft or Brawlhalla but I have a whole galery of very different games that I could play.",
    null,0),
    {
      name : "",
      username : "",
      message : "Do you practice any sport ?",
      subject : "Hobbies",
      icon : "images/"
    },
    iziram("Hobbies",
    "I'm quite sporty actually. I tried a lot of different sports (basket ball, swimming, archery...) but I've settled on fencing since 2013.",
    null,2),
    {
      name : "",
      username : "",
      message : "Do you watch any series ?",
      subject : "Hobbies",
      icon : "images/"
    },
    iziram("Hobbies",
    "I'm not a big serie watcher but I watched some and my favourite one is Mr.Robot.",
    null,4),
    {
      name : "",
      username : "",
      message : "Have you ever watched a japanese animated series ?",
      subject : "Hobbies",
      icon : "images/"
    },
    iziram("Hobbies",
    "Actually I do prefer japanese animated series compared to series so the anwser is a big Yes. I watch japanese animated series almost every night. My favourite ones are Code Geass, Your Name and I want to eat your pancreas (the last title might be a bit confusing but the japanese animated series tells a beautiful story)",
    null,6),
    {
      name : "",
      username : "",
      message : "Do you have any other hobbie that you want to share ?",
      subject : "Hobbies",
      icon : "images/"
    },
    iziram("Hobbies",
    "Well, one of my biggest hobbie is developping. I love programming. I always try to find new projects to experiment new programming languages or new way of using the ones that I know. My VSCode extension is a great example of this. I had time and didn't know what to do, so i looked at my programming course and found that it was taking me a long time to generate all the necessary Docstring. So I took my patience and my courage and learnt the VSCode extension API (to a certain level).",
    null,8),
  ]
}