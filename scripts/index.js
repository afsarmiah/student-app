import { SchoolAdmin } from './classes/student-app.js';
import {
  serialize,
  resetAllFormFields,
  populate,
  validate,
} from './classes/utils.js';
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

const addForm = document.forms['add-student'];
const updateForm = document.forms['update-student'];

if (addForm) {
  addForm.addEventListener('reset', (e) => {
    resetAllFormFields(e.target);
  });

  addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = addForm;

    const data = serialize(form);

    if (!('enrolled' in data)) {
      data.enrolled = false;
    } else if (data.enrolled === 'on') {
      data.enrolled = true;
    }

    benJonsonPrimarySchool.createAppStudent(data);

    resetAllFormFields(form);
  });

  const submitButton = addForm.querySelector('[type = "submit"]');

  submitButton.setAttribute('disabled', 'disabled');

  function controlSubmitButton(e) {
    if (addForm.matches(':valid')) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disbaled', 'disabled');
    }
  }

  addForm.addEventListener('input', controlSubmitButton);

  addForm.addEventListener('change', controlSubmitButton);

  const nameField = addForm['name'];
  const ageField = addForm['age'];
  const genderField = addForm['gender'];
  const yearField = addForm['year'];
  const courseField = addForm['course'];

  nameField.addEventListener('input', (e) => {
    validate(nameField);
  });
  nameField.addEventListener('change', (e) => {
    validate(nameField);
  });

  ageField.addEventListener('input', (e) => {
    validate(ageField);
  });
  ageField.addEventListener('change', (e) => {
    validate(ageField);
  });

  genderField.addEventListener('input', (e) => {
    validate(genderField);
  });
  genderField.addEventListener('change', (e) => {
    validate(genderField);
  });

  yearField.addEventListener('input', (e) => {
    validate(yearField);
  });
  yearField.addEventListener('change', (e) => {
    validate(yearField);
  });

  courseField.addEventListener('input', (e) => {
    validate(courseField);
  });
  courseField.addEventListener('change', (e) => {
    validate(courseField);
  });
}

benJonsonPrimarySchool.render();
