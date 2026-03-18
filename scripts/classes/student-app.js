import { schoolManager } from './student-manager.js';
import Student from './student.js';

class SchoolAdmin extends schoolManager {
  constructor({
    startingData,
    headteacher,
    storageKey = 'students',
    hydrate = true,
  } = {}) {
    super({ startingData });

    if (typeof headteacher !== 'string')
      throw new Error(
        `An app requires a headteacher (of type 'string'); instead received ${headteacher} (of type ${typeof headteacher})`,
      );

    if (typeof storageKey !== 'string')
      throw new Error(
        `An app requires an storageKey (of type 'string'); instead received ${storageKey} (of type ${typeof storageKey})`,
      );

    if (typeof hydrate !== 'boolean')
      throw new Error(
        `'hydrate' must be a boolean; instead received ${hydrate} (of type ${typeof hydrate})`,
      );

    Object.defineProperty(this, 'headteacher', {
      value: headteacher,
      enumerable: true,
    });

    Object.defineProperty(this, 'storageKey', {
      value: `${headteacher.toLowerCase()}-${storageKey}`,
    });

    if (hydrate) {
      this.hydrateApp();
    }
  }

  markAsEnrolled(id) {
    const result = super.updateStudent(id, { isFullyEnrolled: true });
    this.persistData();
    console.log(result);
    return result;
  }

  markAsNotEnrolled(id) {
    const result = super.updateStudent(id, { isFullyEnrolled: false });
    this.persistData();
    console.log(result);
    return result;
  }

  createAppStudent(data) {
    const studentId = super.createStudent(data);
    console.log(studentId);
    return studentId;
  }

  updateAppStudent(id, updates) {
    super.updateStudent(id, updates);
    this.persistData();
  }

  removeAppStudent(id) {
    const deletedStudent = super.deleteStudent(id);
    this.persistData();
    console.log(deletedStudent);
    return deletedStudent;
  }

  persistData({ key = this.storageKey } = {}) {
    super.render(function (students) {
      console.log(students);
      localStorage.setItem(key, JSON.stringify(students));
    });
  }

  hydrateApp({ key = this.storageKey } = {}) {
    const studentsData = JSON.parse(localStorage.getItem(key)) || [];
    super.createStudents(studentsData);
  }

  getAllStudents() {
    return super.render(function (students) {
      console.log(students);
      return students;
    });
  }

  getStudentById(id) {
    const student = super.render(function (students) {
      const s = students.find(({ studentid }) => studentid === id);
      console.log(s);

      return s;
    });

    return student;
  }

  render({
    fn = function () {
      console.log(...arguments);
    },
  } = {}) {
    const headteacher = this.headteacher;
    return super.render(function (students) {
      return fn({ students, headteacher });
    });
  }
}

export { SchoolAdmin };
