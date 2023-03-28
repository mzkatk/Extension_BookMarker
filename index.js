let myLinks = []  //array of links
const inputEl = document.getElementById("input-El")  //grabbig the input field
const saveBtn = document.getElementById("save-btn")
const saveTab = document.getElementById("save-tab")
const deletebtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-El")
const LinksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))  // taking arrays from myLinks and storing it inside local storage

if (LinksFromLocalStorage) {
    myLinks = LinksFromLocalStorage
    render(myLinks)
}

inputEl.addEventListener("click", function () {
    myLinks.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLinks", JSON.stringify(myLinks))
    render(myLinks)
})

saveTab.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentview: true },
        function (tabs) {
            myLinks.push(tabs[0].url)
            localStorage.setItem("myLinks", JSON.stringify(myLinks))
            render(myLinks)
        })
})

function render(Links) {
    let ListItems = ""
    for (let i = 0; i < Links.length; i++) {
        ListItems += `
        <li>
           <a target = '_blank' href = '${Links[i]}>
            ${Links[i]}
           </a>
        </li>`
    }
    ulEl.innerHTML = ListItems
}

deletebtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLinks = []
    render(myLinks)
})
