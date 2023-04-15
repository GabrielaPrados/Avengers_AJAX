/* ----------------------------------------------DOMCONTENTLOADED------------------------------------------------- */
window.addEventListener("DOMContentLoaded", () => {
    loadingPresentation()
})

/* ----------------------------------------------CLICK------------------------------------------------- */

document.addEventListener("click", (e) => {
    const t = e.target
    
    /* event fired by "GO" at presentation html or "CLOSE" at avenger page => getting home*/
    if (t.classList.contains("home") || t.classList.contains("close") ) {
        e.preventDefault()
        getPage("pages/home.html", body, ()=> homePage())
    }
    
    /* event which hide cards at home page and display selected avenger*/
    if (t.classList.contains("cardGo")) {
        hideingCards(t)
    }

})

