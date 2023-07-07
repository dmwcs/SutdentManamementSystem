const StudentModel = require('../models/Student.js');
const CourseModel = require('../models/Course.js');



const getAllStudents = async(req,res) => {
    const students = await StudentModel.find().populate('courses').exec();
    //返回数组
    res.json(students);
};
const getStudentById  = async(req,res) => {
    //先拿到id
    const {id} = req.params;
    //调用findById方法
    const student = await StudentModel.findById(id).populate('courses').exec();
    //判断student是否存在,如果不存在，返回404
    if(!student) {
        res.status(404).json({error:'Student not found.'});
        return;
    }
    //如果存在，返回student //返回的是object 不是数组
    res.json(student);
};
const updateStudentById = async(req,res) => {
    //取id
    const {id} = req.params;
    //取参数从body里
    const {firstName, lastName, email} = req.body;
    //用findByIdAndUpdate更新
    const student = await StudentModel.findByIdAndUpdate(
        id,
        {firstName, lastName, email},
        {new: true}
    ).exec();
    //判断是否存在
    if(!student) {
        res.status(404).json({error:'Student not found.'});
        return;
    }
    //存在返回json
    res.json(student);
};
const deleteStudentById = async(req,res) => {
    const {id} = req.params;
    const student = await StudentModel.findByIdAndDelete(id).exec();
    if (!student) {
        res.status(404).json({error: 'Student not found.'});
        return;
    }
    await CourseModel.updateMany(
        {students: student._id},
        {
            $pull: {
                students: student._id,
            },
        }
    ).exec();
    res.sendStatus(204);
};
const createStudent = async(req,res) => {
    const {firstName, lastName, email} = req.body;
    const student = new StudentModel({firstName, lastName, email});
    await student.save();

    res.status(201).json(student);
};

//v1/students/:studentId/courses/:courseId
const addStudentToCourse = async(req,res) => {
    const {studentId, courseId} = req.params;
    //找学生id
    const student = await StudentModel.findById(studentId).exec();
    //找课程id
    const course = await CourseModel.findById(courseId).exec();
    //确保学生和课程都存在
    if(!student|| !course) {
        res.status(404).json({err:"course id or student id are not found."});
        return;
    }
    //加课程
    student.courses.addToSet(courseId);
    //加学生
    course.students.addToSet(studentId);
    //保存
    await student.save();
    await course.save();
    res.status(201).json(student);
};

//v1/students/:studentId/courses/:courseId
const removeStudentFromCourse = async(req,res) => {
    const {studentId, courseId} = req.params;
    //找学生id
    const student = await StudentModel.findById(studentId).exec();
    //找课程id
    const course = await CourseModel.findById(courseId).exec();
    if(!student || !course) {
        res.status(404).json({err:"course id or student id are not found."});
        return;
    }
    //加课程
    student.courses.pull(courseId);
    //加学生
    course.students.pull(studentId);
    await student.save();
    await course.save();
    res.status(204).json(student);
};

module.exports = {
    getAllStudents,
    getStudentById,
    updateStudentById,
    deleteStudentById,
    createStudent,
    addStudentToCourse,
    removeStudentFromCourse
}