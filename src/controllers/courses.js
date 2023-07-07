const CourseModel = require('../models/Course');
const Joi = require('joi');//commonjs 导入方式
const createCourseSchema = require('../validations/course');
const StudentModel = require('../models/Student');
const getAllCourses = async(req,res) => {
    const courses = await CourseModel.find().exec();
    //返回数组
    res.json(courses);
};
const getCourseById  = async(req,res) => {
    //先拿到id
    const {id} = req.params;
    //调用findById方法
    const course = await CourseModel.findById(id).exec();
    //判断Course是否存在,如果不存在，返回404
    if(!course) {
        res.status(404).json({error:'Course not found.'});
        return;
    }
    //如果存在，返回Course //返回的是object 不是数组
    res.json(course);
};
const updateCourseById = async(req,res) => {
    //取id
    const {id} = req.params;
    //取参数从body里
    const {name, description} = req.body;
    //用findByIdAndUpdate更新
    const course = await CourseModel.findByIdAndUpdate(
        id,
        {name, description},
        {new: true}
    ).exec();
    //判断是否存在
    if(!course) {
        res.status(404).json({error:'Course not found.'});
        return;
    }
    //存在返回json
    res.json(course);
};
const deleteCourseById = async(req,res) => {
    const {id} = req.params;
    const course = await CourseModel.findByIdAndDelete(id).exec();
    if (!course) {
        res.status(404).json({error: 'Course not found.'});
        return;
    }
    await StudentModel.updateMany(
        {courses: course._id},
        {
            $pull: {
            courses: course._id,
            },
        }
    ).exec();
    res.status(204).end();
};
const createCourse = async(req,res) => {
    const {name, description, code} = req.body;

    const validBody = await createCourseSchema.validateAsync(req.body, {
        allowUnknown: true,
        stripUnknown: true
    });

    const course = new CourseModel(validBody);
    await course.save();

    res.status(201).json(course);
};

module.exports = {
    getAllCourses,
    getCourseById,
    updateCourseById,
    deleteCourseById,
    createCourse
}