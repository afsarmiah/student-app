import { nanoid } from 'https://esm.sh/nanoid';
import Student from './student.js';
import rfdc from 'https://esm.sh/rfdc';
import deepmerge from 'https://esm.sh/deepmerge';

const clone = rfdc({ proto: true });

class schoolManager {
  #students = []; // we will hold all our students in this array. It will be filled with an array of objects which is coming from our Student class

  constructor({ startingData = [] } = {}) {
    // this.dataClass = dataClass; // This will refer to the data class, in this case the Students class. This makes our application dynamic as we can now use a different data class to use the CRUD methods that come below. * This has now been removed from the constructor

    this.createStudents(startingData);
  }

  createStudent(student) {
    const newStudent = new Student(student); // this will be 'new Student(pass in the data)'. Again its dynamic as we could put in a different data class when instantiating the SchoolManager class.

    // console.table(newStudent);

    this.#students = this.#students.toSpliced(
      this.#students.length,
      0,
      newStudent,
    ); // here we are pushing / adding the student into our array using the toSpliced method

    return newStudent.studentid; // here we are returning our the id of the student so we can use it later to update or delete.
  }

  createStudents(students) {
    for (const student of students) {
      this.createStudent(student);
    }
  }

  updateStudent(id, updates) {
    console.log(`updating the student with id ${id} with`, updates);

    const idx = this.#students.findIndex((student) => {
      return student.studentid === id;
    }); // here we are locating the correct id of the student we want to update by using the findIndex method.

    if (idx === -1) {
      throw new Error(`The ID of this Student does not exist`);
    } // if the id we have entered is -1 and does not exist, then we will throw an error.

    console.log(idx);

    const student = this.#students[idx]; // here we are now storing the actual student that we have correctly grabbed into a variable

    console.log(student);

    // Object.assign(student, updates);

    const updatedStudent = new Student(deepmerge(student, updates)); // the updatedStudent will contain the student we grabbed earlier and the updates will be merged in by using deepmerge and its tackles the issue of shallow copies

    this.#students = this.#students.toSpliced(idx, 1, updatedStudent); // now we go into the array of students and at the idx which is the index, we remove it and add that updatedStudent in

    return student;
  }

  deleteStudent(id) {
    const idx = this.#students.findIndex((student) => {
      return student.studentid === id;
    }); // we are doing the same here as above, locating the index of the student by way of their id. each and every id will ofcourse be different so no need to worry about dupes

    if (idx === -1) {
      throw new Error(`The ID of this Student does not exist`);
    } // if the id we have entered is -1 or does not exist, then we will throw an error.

    const studentToDelete = this.#students[idx]; // here we are now storing the actual student to delete into a variable

    console.log(studentToDelete);

    this.#students = this.#students.toSpliced(idx, 1); // actually deleting the student here

    return studentToDelete; // returning the deleted student for just incase
  }

  render(fn = schoolManager.consoleReader) {
    const clonedStudents = clone(this.#students);

    fn(clonedStudents);
  }

  static consoleReader(students) {
    if (!students.length) {
      return console.log('There are no students to display');
    }
    console.table(students);
  }
}

export { schoolManager };
