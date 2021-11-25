function randomNumber(min, max) { 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomSprite(){
    return "images/svg/man ("+randomNumber(1,14)+").svg"
}
function updateAnswer(a){
    const answer = document.getElementById("answer")
        answer.innerHTML = ""
        const txt = document.createElement('p')
            txt.id = "answersTxt"
            txt.className="fadeIn"
            if (typeof(a) === typeof("")){
                txt.innerHTML = a
            }else{
                txt.appendChild(a)
            }
        answer.appendChild(txt)
}

function devilish(element){
    const img = element.firstChild
        img.classList.remove("walk")
        img.classList.add("animate__animated","animate__headShake","animate__faster")
    setTimeout(function(){
        img.classList.remove("animate__animated","animate__headShake","animate__faster")
        img.src = "images/svg/devil.svg"
        const bubble = element.getElementsByClassName("bubble")[0]
            bubble.classList.add("devil")
    },500)
}

function plotReporter(q, rsprite, a){
    const playground = document.getElementById("playground")
    const popover = document.createElement("div")
        popover.className = "popover popover-top text-center"
        const img = document.createElement("img")
            img.src = rsprite
            img.className = "sprite walk"
            img.addEventListener("mouseover", function(){updateAnswer(a)})
            img.addEventListener("click", function(){devilish(popover)})
        const container = document.createElement("div")
            container.className = "popover-container"
            const card = document.createElement("div")
                card.className="bubble"
                const body = document.createElement('div')
                    body.className ="textSize-3"
                    body.innerText = q
                card.appendChild(body)
            container.appendChild(card)
        popover.appendChild(img)
        popover.appendChild(container)
    
    if(playground.childElementCount > 0){
        playground.insertBefore(popover, playground.childNodes[0])
    }else{
        playground.appendChild(popover)
    }
    
}
function clearAllTimeouts(){
    var id = window.setTimeout(function() {}, 0);
    while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
}

function getOut(){
    const sprites = document.getElementsByClassName("popover popover-top text-center")
    for(let i = sprites.length-1; i >= 0; i--){
        const s = sprites[i]
            
            const img = s.firstChild
            console.log(img.src)
                if(img.src.indexOf("images/svg/devil.svg") != -1){
                    img.src = "images/svg/flame.svg"
                    s.classList.add("animate__flip","animate__animated","animate__faster")
                }else{
                    img.src = "images/svg/cloud.svg"
                    s.classList.add("animate__rotateOut","animate__animated","animate__faster")
                }
            setTimeout(function(){
                s.remove()
            }, 500)
    }
}



function enter(questions, answers){
    let sprites = []
    for(let i = questions.length-1; i >= 0; i--){
        const q = questions[i]
        let rsprite = getRandomSprite()
        while (sprites.indexOf(rsprite) != -1){
            rsprite = getRandomSprite()
        }
        sprites.push(rsprite)
        setTimeout(function(){plotReporter(q, rsprite, answers[i])},(i)*500)
    }
}

function generateQA(questions, answers){
    clearAllTimeouts()
    if (document.getElementById("playground").childNodes.length === 0){
        enter(questions,answers) 
    }else{
        setTimeout(function(){getOut()},900)
        setTimeout(function(){enter(questions, answers)}, 1600)
    }
}


function nextTopic(topicId = 0){
    const qa = getQuestionsAndAnswers(topicId)
    generateQA(qa[0], qa[1])
    clearAnswer()
}



function setLiEvents(){
    const lis = document.getElementsByTagName('li')
    for (let i = 0 ; i< lis.length; i++){
        const li = lis[i]
        li.addEventListener("click", function() {
            nextTopic(i)
            const alien = document.getElementById("alien")
            alien.classList.remove("hid")
            alien.classList.add("animate__backInDown")
            setTimeout(function(){
                alien.classList.add("animate__fadeOut","animate__faster")
                setTimeout(function(){
                    alien.classList.remove("animate__fadeOut","animate__faster")
                    alien.classList.add("hid")
                },500)
                alien.classList.remove("animate__backInDown")
            }, 1200)
        });
    }

    getStartElements().forEach((s)=>{
        s.addEventListener("click", function(){start()})
    })
}

function getStartElements(){
    return [document.getElementsByClassName("start-left")[0], document.getElementsByClassName("start-right")[0], document.getElementsByClassName("start-text")[0]]
}

function start(){
    const starts = getStartElements()
    starts[0].classList.add("animate__slideOutLeft","animate__animated","animate__fast")
    starts[1].classList.add("animate__slideOutRight","animate__animated","animate__fast")
    starts[2].remove()
    setTimeout(()=>{
        starts[0].remove()
        starts[1].remove()
    nextTopic()
    }, 900)
}

function getQuestionsAndAnswers(topicId){
    let questions = [];
    let answers = [];
    switch(topicId){
        case 0:
            questions =[
                "What is your name ?",
                "Where are you from ?",
                "Where do you live ?",
                "Do you have any brother or sisters ?",
                "How old are you ?",
                "Do you have any pets ?"
            ]
            answers = [
                "My name is Matthias HARTMANN.",
                "I was born in France, in a town named Brest, near the atlantic ocean in Brittanny",
                "I lived my past years in a little town next to Brest, however, because of my studies I now live in Lannion.",
                "I do have 2 older brothers, respectively named Dorian (the oldest, he's 22) and Cyril (he's 20)",
                "It might surprise you but my brothers and I share were born following a arithmetical sequence with a commmon difference of 2. It is a scientific way to say that I'm 18",
                elementGenerator("Yeah, I have a cat named pixel, I love her, and on her side, she loves when I feed her. So mutual love I guess.",modalButtonGenerator(function() {generateModalImg("images/pixel.jpg", "Cute picture of Pixel")}, "Here is a nice picture")),
            ]
            break;
        case 1:
            questions = [
                "test",
                "test2"
            ]
            answers = [
                "test",
                "test2"
            ]
            break;
        case 2:
            questions = [
                "Are you able to work with people or do you prefer to do everything by yourself ?",
                "Can you describe what computer science's skills you have ?",
                "What projects have you done recently ?",
            ]
            answers = [
                "I tend to do everything by myself when the people that are working with me aren't doing what they have to fast enough. However I'll still try to help them to learn faster ways to do their work so next time I don't have to do everything.",
                "Because i'm fond of IT, I always want to learn new things and skills related to projects I make. For example, I recently learnt how to use the VSCode Extension API written in Typescript to create my own extension to generate Doxygen Docstring (description of functions and variables in a program) in python file. Last year I wanted to mod Minecraft, a game made in Java so I spend most of my free time studying and learning Java.",
                "As stated in the previous Question's anwser, I made a VSCode extension, I also created multiple plugins (modifications of the server side) for Minecraft, all written in Java, I did some web developping such as this website. In general you can see what projects I have done on <a href='https://github.com/Iziram' target='_blank'>my github</a>"
            ]
            break;
        case 3:
            break;
    }
    return [questions, answers]
}

function elementGenerator(txt, button){
    const div = document.createElement('div')
        div.innerText = txt
        div.appendChild(document.createElement('br'))
        div.appendChild(button)
    return div
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
  
    
    document.getElementById("playground").appendChild(modal)
}

function generateModalImg(image, title){
    var img = document.createElement("img")
        img.className = "img-responsive img-fit-cover text-center"
        img.src =image

    generateModal(img, title)
}

function closeModal(){
    var classes = document.getElementsByClassName("modal active modal-lg")
    classes[classes.length-1].remove()
}

function modalButtonGenerator(func, text ="Click to open the media"){
    const button = document.createElement('button')
        button.classList.add("btn","s-rounded","my-2","max")
        button.onclick = func
        button.innerText = text
            
    return button
}

function clearAnswer(){
    const answer = document.getElementById("answer")
    answer.innerHTML = ""
}

setLiEvents()