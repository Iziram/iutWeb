'use strict';
function generateMediaQA(userInfos,mediaText, avatarIcon, modal, mobile){
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
    const mediaObject = generateMediaQA(obj.userInfos, obj.mediaText, obj.avatarIcon, obj.modal, mobile)
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

function generateBox(obj){
  //title 
  var title = document.createElement("h1")
  title.classList.add("text-center")
  title.innerHTML = obj
  //box
  var box = document.createElement("div")
  box.classList.add("box", "has-background-info", "holder","animate__animated","animate__fadeIn","animate__slow")
  box.id = obj
  //placing in media playground
  const doc = document.getElementById("Media Playground")
  doc.innerHTML = ''
  box.appendChild(title)
  doc.appendChild(box)
}

function generateComments(crowd){
  var array = []
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
  img.style = `
  height: 75%;
  width: 50vw;
  `

  generateModal(img, title)
}

function generateModalText(text,title){
  var box = document.createElement('div')
  box.classList.add("box")

  var texte = document.createTextNode(text)
  
  box.appendChild(texte)
  box.className="text-dark bg-gray"

  generateModal(box,title)
}

function generateModalVideo(vid,title){
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

function modalButtonGenerator(func, text="Click to open the media"){
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

function iziram(subject, message, media = null){
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
  return obj
}

function displayComments(subject, id){
  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
          entry.target.classList.add("animate__animated","animate__fadeInDown")
      }
    })
  })
  
  const complex = document.createElement('div')
  complex.classList.add("box")
  complex.innerHTML = `
  <div class='content'>
  <h1>Hello World</h1>
  <p>Lorem ipsum<sup><a>[1]</a></sup> dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque. Sub<sub>script</sub> works as well!</p>
  <h2>Second level</h2>
  <p>Curabitur accumsan turpis pharetra <strong>augue tincidunt</strong> blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et neque nisl.</p>
  <ul>
    <li>In fermentum leo eu lectus mollis, quis dictum mi aliquet.</li>
    <li>Morbi eu nulla lobortis, lobortis est in, fringilla felis.</li>
    <li>Aliquam nec felis in sapien venenatis viverra fermentum nec lectus.</li>
    <li>Ut non enim metus.</li>
  </ul>
  <h3>Third level</h3>
  <p>Quisque ante lacus, malesuada ac auctor vitae, congue <a href='#'>non ante</a>. Phasellus lacus ex, semper ac tortor nec, fringilla condimentum orci. Fusce eu rutrum tellus.</p>
  <ol>
    <li>Donec blandit a lorem id convallis.</li>
    <li>Cras gravida arcu at diam gravida gravida.</li>
    <li>Integer in volutpat libero.</li>
    <li>Donec a diam tellus.</li>
    <li>Aenean nec tortor orci.</li>
    <li>Quisque aliquam cursus urna, non bibendum massa viverra eget.</li>
    <li>Vivamus maximus ultricies pulvinar.</li>
  </ol>
  <blockquote>Ut venenatis, nisl scelerisque sollicitudin fermentum, quam libero hendrerit ipsum, ut blandit est tellus sit amet turpis.</blockquote>
  <p>Quisque at semper enim, eu hendrerit odio. Etiam auctor nisl et <em>justo sodales</em> elementum. Maecenas ultrices lacus quis neque consectetur, et lobortis nisi molestie.</p>
  <p>Sed sagittis enim ac tortor maximus rutrum. Nulla facilisi. Donec mattis vulputate risus in luctus. Maecenas vestibulum interdum commodo.</p>
  <dl>
    <dt>Web</dt>
    <dd>The part of the Internet that contains websites and web pages</dd>
    <dt>HTML</dt>
    <dd>A markup language for creating web pages</dd>
    <dt>CSS</dt>
    <dd>A technology to make HTML look better</dd>
  </dl>
  <p>Suspendisse egestas sapien non felis placerat elementum. Morbi tortor nisl, suscipit sed mi sit amet, mollis malesuada nulla. Nulla facilisi. Nullam ac erat ante.</p>
  <h4>Fourth level</h4>
  <p>Nulla efficitur eleifend nisi, sit amet bibendum sapien fringilla ac. Mauris euismod metus a tellus laoreet, at elementum ex efficitur.</p>
  <pre>
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Hello World&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra nec nulla vitae mollis.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;
</pre>
  <p>Maecenas eleifend sollicitudin dui, faucibus sollicitudin augue cursus non. Ut finibus eleifend arcu ut vehicula. Mauris eu est maximus est porta condimentum in eu justo. Nulla id iaculis sapien.</p>
  <table>
    <thead>
      <tr>
        <th>One</th>
        <th>Two</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Three</td>
        <td>Four</td>
      </tr>
      <tr>
        <td>Five</td>
        <td>Six</td>
      </tr>
      <tr>
        <td>Seven</td>
        <td>Eight</td>
      </tr>
      <tr>
        <td>Nine</td>
        <td>Ten</td>
      </tr>
      <tr>
        <td>Eleven</td>
        <td>Twelve</td>
      </tr>
    </tbody>
  </table>
  <p>Phasellus porttitor enim id metus volutpat ultricies. Ut nisi nunc, blandit sed dapibus at, vestibulum in felis. Etiam iaculis lorem ac nibh bibendum rhoncus. Nam interdum efficitur ligula sit amet ullamcorper. Etiam tristique, leo vitae porta faucibus, mi lacus laoreet metus, at cursus leo est vel tellus. Sed ac posuere est. Nunc ultricies nunc neque, vitae ultricies ex sodales quis. Aliquam eu nibh in libero accumsan pulvinar. Nullam nec nisl placerat, pretium metus vel, euismod ipsum. Proin tempor cursus nisl vel condimentum. Nam pharetra varius metus non pellentesque.</p>
  <h5>Fifth level</h5>
  <p>Aliquam sagittis rhoncus vulputate. Cras non luctus sem, sed tincidunt ligula. Vestibulum at nunc elit. Praesent aliquet ligula mi, in luctus elit volutpat porta. Phasellus molestie diam vel nisi sodales, a eleifend augue laoreet. Sed nec eleifend justo. Nam et sollicitudin odio.</p>
  <figure>
    <img src='https://bulma.io/images/placeholders/256x256.png'>
    <img src='https://bulma.io/images/placeholders/256x256.png'>
    <figcaption>
      Figure 1: Some beautiful placeholders
    </figcaption>
  </figure>
  <h6>Sixth level</h6>
  <p>Cras in nibh lacinia, venenatis nisi et, auctor urna. Donec pulvinar lacus sed diam dignissim, ut eleifend eros accumsan. Phasellus non tortor eros. Ut sed rutrum lacus. Etiam purus nunc, scelerisque quis enim vitae, malesuada ultrices turpis. Nunc vitae maximus purus, nec consectetur dui. Suspendisse euismod, elit vel rutrum commodo, ipsum tortor maximus dui, sed varius sapien odio vitae est. Etiam at cursus metus.</p>
</div>`;

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
    },
    iziram("Personal Informations","this is an example of an answer with a media : Complex media", function() {generateModal(complex)})
    
    
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

displayComments("Personal Informations",0)