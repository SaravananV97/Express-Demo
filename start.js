const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());
let courses = [{id: 1 ,course: "Python"},{id: 2, course: "Java"},
                {id: 3, course: "Deep Learning"}];
app.get("/",(request,response) => {
  response.send("Hello World\n");
});
app.get("/courses",(request,response) => {
  response.send(courses);
});
port = process.env.PORT || 3000;
app.get("/courses/:uid",(request,response) =>{
  const course = courses.find((c) => { return c.id === parseInt(request.params.uid)});
  if(!course) response.status(404).send("Course not found!");
  response.send(course);
});
app.post("/courses",(request,response) => {
  const newCourse = request.body;
  const {error} = Validator(newCourse);
  if(error){
    response.status(400).send(error.details[0].message);
  }
  else{
      courses.push({id:courses.length+1,course:newCourse});
      response.send(courses);
  }
});
app.put("/courses/:uid",(request,response) => {
  const updateCourse = courses.find((c) => { return c.id === parseInt(request.params.uid)});
  if(!updateCourse) response.status(404).send("Course not found!");
  else{
    const {error} = Validator(request.body);
    if(error){
      response.status(400).send(error.details[0].message);
      console.log(error);
    }
    else{
      updateCourse.course = request.body.course;
      response.send(courses);
      console.log(updateCourse);
    }
  }
});
app.delete("/courses/:uid",(request,response) =>{
  const course = courses.find((c) => { return c.id === parseInt(request.params.uid)});
  if(!course){
    response.status(404).send("Course not Found!");
  }
  else{
    courses = courses.filter((course) =>{return course.id != parseInt(request.params.uid)})
    console.log(courses);
    response.send(courses);
  }
});
app.listen(port,() => {
  console.log(`Listening at Port ${port}...`);
});
function Validator(course){
  const schema = {
    course: Joi.string().min(4).required()
  };
  return Joi.validate(course,schema);
}
