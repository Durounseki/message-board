const express = require("express");
const app = express();
const path = require('node:path');
 
//Import routers
const indexRouter = require("./routes/indexRouter");

//Set the url encoder to handle form post request
app.use(express.urlencoded({extended: true}));

//Set the root directory of the templates in views
app.set("views",path.join(__dirname, "views"));
//Enable EJS as view engine
app.set("view engine", "ejs");

//Set the directory for static assets
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//Github link
const profileLink = {
    href: "https://github.com/Durounseki",
    aria: "GitHub profile of Durounseki",
    faClass: "fa-brands fa-github",
    text: "Durounseki"
}

app.use((req, res, next) => {
    res.locals.profileLink = profileLink; // Make it available in all templates
    next();
});

//Render the views
app.use("/",indexRouter);

app.use((err, req, res, next) => {
    console.error(err.stack); // Log the detailed error stack trace
    res.status(500).send('Internal Server Error');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Mini message app - listening on port ${PORT}!`));