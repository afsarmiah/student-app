import { nanoid } from 'https://esm.sh/nanoid';

export default class Student {
  constructor({ name, age, gender, year, course, studentid = nanoid() } = {}) {
    if (typeof name !== 'string') {
      throw new Error(`The name must be a string and not ${typeof name}`);
    }

    if (!name.length) {
      throw new Error(`You must enter a name`);
    }

    if (!age) {
      throw new Error(`The age must not be empty. Please enter a number`);
    }

    if (!gender.length) {
      throw new Error(`The gender must not be empty`);
    }

    if (!year) {
      throw new Error(`The year must not ben empty. Please enter a number`);
    }

    if (typeof course !== 'string') {
      throw new Error(`The course must be a string and not ${typeof course}`);
    }

    if (!course.length) {
      throw new Error(`The course must not be empty`);
    }

    if (!studentid) {
      throw new Error(`The Student ID must not be empty`);
    }

    this.name = name;
    this.age = age;
    this.gender = gender;
    this.year = year;
    this.course = course;
    this.studentid = studentid;
    // Object.freeze(this);
  }
}
