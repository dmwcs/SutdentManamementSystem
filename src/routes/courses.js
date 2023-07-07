const {Router} = require('express');
const {getAllCourses,createCourse,getCourseById,updateCourseById,deleteCourseById} = require("../controllers/courses");

courseRouter = Router();


courseRouter.get('/', getAllCourses);
courseRouter.post('/', createCourse);
courseRouter.get('/:id', getCourseById);
courseRouter.put('/:id', updateCourseById);
courseRouter.delete('/:id', deleteCourseById);


module.exports = courseRouter;
