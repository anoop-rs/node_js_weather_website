const path = require('path');
const express = require("express")
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geoCode = require('./utils/geocode');

const app = express()
const port = process.env.PORT || 3000

//Path configurations
const publicDirPath = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//hbs engine and views location configuration
app.set("view engine", "hbs")
app.set("views", viewPath)
hbs.registerPartials(partialsPath)

//Static directories 
app.use(express.static(publicDirPath))

//routes
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Nainitha"
    })
})
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        helpText: "This page is here to help you in difficult situations",
        name: "Nainitha"
    })
})
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Nainitha"
    })
})
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            errorMsg: "You must provide an address"
        })
    }
    geoCode(req.query.address, (error, {
        lat,
        long,
        place
    } = {}) => {
        if (error) {
            return res.send({
                errorMsg: error
            })
        }
        forecast(lat, long, place, (error, {
            summary,
            temp,
            prob,
        } = {}) => {
            if (error) {
                res.send({
                    errorMsg: error
                })
            }
            res.send({
                summary,
                temp,
                prob,
                place
            })
        })
    })
})
app.get("/help/*", (req, res) => {
    res.render("error-page", {
        errorMsg: "Help article not found",
        name: "Nainitha",
        title: "404"
    })
})
app.get("*", (req, res) => {
    res.render("error-page", {
        errorMsg: "Page not found",
        name: "Nainitha",
        title: "404"
    })
})

//start the server
app.listen(port, () => {
    console.log("Server is up");
})