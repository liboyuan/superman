var student=require('./student.js');
var teacher=require('./teacher.js');

function add (teacherName,students){
  teacher.Tadd(teacherName);
  students.forEach(function(item,index){
    student.add(item)

  });
}

exports.add = add;
