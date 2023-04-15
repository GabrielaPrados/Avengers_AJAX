/* ----------------------------------------------DOMCONTENTLOADED------------------------------------------------- */
window.addEventListener("DOMContentLoaded", () => {
    loadingPresentation()
})

/* ----------------------------------------------CLICK------------------------------------------------- */

document.addEventListener("click", (e) => {
    const t = e.target
    
    /* event fired by "GO" at presentation html */
    if (t.classList.contains("home")) {
        e.preventDefault()
        getPage("pages/home.html", body,  "home", ()=> homePage())
    }

    if (t.classList.contains("cardGo")) {
        hidingCards(t)
    }
})