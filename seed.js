import {
  createClass,
  createStudentWithUser,
  createAdminWithUser,
  createTeacherWithUser,
  createCourse,
  createPayment,
  createSessionWithTerms,
  assignCourseToClass,
  enrollStudentInCourse,
} from "./src/lib/db.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create Sessions and Terms
  const session = await createSessionWithTerms({
    name: "2024/2025",
    startDate: new Date("2024-09-01"),
    endDate: new Date("2025-06-30"),
    terms: [
      {
        name: "First Term",
        startDate: new Date("2024-09-01"),
        endDate: new Date("2024-12-20"),
      },
      {
        name: "Second Term",
        startDate: new Date("2025-01-06"),
        endDate: new Date("2025-04-11"),
      },
      {
        name: "Third Term",
        startDate: new Date("2025-04-28"),
        endDate: new Date("2025-06-30"),
      },
    ],
  });
  console.log("Session and terms created:", session);

  // Create Classes
  const classesData = [
    { name: "JSS 1" },
    { name: "JSS 2" },
    { name: "JSS 3" },
    { name: "SSS 1" },
    { name: "SSS 2" },
    { name: "SSS 3" },
  ];
  const classes = await Promise.all(
    classesData.map((classData) => createClass(classData))
  );
  console.log("Classes created:", classes);

  // Create Admin
  const admin = await createAdminWithUser({
    email: "admin@school.edu.ng",
    password: "adminpassword",
    fname: "Admin",
    lname: "User",
    mname: "Super",
  });
  console.log("Admin created:", admin);

  // Create Teachers
  const teachersData = [
    {
      email: "teacher1@school.edu.ng",
      password: "password1",
      fname: "John",
      lname: "Doe",
    },
    {
      email: "teacher2@school.edu.ng",
      password: "password2",
      fname: "Jane",
      lname: "Smith",
    },
    {
      email: "teacher3@school.edu.ng",
      password: "password3",
      fname: "Peter",
      lname: "Jones",
    },
    {
      email: "teacher4@school.edu.ng",
      password: "password4",
      fname: "Mary",
      lname: "Williams",
    },
  ];
  const teachers = await Promise.all(
    teachersData.map((teacherData) => createTeacherWithUser(teacherData))
  );
  console.log("Teachers created:", teachers);

  // Create Courses
  const coursesData = [
    { name: "English Language", teacherId: teachers[0].id },
    { name: "Mathematics", teacherId: teachers[1].id },
    { name: "Social Studies", teacherId: teachers[2].id },
    { name: "Agricultural Science", teacherId: teachers[3].id },
    { name: "Basic Technology", teacherId: teachers[0].id },
    { name: "Computer Science", teacherId: teachers[1].id },
  ];
  const courses = await Promise.all(
    coursesData.map((courseData) => createCourse(courseData))
  );
  console.log("Courses created:", courses);

  // Create Students
  const studentNames = ["thvgger", "dtechy", "timothy", "precious"];
  const students = await Promise.all(
    studentNames.map((name, index) =>
      createStudentWithUser({
        email: `${name}@school.edu.ng`,
        password: name,
        fname: name,
        lname: name,
        mname: name,
        admissionNo: `ADM${2024 + index}`,
        classId: classes[index % classes.length].id, // Distribute students among classes
      })
    )
  );
  console.log("Students created:", students);

  // Create Payments
  const payments = await Promise.all(
    students.map((student) =>
      createPayment({
        studentId: student.id,
        sessionId: session.id,
        termId: session.terms[0].id,
        name: "School Fees",
        amount: 50000,
        date: new Date(),
        method: "BANK",
        status: "CONFIRMED",
      })
    )
  );
  console.log("Payments created:", payments);

  // Assign courses to classes
  await assignCourseToClass(courses[0].id, classes[0].id); // English to JSS 1
  await assignCourseToClass(courses[1].id, classes[0].id); // Maths to JSS 1
  await assignCourseToClass(courses[2].id, classes[1].id); // Social Studies to JSS 2
  await assignCourseToClass(courses[3].id, classes[1].id); // Agric to JSS 2

  // Enroll students in additional courses
  await enrollStudentInCourse(students[0].id, courses[4].id); // thvgger in Basic Tech
  await enrollStudentInCourse(students[1].id, courses[5].id); // dtechy in Computer Science

  console.log("Database seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
