/*------------------------------------------------VARIABLES --------------------------------------------- */
const body = document.body
let main = document.querySelector("main")
let db;
/*------------------------------------------------FUCNTION AJAX --------------------------------------------- */


function ajax(url, method = "GET") {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.send()

    return xhr
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */


/* Loadin presentation html */
function loadingPresentation() {
    const principal = ajax("pages/presentation.html")
    principal.addEventListener("load", () => {
        if (principal.status === 200) {
            body.innerHTML = principal.response
            body.classList.add("presentationBody", "positionRelative" )
        }
    })
}

/* getting header avengers */
function getName() {
    const header = document.querySelector("header")
    const name = ajax("pages/name.html")
    name.addEventListener("load", () => {
        if (name.status === 200) {
            header.innerHTML = name.response
        }
    })
}


/* getting home and displayn card avangers */
function getPage(url, node, cb1) {
    const page = ajax(url) 
    page.addEventListener("load", () => {
        if (page.status === 200) {
            node.innerHTML = page.response
            main = document.querySelector("main")
                if (typeof cb1 === "function") cb1()
        }
    })
}

function homePage() {
    newBody()/* changing body classes */
    getName() /* getting header avengers */
    avengersDB() /* getting data base from monk api and displaying cards*/
}


/* getting data base from monk api */
function avengersDB() {
    const getdb = ajax("https://6435a117537112453fdb89c5.mockapi.io/api/avengers")
    getdb.addEventListener("load", () => {
        if (getdb.status === 200) {
            db = JSON.parse(getdb.response)
            creatingCard(db)/* creating card and displaying them */
        } else {
            errorWarning() /* creating a div element to warn in case there is an error about data base response */
        }
    })
}   

/* changing body classes*/
function newBody() {
    body.classList.remove("presentationBody")
    body.classList.add("homeBody")
}


/* creating a div element to warn in case there is an error about data base response */
function errorWarning() {
    const main = document.querySelector("main")
    main.classList.add("displayCenter")
    const div = document.createElement("div")
    div.classList.add("ajaxWarning", "displayCenter")
    div.innerHTML = "Hemos tenido un error inesperado. Por favor, vuelva a intentar ingresar a la brevedad"
    main.appendChild(div)
    setTimeout(() => {
        loadingPresentation() /* after 6 seconds reload (Ajax) presentation */
    }, 6000);
}

/* creating card and displaying them */
function creatingCard(db) {
    const main = document.querySelector("main") /* gettin main element */
    main.setAttribute("justify-content", "space-around" )
    main.innerHTML += db.map(av => {
        const {id, name, surname, avenger, principalImg } = av;
        return `
        <article class="principalBack displayCenter">
            <div class="go">
                <img src="imgs/iconoAvengers2.jpg" alt="Icono Avengers" class="principalIcon">
                <span id="${id}" class="cardGo" }>GO</span>
            </div>
            <h2 class="titles">${avenger}</h2>
            <div class="principalImg displayCenter">
                <img src="${principalImg}" alt="Imágen de ${name} ${surname}">
            </div>
            <p class="principalPharagraph">${name} ${surname}</p>
        </article>
        `
    }).join("")
}

/* adding opsity to cards and getting avenger html */
function hideingCards(t) {
    const id = t.id
    const cards = document.querySelectorAll("article")
    cards.forEach(card => card.classList.add("cardsOpacity"))
    setTimeout(() => {
        getPage("pages/avenger.html", main, ()=> avengerPage(id) )
    }, 3000);
}    

/* creating article to display avenger */
function avengerPage(id) {
    const showAvenger = db.find(av => av.id == id)
    const {name, surname, avenger, prensentationImg, description, web } = showAvenger;
    const section = document.querySelector(".mainAvenger")
    section.innerHTML = `
        <article class="articleAvenger displayCenter">
            <img class="avengerImg" src="${prensentationImg}" alt="fotografía de ${avenger}">
            <h2 class="avengerH2">${avenger}</h2>
            <div>
                <img class="avengerIcon" src="imgs/iconoAvengers2.jpg" alt="Icono Avengers" class="principalIcon">
                <a class="web" href="${web}" target="_blank" class="web">WEB</a>
            </div>
            <div>
                <p class="avengerP avengerName">${name} ${surname}</p>
                <p class="avengerP">${description}</p>
            </div>
            <span class="close">CLOSE</span>
        </article>
    `
    section.classList.add("heightAvenger")
}