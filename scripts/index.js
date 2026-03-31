import { SchoolAdmin } from './classes/student-app.js';
import {
  serialize,
  resetAllFormFields,
  populate,
  validate,
} from './classes/utils.js';
// import Student from './classes/student.js';

const benJonsonPrimarySchool = new SchoolAdmin({ headteacher: 'Afsar' });

const tbody = document.querySelector('.student-table__body');
const addForm = document.forms['add-student'];
const updateForm = document.forms['update-student'];

// const renderOptions = {
//   fn: function ({ students }) {
//     return renderStudents({ students });
//   },
// };

if (tbody) {
  // Initial render
  benJonsonPrimarySchool.render({
    fn: function (students) {
      return renderStudents(students);
    },
  });

  // Event delegation for Delete and Enrol buttons
  tbody.addEventListener('click', (e) => {
    const clicked = e.target;

    if (
      !clicked?.matches?.(
        '.student-table__delete-button, .student-table__enrol-button',
      )
    )
      return;

    const { id } = clicked.dataset;
    console.log('id from dataset', id);
    const row = clicked.closest('tr');
    console.log(row);

    if (clicked.matches('.student-table__delete-button')) {
      benJonsonPrimarySchool.removeAppStudent(id);
      row.remove();

      // Show "no students" message if table is now empty
      if (!tbody.children.length) {
        renderStudents({ students: [] });
      }

      // Rebuild just this row with fresh data
      // const updatedStudent = benJonsonPrimarySchool.getStudentById(id);
      // const newRow = createStudentRow(updatedStudent);
      // row.replaceWith(newRow);
    }
  });
}

if (addForm) {
  addForm.addEventListener('reset', (e) => {
    resetAllFormFields(e.target);
  });

  addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = addForm;

    const data = serialize(form);

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

if (updateForm) {
  updateForm.addEventListener('reset', (e) => {
    resetAllFormFields(updateForm);
  });

  updateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const studentData = serialize(updateForm);
    console.log('studentData', studentData);

    const { studentid, ...data } = studentData;
    console.log('studentid', studentid);
    console.log('pre data', data);

    console.log('post data', data);
    benJonsonPrimarySchool.updateAppStudent(studentid, data);
  });

  const submitButton = document.querySelector('[type= "submit"]');
  submitButton.setAttribute('disabled', 'disabled');

  const controlSubmitButton = (e) => {
    console.log('form input');
    if (updateForm.matches(':valid')) {
      console.log('valid');
      submitButton.removeAttribute('disabled');
    } else {
      console.log('invalid');
      submitButton.setAttribute('disabled', 'disabled');
    }
  };

  updateForm.addEventListener('input', controlSubmitButton);
  updateForm.addEventListener('change', controlSubmitButton);

  const nameField = updateForm['name'];
  const ageField = updateForm['age'];
  const genderField = updateForm['gender'];
  const yearField = updateForm['year'];
  const courseField = updateForm['course'];

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

  const url = new URL(location);
  console.log(url);
  const params = new URLSearchParams(url.search);
  console.log('params', params);
  const id = params.get('id');
  console.log('id', id);

  if (!id) {
    console.log(`the id does not exist`);
  } else {
    const student = benJonsonPrimarySchool.getStudentById(id);
    console.log('student', student);
    if (!student) {
      console.log(`Error: student with ${id} not found`);
    } else {
      const data = {
        ...student,
      };
      console.log('data', data);
      populate(updateForm, data);
    }
  }
}

function createStudentRow(student) {
  console.log('createstudent', student);
  const { name, age, gender, year, course, studentid } = student;
  console.log(name);
  console.log(age);
  console.log(gender);
  console.log(year);
  console.log(course);
  console.log(studentid);

  const tr = document.createElement('tr');
  tr.classList.add('student-table__body-row');

  const fields = [name, age, gender, year, course];
  console.log('field', fields);

  fields.forEach((field, index) => {
    const td = document.createElement('td');

    if (index === 0) {
      td.classList.add('student-table__name');
    } else {
      td.classList.add('student-table-info');
    }

    td.textContent = field;
    tr.append(td);
  });

  // const statusTd = document.createElement('td');
  // statusTd.textContent = enrolled ? 'Enrolled' : 'Pending';
  // statusTd.classList.add(
  //   enrolled ? 'student-table-enrolled' : 'student-table-pending',
  // );
  // tr.append(statusTd);

  const actionsTd = document.createElement('td');

  const updatelink = document.createElement('a');
  updatelink.href = `/update.html?id=${studentid}`;
  updatelink.classList.add('student-table__update-button', 'button');
  updatelink.textContent = 'Update';

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('student-table__delete-button');
  deleteButton.dataset.id = studentid;
  deleteButton.textContent = 'Delete';

  actionsTd.append(updatelink, deleteButton);
  tr.append(actionsTd);

  return tr;
}

function renderStudents({ students = [] } = {}) {
  console.log('renderstudent', students);

  const tbody = document.querySelector('.student-table__body');
  if (!tbody) return;

  const fragment = document.createDocumentFragment();

  if (!students.length) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.setAttribute('colspan', '7');
    td.classList.add('no-students-message');
    td.textContent = 'You have no students to display!';
    tr.append(td);
    fragment.append(tr);
  } else {
    for (const student of students) {
      fragment.append(createStudentRow(student));
    }
  }

  tbody.replaceChildren(fragment);
}
