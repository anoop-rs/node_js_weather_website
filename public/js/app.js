console.log("page js loaded")

const weatherForm = document.querySelector("form")
const searchTerm = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    messageOne.textContent = "Loading..."
    const location = searchTerm.value
    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            messageOne.textContent = ""
            if (data.errorMsg) {
                console.log(data.errorMsg);
                messageOne.textContent = JSON.stringify(data.errorMsg)
            } else {
                console.log(data);
                messageOne.textContent = "Summary : " + data.summary + "\nTemperature : " + data.temp + "\nProbablity : " + data.prob + "\nPlace : " + data.place
            }

        })
    })
})