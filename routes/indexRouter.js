//Database
const db = require('../db/queries');

const { Router } =  require("express");
//Date formatting
const dayjs = require("dayjs");
//Account for timezone
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

function formattedDate(date,userTimezone){
    //Ensure date is a ISO string, then convert to a Date object
    const dateObject = new Date(date);
    //Current time in user's timezone
    const nowInUserTimezone = dayjs().tz(userTimezone);
    if( dayjs(dateObject).isBefore(nowInUserTimezone.subtract(1,'day')) ){
        return dayjs(dateObject).tz(userTimezone).format('YY/MM/DD');//Format in user's timezone
    }else{
        return dayjs(dateObject).fromNow(true) + ' ago';//Relative time is in user's timezone
    }
}

const indexRouter = Router();

indexRouter.use( (req,res,next) => {
    res.locals.formattedDate = formattedDate;
    //Get the user's timezone
    res.locals.userTimezone = req.headers['x-timezone'] || 'Asia/Tokyo';
    next();
})

//Render the view
indexRouter.get("/", async ( req, res ) => {
    
    //Fetch messages from database
    const messages = await db.getAllMessages();

    res.render("index", {title: "Mini message app", messages: messages});
});

//Handle the submitted message
indexRouter.post("/new", async (req, res) =>{
    const formBody =  req.body;
    await db.insertMessage(formBody.username, formBody.message);
    //Refresh the page
    res.redirect("/");
});

module.exports = indexRouter;