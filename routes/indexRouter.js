const { Router } =  require("express");

const indexRouter = Router();

const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];

indexRouter.get("/", ( req, res ) => {
    res.render("index", {title: "Mini message app", messages: messages});
});

indexRouter.post("/new", (req, res) =>{
    const formBody =  req.body;
    messages.push({text: formBody.message, user: formBody.username, added: new Date()});
    res.redirect("/");
});

module.exports = indexRouter;