const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("getYear",() => {
  return `${new Date().getFullYear()} - ${ new Date().getFullYear() +1} `;
});

hbs.registerHelper("memeReview",(text) => {
  return text.toUpperCase();
});

hbs.registerHelper("currentTime",() => {
  return new Date()
});
// app.use((request,response,next) => {
//   response.render("maintain.hbs");
// });
app.set("view engine","hbs");
app.use(express.static(__dirname + "/public"));
app.use((request,response,next) => {
    fs.appendFile("serverLog.log",`${request.path} ${request.orginalUrl} ${request.method} \n`,(error) => {
      if(error){
        console.log(error);
      }
    });
  next();
})

app.get("/",(request,response) =>{
  response.render("home.hbs",{pageTitle: "Home",message: "felix the human and edgar the dog"})
});

app.get("/help",(request,response) =>{
    response.render("help.hbs",{pageTitle: "Help"});
});

app.get("/error",(request,response) =>{
  response.send({error:"Unable to send a response!!"});
});

app.listen(port,()=>{
  console.log(`Server is on port ${port}`);
});
