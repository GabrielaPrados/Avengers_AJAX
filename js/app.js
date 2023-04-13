/*------------------------------------------------VARIABLES --------------------------------------------- */


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
            document.body.innerHTML = principal.response
        }
    })
}

function getName() {
    const name = ajax("pages/name.html")
    name.addEventListener("load", () => {
        if (name.status === 200) {
            document.body.innerHTML = name.response
            newBody() /* changing classes from body */
            getHome() /* getting home and displayn card avangers */
        }
    })
}


/* getting home and displayn card avangers */
function getHome() {
    const main = document.querySelector("main") /* gettin main element */
    main.classList.add("displayCenter")
    const home = ajax("pages/home.html")
    home.addEventListener("load", () => {
        if (home.status === 200) {
            main.innerHTML = home.response
            avengersDB() /* getting data base from monk api */
        }
    })
}


/* getting data base from monk api */
function avengersDB() {
    const getdb = ajax("https://6435a117537112453fdb89c5.mockapi.io/api/avengers")
    getdb.addEventListener("load", () => {
        let db;
        if (getdb.status === 200) {
            db = JSON.parse(getdb.response)
            creatingCard(db)/* creating card and displaying them */
        } else {
            errorWarning() /* creating a div element to warn in case there is an error about data base response */
        }
    })
}   

/* changing classes from body */
function newBody() {
    document.body.classList.remove("presentationBody")
    document.body.classList.add("homeBody")
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
    const main = document.querySelector("main")
    main.classList.add("displayCenter")
    main.setAttribute("justify-content", "space-around" )
    main.innerHTML += db.map(av => {
        const { name, surname, avenger, principalImg } = av;
        return `
        <article class="principalBack displayCenter">
            <div class="go">
                <img src="imgs/iconoAvengers2.jpg" alt="Icono Avengers" class="principalIcon">
                <span class="cardGo">GO</span>
            </div>
            <h2 class="titles">${avenger}</h2>
            <div class="principalImg displayCenter">
                <img src="${principalImg}" alt="Imágen de ${name} ${surname}">
            </div>
            <p class="principalPharagraph">${name} ${surname}</p>
        </article>
        `
    }).join("")
    console.log(main);
}
