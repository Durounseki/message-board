const { Router } =  require("express");
//Date formatting
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

function formattedDate(date){
    if( dayjs(date).isBefore(dayjs().subtract(1,'day')) ){
        return dayjs(date).format('YY/MM/DD');
    }else{
        return dayjs(date).fromNow(true) + ' ago';
    }
}

const indexRouter = Router();

indexRouter.use( (req,res,next) => {
    res.locals.formattedDate = formattedDate;
    next();
})

const messages = [
    {
      text: "Hi there! Feel free to share your thoughts.",
      user: "Durounseki",
      added: new Date()
    },
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