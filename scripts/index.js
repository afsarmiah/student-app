import { SchoolAdmin } from './classes/student-app.js';
// import Student from './classes/student.js';

const benJonsonPrimarySchool = new SchoolAdmin({ headteacher: 'Afsar' });
console.log(benJonsonPrimarySchool);

// const student1 = benJonsonPrimarySchool.createAppStudent({
//   name: 'Afsar',
//   age: 25,
//   gender: 'Male',
//   year: 'Year 9',
//   course: 'Math',
// });

// const student2 = benJonsonPrimarySchool.createAppStudent({
//   name: 'Lily',
//   age: 26,
//   gender: 'Female',
//   year: 'Year 10',
//   course: 'English',
// });

// benJonsonPrimarySchool.render({
//   fn: function ({ headteacher, students }) {
//     console.log(headteacher);
//     console.table(students);
//   },
// });

// benJonsonPrimarySchool.render();

// benJonsonPrimarySchool.updateAppStudent(student1, { course: 'Biology' });

// benJonsonPrimarySchool.render();

// benJonsonPrimarySchool.removeAppStudent(student2);

// benJonsonPrimarySchool.markAsEnrolled(student1);

// benJonsonPrimarySchool.render();

// benJonsonPrimarySchool.markAsNotEnrolled(student1);

// benJonsonPrimarySchool.render();

// benJonsonPrimarySchool.getAllStudents();

// benJonsonPrimarySchool.getStudentById(student1);
