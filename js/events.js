/* ----------------------------------------------DOMCONTENTLOADED------------------------------------------------- */
window.addEventListener("DOMContentLoaded", () => {
    loadingPresentation()
})

/* ----------------------------------------------CLICK------------------------------------------------- */

document.addEventListener("click", (e) => {
    const t = e.target

    if (t.classList.contains("home")) {
        e.preventDefault()
        getName()
    }
})