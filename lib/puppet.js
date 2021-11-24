function generateReporters(questions){
    const playground = document.getElementById("playground")

    questions.forEach(q => {
        const popover = document.createElement("div")
            popover.className = "popover popover-bottom mg-2 translation"
            const img = document.createElement("img")
                img.src = "images/svg/man.svg"
                img.width = 100
                img.height = 200
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


generateReporters([
    "a","b","c"
])