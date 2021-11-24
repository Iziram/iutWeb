function randomNumber(min, max) { 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomSprite(){
    return "images/svg/man ("+randomNumber(1,9)+").svg"
}
function generateQA(questions, answers){
    const playground = document.getElementById("playground")
    playground.innerHTML = ""
    questions.forEach(q => {
        const popover = document.createElement("div")
            popover.className = "popover popover-bottom mg-2"
            const img = document.createElement("img")
                img.src = getRandomSprite()
                img.className = "sprite fadeIn"
            const container = document.createElement("div")
                container.className = "popover-container"
                const card = document.createElement("div")
                    card.className="card"
                    const body = document.createElement('div')
                        body.className ="card-body"
                        body.innerText = q
                    card.appendChild(body)
                container.appendChild(card)
            popover.appendChild(img)
            popover.appendChild(container)
        playground.appendChild(popover)
    });
}


function nextTopic(topicId = 0){
    const qa = getQuestionsAndAnswers(topicId)
    generateQA(qa[0], qa[1])
}

function setLiEvents(){
    const lis = document.getElementsByTagName('li')
    for (let i = 0 ; i< lis.length; i++){
        const li = lis[i]
        li.addEventListener("click", function() {nextTopic(i)});
    }
}

function getQuestionsAndAnswers(topicId){
    let questions = [];
    let answers = [];
    switch(topicId){
        case 0:
            break;
        case 1:
            break;
        default:
            questions = [
                "Are you able to work with people or do you prefer to do everything by yourself ?",
                "Can you describe what computer science's skills you have ?",
                "What projects have you done recently ?",
                "Are you able to work with people or do you prefer to do everything by yourself ?",
                "Can you describe what computer science's skills you have ?",
                "What projects have you done recently ?"
            ]
            answers = [
                "I tend to do everything by myself when the people that are working with me aren't doing what they have to fast enough. However I'll still try to help them to learn faster ways to do their work so next time I don't have to do everything. ",
                "Because i'm fond of IT, I always want to learn new things and skills related to projects I make. For example, I recently learnt how to use the VSCode Extension API written in Typescript to create my own extension to generate Doxygen Docstring (description of functions and variables in a program) in python file. Last year I wanted to mod Minecraft, a game made in Java so I spend most of my free time studying and learning Java.",
                "As stated in the previous Question's anwser, I made a VSCode extension, I also created multiple plugins (modifications of the server side) for Minecraft, all written in Java, I did some web developping such as this website. In general you can see what projects I have done on my github : https://github.com/Iziram",
                "I tend to do everything by myself when the people that are working with me aren't doing what they have to fast enough. However I'll still try to help them to learn faster ways to do their work so next time I don't have to do everything. ",
                "Because i'm fond of IT, I always want to learn new things and skills related to projects I make. For example, I recently learnt how to use the VSCode Extension API written in Typescript to create my own extension to generate Doxygen Docstring (description of functions and variables in a program) in python file. Last year I wanted to mod Minecraft, a game made in Java so I spend most of my free time studying and learning Java.",
                "As stated in the previous Question's anwser, I made a VSCode extension, I also created multiple plugins (modifications of the server side) for Minecraft, all written in Java, I did some web developping such as this website. In general you can see what projects I have done on my github : https://github.com/Iziram"
            ]
            break;
        case 3:
            break;
    }
    return [questions, answers]
}

setLiEvents()
nextTopic()