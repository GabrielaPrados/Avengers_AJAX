function ajax(url, method = "GET") {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.send()

    return xhr
}





/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

/*------------------------------------------------PRESENTATION PAGE --------------------------------------------- */

function loadingPresentation() {
    const principal = ajax("pages/presentation.html")

    principal.addEventListener("load", () => {
        if (principal.status === 200) {
            const main = document.querySelector("main")
            main.innerHTML = principal.response
        }
    })
}
