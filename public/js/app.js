const weatherForm = document.querySelector("form")
const searchTerm = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    messageOne.textContent = "Loading..."
    const location = searchTerm.value
    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            messageOne.textContent = ""
            if (data.errorMsg) {
                messageOne.textContent = JSON.stringify(data.errorMsg)
            } else {
                messageOne.textContent = "Summary : " + data.summary + "\nTemperature : " + data.temp + "\nProbablity : " + data.prob + "\nPlace : " + data.place + "\nVisibility : " + data.visibility
            }

        })
    })
})