'use strict';

function generateMediaQA(texte = "Place Holder Yay <b>Matthias</b>",  media = null, place = "left", modal){
  //article element
  var article = document.createElement("article")
  article.className = "media "+place
  
  //figure element
  var figure = document.createElement("figure")
  figure.className ="media-"+place
  var p = document.createElement("p")
  p.className = "image is-64x64"

  var img = document.createElement("img")
  img.src = media

  p.appendChild(img)
  figure.appendChild(p)
  
  //media content
  var mediaContent = document.createElement("div")
  mediaContent.className = "media-content"

  var content = document.createElement("div")
  content.className = "content"

  var text = document.createElement("p")
  text.className = "has-text-"+place
  text.innerHTML = texte

  content.appendChild(text)
  
  
  mediaContent.appendChild(content)

  //tag
  var tag = document.createElement('span')
  tag.classList.add("tag","is-rounded", "mx-1")
  if(place == "left"){
    tag.classList.add("is-warning");
    tag.innerHTML = "Question"
  } 
  else{
    tag.classList.add("is-success");
    tag.innerHTML = "Answer"
  } 
  

  //finish article element
  if(place == "left"){
    article.appendChild(figure)
    article.appendChild(tag)
    article.appendChild(mediaContent)
    if(modal){
      article.appendChild(modal)
    }
    
  }else{
    if(modal){
      article.appendChild(modal)
    }
    article.appendChild(mediaContent)
    article.appendChild(tag)
    article.appendChild(figure)
  }

  
  return article
}

function generateAllMediaQueries(array, observer){
  array.forEach(obj => {
    const doc = document.getElementById(obj.subject)
    const mediaObject = generateMediaQA(obj.texte, obj.media, obj.place, obj.image)
    mediaObject.classList.add("notification","has-background-info-light")
    
    observer.observe(mediaObject)
    doc.appendChild(mediaObject)
  });
}

function generateBox(obj){
  //title 
  var title = document.createElement("h1")
  title.classList.add("title", "has-text-centered","is-underlined","has-text-info-light")
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
        const text = "<strong>"+people.name+"</strong> <small>@"+people.username+"</small><br>"+people.message
      var place = "left"
      if(people.username == "Iziram") place = "right"
      const obj = {
        texte : text,
        media : people.icon,
        image: button,
        place : place,
        subject: people.subject
      }
      array.push(obj)
      }
      
  })
  return array
}

function generateModalImg(image){
  var img = document.createElement("img")
  img.src =image
  generateModal(img)
}

function generateModalText(text){
  var box = document.createElement('div')
  box.classList.add("box")

  var texte = document.createTextNode(text)
  box.appendChild(texte)

  generateModal(box)
}

function generateModalVideo(vid){
  var video = document.createElement('video')
  video.src = vid
  video.controls = true

  generateModal(video)
}

function generateModal(innerContent){
  var modal = document.createElement('div')
  modal.className = "modal is-active is-clipped"

  var bg = document.createElement('div')
  bg.className = "modal-background"
  bg.onclick = closeModal

  var content = document.createElement('div')
  content.className = "modal-content"
  
  var close = document.createElement('button')
  close.className = "modal-close is-large"
  close.onclick = closeModal

  content.appendChild(innerContent)
  modal.appendChild(bg)
  modal.appendChild(content)
  modal.appendChild(close)

  document.getElementById("Media Playground").appendChild(modal)
}

function modalButtonGenerator(func, text="Click to open the media"){
  var button = document.createElement('button')
  button.innerHTML = text
  button.classList.add("button","is-info","is-rounded","is-outlined","animate__animated","animate__pulse","animate__infinite","animate__delay-1s")
  button.title = "Click to open the media"
  button.onclick = func
  return button
}

function closeModal(){
  document.getElementsByClassName("modal is-active is-clipped")[0].remove()
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
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
          if (entry.target.classList.contains("left")){
            entry.target.classList.add("animate__animated","animate__fadeInLeft")
            return;
          }else{
            entry.target.classList.add("animate__animated","animate__fadeInRight")
            return;
          }
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
      message : "This is an example of a simple question without media.",
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
      media : function() {generateModalVideo('images/video_placeholder.mp4')},
      subject : "Personal Informations",
      icon : "images/taï.jpeg"
    },
    iziram("Personal Informations","this is an example of an answer with a media : Complex media", function() {generateModal(complex)})
    
    
  ];
  generateBox(subject)
  const array = generateComments(crowd)
  generateAllMediaQueries(array, observer)

  const activated = document.getElementsByClassName('is-active');
  for(var i = 0 ; i < activated.length; i++){
    activated[i].classList.remove("is-active")
  }
  const active = document.getElementById(id)
  active.classList.add("is-active")

}



displayComments("Personal Informations", "0")


