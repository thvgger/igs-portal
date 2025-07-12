import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// --- User Functions ---

/**
 * Creates a new user.
 * @param {object} data - The user data.
 * @param {string} data.email - The user's email.
 * @param {string} data.password - The user's password.
 * @param {string} data.fname - The user's first name.
 * @param {string} data.lname - The user's last name.
 * @param {string} [data.mname] - The user's middle name.
 * @param {'STUDENT' | 'ADMIN' | 'TEACHER' | 'LOWER_ADMIN'} [data.role] - The user's role.
 * @returns {Promise<import('@prisma/client').User>} The created user.
 */
export const createUser = (data) => {
  return prisma.user.create({ data });
};

/**
 * Gets a user by their ID.
 * @param {number} id - The user's ID.
 * @returns {Promise<import('@prisma/client').User | null>} The user, or null if not found.
 */
export const getUserById = (id) => {
  return prisma.user.findUnique({ where: { id } });
};

/**
 * Gets a user by their email.
 * @param {string} email - The user's email.
 * @returns {Promise<import('@prisma/client').User | null>} The user, or null if not found.
 */
export const getUserByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
};

/**
 * Updates a user's data.
 * @param {number} id - The user's ID.
 * @param {object} data - The data to update.
 * @returns {Promise<import('@prisma/client').User>} The updated user.
 */
export const updateUser = (id, data) => {
  return prisma.user.update({ where: { id }, data });
};

/**
 * Deletes a user by their ID.
 * @param {number} id - The user's ID.
 * @returns {Promise<import('@prisma/client').User>} The deleted user.
 */
export const deleteUser = (id) => {
  return prisma.user.delete({ where: { id } });
};

/**
 * Gets all users.
 * @returns {Promise<import('@prisma/client').User[]>} A list of all users.
 */
export const getAllUsers = () => {
  return prisma.user.findMany();
};

// --- Admin Functions ---

/**
 * Creates a new User and Admin in a transaction.
 * @param {object} data - The user and admin data.
 * @param {string} data.email - The user's email.
 * @param {string} data.password - The user's password.
 * @param {string} data.fname - The user's first name.
 * @param {string} data.lname - The user's last name.
 * @param {string} [data.mname] - The user's middle name.
 * @returns {Promise<import('@prisma/client').Admin>} The created admin.
 */
export const createAdminWithUser = (data) => {
  const { email, password, fname, lname, mname } = data;
  return prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        email,
        password,
        fname,
        lname,
        mname,
        role: "ADMIN",
      },
    });
    const newAdmin = await tx.admin.create({
      data: {
        userId: newUser.id,
      },
    });
    return newAdmin;
  });
};

/**
 * Gets an admin by their user ID.
 * @param {number} userId - The user's ID.
 * @returns {Promise<import('@prisma/client').Admin | null>} The admin, or null if not found.
 */
export const getAdminByUserId = (userId) => {
  return prisma.admin.findFirst({ where: { userId } });
};

/**
 * Gets an admin by their ID.
 * @param {number} id - The admin's ID.
 * @returns {Promise<import('@prisma/client').Admin | null>} The admin, or null if not found.
 */
export const getAdminById = (id) => {
  return prisma.admin.findUnique({ where: { id } });
};

/**
 * Updates admin data by user ID.
 * @param {number} userId - The user's ID.
 * @param {object} data - The data to update in the Admin model.
 * @returns {Promise<{count: number}>} The number of records updated.
 */
export const updateAdminByUserId = (userId, data) => {
  return prisma.admin.updateMany({ where: { userId }, data });
};

/**
 * Deletes an admin by user ID.
 * @param {number} userId - The user's ID.
 * @returns {Promise<{count: number}>} The number of records deleted.
 */
export const deleteAdminByUserId = (userId) => {
  return prisma.admin.deleteMany({ where: { userId } });
};

/**
 * Deletes an admin by their ID.
 * @param {number} id - The admin's ID.
 * @returns {Promise<import('@prisma/client').Admin>} The deleted admin.
 */
export const deleteAdmin = (id) => {
  return prisma.admin.delete({ where: { id } });
};

/**
 * Gets all admins.
 * @returns {Promise<import('@prisma/client').Admin[]>} A list of all admins.
 */
export const getAllAdmins = () => {
  return prisma.admin.findMany();
};

// --- LowerAdmin Functions ---

/**
 * Creates a new User and LowerAdmin in a transaction.
 * @param {object} data - The user and lower admin data.
 * @param {string} data.email - The user's email.
 * @param {string} data.password - The user's password.
 * @param {string} data.fname - The user's first name.
 * @param {string} data.lname - The user's last name.
 * @param {string} [data.mname] - The user's middle name.
 * @returns {Promise<import('@prisma/client').LowerAdmin>} The created lower admin.
 */
export const createLowerAdminWithUser = (data) => {
  const { email, password, fname, lname, mname } = data;
  return prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        email,
        password,
        fname,
        lname,
        mname,
        role: "LOWER_ADMIN",
      },
    });
    const newLowerAdmin = await tx.lowerAdmin.create({
      data: {
        userId: newUser.id,
      },
    });
    return newLowerAdmin;
  });
};

/**
 * Gets a lower admin by their user ID.
 * @param {number} userId - The user's ID.
 * @returns {Promise<import('@prisma/client').LowerAdmin | null>} The lower admin, or null if not found.
 */
export const getLowerAdminByUserId = (userId) => {
  return prisma.lowerAdmin.findFirst({ where: { userId } });
};

/**
 * Gets a lower admin by their ID.
 * @param {number} id - The lower admin's ID.
 * @returns {Promise<import('@prisma/client').LowerAdmin | null>} The lower admin, or null if not found.
 */
export const getLowerAdminById = (id) => {
  return prisma.lowerAdmin.findUnique({ where: { id } });
};

/**
 * Updates lower admin data by user ID.
 * @param {number} userId - The user's ID.
 * @param {object} data - The data to update in the LowerAdmin model.
 * @returns {Promise<{count: number}>} The number of records updated.
 */
export const updateLowerAdminByUserId = (userId, data) => {
  return prisma.lowerAdmin.updateMany({ where: { userId }, data });
};

/**
 * Deletes a lower admin by user ID.
 * @param {number} userId - The user's ID.
 * @returns {Promise<{count: number}>} The number of records deleted.
 */
export const deleteLowerAdminByUserId = (userId) => {
  return prisma.lowerAdmin.deleteMany({ where: { userId } });
};

/**
 * Deletes a lower admin by their ID.
 * @param {number} id - The lower admin's ID.
 * @returns {Promise<import('@prisma/client').LowerAdmin>} The deleted lower admin.
 */
export const deleteLowerAdmin = (id) => {
  return prisma.lowerAdmin.delete({ where: { id } });
};

/**
 * Gets all lower admins.
 * @returns {Promise<import('@prisma/client').LowerAdmin[]>} A list of all lower admins.
 */
export const getAllLowerAdmins = () => {
  return prisma.lowerAdmin.findMany();
};

// --- Teacher Functions ---

/**
 * Creates a new User and Teacher in a transaction.
 * @param {object} data - The user and teacher data.
 * @param {string} data.email - The user's email.
 * @param {string} data.password - The user's password.
 * @param {string} data.fname - The user's first name.
 * @param {string} data.lname - The user's last name.
 * @param {string} [data.mname] - The user's middle name.
 * @returns {Promise<import('@prisma/client').Teacher>} The created teacher.
 */
export const createTeacherWithUser = (data) => {
  const { email, password, fname, lname, mname } = data;
  return prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        email,
        password,
        fname,
        lname,
        mname,
        role: "TEACHER",
      },
    });
    const newTeacher = await tx.teacher.create({
      data: {
        userId: newUser.id,
      },
    });
    return newTeacher;
  });
};

/**
 * Gets a teacher by their user ID.
 * @param {number} userId - The user's ID.
 * @returns {Promise<import('@prisma/client').Teacher | null>} The teacher, or null if not found.
 */
export const getTeacherByUserId = (userId) => {
  return prisma.teacher.findFirst({ where: { userId } });
};

/**
 * Gets a teacher by their ID.
 * @param {number} id - The teacher's ID.
 * @returns {Promise<import('@prisma/client').Teacher | null>} The teacher, or null if not found.
 */
export const getTeacherById = (id) => {
  return prisma.teacher.findUnique({ where: { id } });
};

/**
 * Updates teacher data by user ID.
 * @param {number} userId - The user's ID.
 * @param {object} data - The data to update in the Teacher model.
 * @returns {Promise<{count: number}>} The number of records updated.
 */
export const updateTeacherByUserId = (userId, data) => {
  return prisma.teacher.updateMany({ where: { userId }, data });
};

/**
 * Deletes a teacher by user ID.
 * @param {number} userId - The user's ID.
 * @returns {Promise<{count: number}>} The number of records deleted.
 */
export const deleteTeacherByUserId = (userId) => {
  return prisma.teacher.deleteMany({ where: { userId } });
};

/**
 * Updates a teacher's data.
 * @param {number} id - The teacher's ID.
 * @param {object} data - The data to update.
 * @returns {Promise<import('@prisma/client').Teacher>} The updated teacher.
 */
export const updateTeacher = (id, data) => {
  return prisma.teacher.update({ where: { id }, data });
};

/**
 * Deletes a teacher by their ID.
 * @param {number} id - The teacher's ID.
 * @returns {Promise<import('@prisma/client').Teacher>} The deleted teacher.
 */
export const deleteTeacher = (id) => {
  return prisma.teacher.delete({ where: { id } });
};

/**
 * Gets all teachers.
 * @returns {Promise<import('@prisma/client').Teacher[]>} A list of all teachers.
 */
export const getAllTeachers = () => {
  return prisma.teacher.findMany();
};

// --- Student Functions ---

/**
 * Creates a new User and Student in a transaction.
 * @param {object} data - The user and student data.
 * @param {string} data.email - The user's email.
 * @param {string} data.password - The user's password.
 * @param {string} data.fname - The user's first name.
 * @param {string} data.lname - The user's last name.
 * @param {string} [data.mname] - The user's middle name.
 * @param {string} data.admissionNo - The student's admission number.
 * @param {number} data.classId - The ID of the student's class.
 * @returns {Promise<import('@prisma/client').Student>} The created student.
 */
export const createStudentWithUser = (data) => {
  const { email, password, fname, lname, mname, admissionNo, classId } = data;
  return prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        email,
        password,
        fname,
        lname,
        mname,
        role: "STUDENT",
      },
    });
    const newStudent = await tx.student.create({
      data: {
        userId: newUser.id,
        admissionNo,
        classId,
      },
    });
    return newStudent;
  });
};

/**
 * Gets a student by their user ID.
 * @param {number} userId - The user's ID.
 * @returns {Promise<import('@prisma/client').Student | null>} The student, or null if not found.
 */
export const getStudentByUserId = (userId) => {
  return prisma.student.findFirst({ where: { userId } });
};

/**
 * Gets a student by their ID.
 * @param {number} id - The student's ID.
 * @returns {Promise<import('@prisma/client').Student | null>} The student, or null if not found.
 */
export const getStudentById = (id) => {
  return prisma.student.findUnique({ where: { id } });
};

/**
 * Gets a student by their admission number.
 * @param {string} admissionNo - The student's admission number.
 * @returns {Promise<import('@prisma/client').Student | null>} The student, or null if not found.
 */
export const getStudentByAdmissionNo = (admissionNo) => {
  return prisma.student.findUnique({ where: { admissionNo } });
};

/**
 * Updates student data by user ID.
 * @param {number} userId - The user's ID.
 * @param {object} data - The data to update in the Student model.
 * @returns {Promise<{count: number}>} The number of records updated.
 */
export const updateStudentByUserId = (userId, data) => {
  return prisma.student.updateMany({ where: { userId }, data });
};

/**
 * Deletes a student by user ID.
 * @param {number} userId - The user's ID.
 * @returns {Promise<{count: number}>} The number of records deleted.
 */
export const deleteStudentByUserId = (userId) => {
  return prisma.student.deleteMany({ where: { userId } });
};

/**
 * Updates a student's data.
 * @param {number} id - The student's ID.
 * @param {object} data - The data to update.
 * @returns {Promise<import('@prisma/client').Student>} The updated student.
 */
export const updateStudent = (id, data) => {
  return prisma.student.update({ where: { id }, data });
};

/**
 * Deletes a student by their ID.
 * @param {number} id - The student's ID.
 * @returns {Promise<import('@prisma/client').Student>} The deleted student.
 */
export const deleteStudent = (id) => {
  return prisma.student.delete({ where: { id } });
};

/**
 * Gets all students.
 * @returns {Promise<import('@prisma/client').Student[]>} A list of all students.
 */
export const getAllStudents = () => {
  return prisma.student.findMany();
};

// --- StudentBalance Functions ---

/**
 * Creates a new student balance record.
 * @param {object} data - The student balance data.
 * @param {number} data.studentId - The student's ID.
 * @param {number} data.sessionId - The session's ID.
 * @param {number} data.termId - The term's ID.
 * @param {number} data.totalPaid - The total amount paid.
 * @param {number} data.totalOwed - The total amount owed.
 * @param {number} data.balance - The student's balance.
 * @returns {Promise<import('@prisma/client').StudentBalance>} The created student balance record.
 */
export const createStudentBalance = (data) => {
  return prisma.studentBalance.create({ data });
};

/**
 * Gets a student's balance for a specific term in a session.
 * @param {number} studentId - The student's ID.
 * @param {number} sessionId - The session's ID.
 * @param {number} termId - The term's ID.
 * @returns {Promise<import('@prisma/client').StudentBalance | null>} The student balance record, or null if not found.
 */
export const getStudentBalance = (studentId, sessionId, termId) => {
  return prisma.studentBalance.findFirst({
    where: { studentId, sessionId, termId },
  });
};

/**
 * Updates a student balance record.
 * @param {number} id - The student balance record's ID.
 * @param {object} data - The data to update.
 * @returns {Promise<import('@prisma/client').StudentBalance>} The updated student balance record.
 */
export const updateStudentBalance = (id, data) => {
  return prisma.studentBalance.update({ where: { id }, data });
};

/**
 * Gets the total balance for a student, carrying over debt from the previous session.
 * @param {number} studentId - The student's ID.
 * @param {number} currentSessionId - The current session's ID.
 * @returns {Promise<number>} The total balance owed by the student.
 */
export const getStudentTotalBalance = async (studentId, currentSessionId) => {
  const studentBalances = await prisma.studentBalance.findMany({
    where: { studentId },
    include: { session: true },
    orderBy: { session: { startDate: "asc" } },
  });

  let totalBalance = 0;
  let lastSessionBalance = 0;

  for (const balance of studentBalances) {
    if (balance.sessionId < currentSessionId) {
      lastSessionBalance = balance.balance;
    }
    if (balance.sessionId === currentSessionId) {
      totalBalance = balance.balance + lastSessionBalance;
    }
  }

  // If no record for the current session, carry over the last session's balance
  if (
    !studentBalances.some((b) => b.sessionId === currentSessionId) &&
    studentBalances.length > 0
  ) {
    totalBalance = lastSessionBalance;
  }

  return totalBalance;
};

// --- Class Functions ---

/**
 * Creates a new class.
 * @param {object} data - The class data.
 * @param {string} data.name - The name of the class.
 * @returns {Promise<import('@prisma/client').Class>} The created class.
 */
export const createClass = (data) => {
  return prisma.class.create({ data });
};

/**
 * Gets a class by its ID.
 * @param {number} id - The class's ID.
 * @returns {Promise<import('@prisma/client').Class | null>} The class, or null if not found.
 */
export const getClassById = (id) => {
  return prisma.class.findUnique({ where: { id } });
};

/**
 * Updates a class's data.
 * @param {number} id - The class's ID.
 * @param {object} data - The data to update.
 * @returns {Promise<import('@prisma/client').Class>} The updated class.
 */
export const updateClass = (id, data) => {
  return prisma.class.update({ where: { id }, data });
};

/**
 * Deletes a class by its ID.
 * @param {number} id - The class's ID.
 * @returns {Promise<import('@prisma/client').Class>} The deleted class.
 */
export const deleteClass = (id) => {
  return prisma.class.delete({ where: { id } });
};

/**
 * Gets all classes.
 * @returns {Promise<import('@prisma/client').Class[]>} A list of all classes.
 */
export const getAllClasses = () => {
  return prisma.class.findMany();
};

// --- Session and Term Functions ---

/**
 * Creates a new session and three terms under it.
 * @param {object} data - The session data.
 * @param {string} data.name - The name of the session.
 * @param {Date} data.startDate - The start date of the session.
 * @param {Date} data.endDate - The end date of the session.
 * @param {object[]} data.terms - The terms to create.
 * @param {string} data.terms[].name - The name of the term.
 * @param {Date} data.terms[].startDate - The start date of the term.
 * @param {Date} data.terms[].endDate - The end date of the term.
 * @returns {Promise<import('@prisma/client').Session>} The created session.
 */
export const createSessionWithTerms = async (data) => {
  const { name, startDate, endDate, terms } = data;
  return prisma.session.create({
    data: {
      name,
      startDate,
      endDate,
      terms: {
        create: terms,
      },
    },
    include: {
      terms: true,
    },
  });
};

/**
 * Gets a session by its ID.
 * @param {number} id - The session's ID.
 * @returns {Promise<import('@prisma/client').Session | null>} The session, or null if not found.
 */
export const getSessionById = (id) => {
  return prisma.session.findUnique({ where: { id }, include: { terms: true } });
};

/**
 * Updates a session's data.
 * @param {number} id - The session's ID.
 * @param {object} data - The data to update.
 * @returns {Promise<import('@prisma/client').Session>} The updated session.
 */
export const updateSession = (id, data) => {
  return prisma.session.update({ where: { id }, data });
};

/**
 * Deletes a session by its ID.
 * @param {number} id - The session's ID.
 * @returns {Promise<import('@prisma/client').Session>} The deleted session.
 */
export const deleteSession = (id) => {
  return prisma.session.delete({ where: { id } });
};

/**
 * Gets all sessions.
 * @returns {Promise<import('@prisma/client').Session[]>} A list of all sessions.
 */
export const getAllSessions = () => {
  return prisma.session.findMany({ include: { terms: true } });
};

/**
 * Gets a term by its ID.
 * @param {number} id - The term's ID.
 * @returns {Promise<import('@prisma/client').Term | null>} The term, or null if not found.
 */
export const getTermById = (id) => {
  return prisma.term.findUnique({ where: { id } });
};

// --- Payment Functions ---

/**
 * Creates a new payment.
 * @param {object} data - The payment data.
 * @param {number} data.studentId - The student's ID.
 * @param {number} data.sessionId - The session's ID.
 * @param {number} data.termId - The term's ID.
 * @param {string} data.name - The name of the payment (e.g., "School Fees").
 * @param {number} data.amount - The amount of the payment.
 * @param {Date} data.date - The date of the payment.
 * @param {'CASH' | 'BANK' | 'ONLINE'} [data.method] - The payment method.
 * @param {'PENDING' | 'CONFIRMED'} [data.status] - The payment status.
 * @returns {Promise<import('@prisma/client').Payments>} The created payment.
 */
export const createPayment = (data) => {
  return prisma.payments.create({ data });
};

/**
 * Creates a new fee for all students or a specific class.
 * @param {object} data - The fee data.
 * @param {string} data.name - The name of the fee (e.g., "Library Fee").
 * @param {number} data.amount - The amount of the fee.
 * @param {number} data.sessionId - The session's ID.
 * @param {number} data.termId - The term's ID.
 * @param {number} [data.classId] - The ID of the class to apply the fee to. If not provided, applies to all students.
 * @returns {Promise<void>}
 */
export const createNewFee = async (data) => {
  const { name, amount, sessionId, termId, classId } = data;

  let students = [];
  if (classId) {
    students = await prisma.student.findMany({ where: { classId } });
  } else {
    students = await prisma.student.findMany();
  }

  const paymentPromises = students.map((student) => {
    return prisma.payments.create({
      data: {
        studentId: student.id,
        sessionId,
        termId,
        name,
        amount,
        date: new Date(),
      },
    });
  });

  await Promise.all(paymentPromises);
};

/**
 * Gets a payment by its ID.
 * @param {number} id - The payment's ID.
 * @returns {Promise<import('@prisma/client').Payments | null>} The payment, or null if not found.
 */
export const getPaymentById = (id) => {
  return prisma.payments.findUnique({ where: { id } });
};

/**
 * Updates a payment's data.
 * @param {number} id - The payment's ID.
 * @param {object} data - The data to update.
 * @returns {Promise<import('@prisma/client').Payments>} The updated payment.
 */
export const updatePayment = (id, data) => {
  return prisma.payments.update({ where: { id }, data });
};

/**
 * Deletes a payment by its ID.
 * @param {number} id - The payment's ID.
 * @returns {Promise<import('@prisma/client').Payments>} The deleted payment.
 */
export const deletePayment = (id) => {
  return prisma.payments.delete({ where: { id } });
};

/**
 * Gets all payments for a student.
 * @param {number} studentId - The student's ID.
 * @returns {Promise<import('@prisma/client').Payments[]>} A list of payments.
 */
export const getPaymentsByStudent = (studentId) => {
  return prisma.payments.findMany({ where: { studentId } });
};

/**
 * Gets all outstanding (pending) payments for a student.
 * @param {number} studentId - The student's ID.
 * @returns {Promise<import('@prisma/client').Payments[]>} A list of outstanding payments.
 */
export const getOutstandingPayments = (studentId) => {
  return prisma.payments.findMany({
    where: {
      studentId,
      status: "PENDING",
    },
  });
};

/**
 * Calculates the total outstanding amount for a student.
 * @param {number} studentId - The student's ID.
 * @returns {Promise<number>} The total outstanding amount.
 */
export const getTotalOutstandingAmount = async (studentId) => {
  const outstandingPayments = await getOutstandingPayments(studentId);
  return outstandingPayments.reduce(
    (total, payment) => total + payment.amount,
    0
  );
};

// --- Course Functions ---

/**
 * Creates a new course.
 * @param {object} data - The course data.
 * @param {string} data.name - The name of the course.
 * @param {number} data.teacherId - The ID of the teacher for the course.
 * @returns {Promise<import('@prisma/client').Course>} The created course.
 */
export const createCourse = (data) => {
  return prisma.course.create({ data });
};

/**
 * Gets a course by its ID.
 * @param {number} id - The course's ID.
 * @returns {Promise<import('@prisma/client').Course | null>} The course, or null if not found.
 */
export const getCourseById = (id) => {
  return prisma.course.findUnique({ where: { id } });
};

/**
 * Updates a course's data.
 * @param {number} id - The course's ID.
 * @param {object} data - The data to update.
 * @returns {Promise<import('@prisma/client').Course>} The updated course.
 */
export const updateCourse = (id, data) => {
  return prisma.course.update({ where: { id }, data });
};

/**
 * Deletes a course by its ID.
 * @param {number} id - The course's ID.
 * @returns {Promise<import('@prisma/client').Course>} The deleted course.
 */
export const deleteCourse = (id) => {
  return prisma.course.delete({ where: { id } });
};

/**
 * Gets all courses.
 * @returns {Promise<import('@prisma/client').Course[]>} A list of all courses.
 */
export const getAllCourses = () => {
  return prisma.course.findMany();
};

/**
 * Assigns a teacher to a course.
 * @param {number} courseId - The course's ID.
 * @param {number} teacherId - The teacher's ID.
 * @returns {Promise<import('@prisma/client').Course>} The updated course.
 * @description Note: The current schema only supports one teacher per course. To assign multiple teachers, a many-to-many relationship is required in the Prisma schema.
 */
export const assignTeacherToCourse = (courseId, teacherId) => {
  return prisma.course.update({
    where: { id: courseId },
    data: { teacherId },
  });
};

// --- StudentCourses Functions ---

/**
 * Enrolls a student in a course.
 * @param {number} studentId - The student's ID.
 * @param {number} courseId - The course's ID.
 * @returns {Promise<import('@prisma/client').StudentCourses>} The created student-course link.
 */
export const enrollStudentInCourse = (studentId, courseId) => {
  return prisma.studentCourses.create({
    data: { studentId, courseId },
  });
};

/**
 * Removes a student from a course.
 * @param {number} studentId - The student's ID.
 * @param {number} courseId - The course's ID.
 * @returns {Promise<import('@prisma/client').StudentCourses>} The deleted student-course link.
 */
export const removeStudentFromCourse = (studentId, courseId) => {
  return prisma.studentCourses.delete({
    where: {
      studentId_courseId: {
        studentId,
        courseId,
      },
    },
  });
};

/**
 * Assigns a course to all students in a given class.
 * @param {number} courseId - The course's ID.
 * @param {number} classId - The class's ID.
 * @returns {Promise<{count: number}>} The number of students enrolled.
 */
export const assignCourseToClass = async (courseId, classId) => {
  const students = await prisma.student.findMany({
    where: { classId },
    select: { id: true },
  });

  if (students.length === 0) {
    return { count: 0 };
  }

  const studentCoursesData = students.map((student) => ({
    studentId: student.id,
    courseId,
  }));

  return prisma.studentCourses.createMany({
    data: studentCoursesData,
    skipDuplicates: true, // Don't throw error if a student is already enrolled
  });
};

// --- StudentResult Functions ---

/**
 * Creates a new student result.
 * @param {object} data - The result data.
 * @param {number} data.studentId - The student's ID.
 * @param {number} data.sessionId - The session's ID.
 * @param {number} data.termId - The term's ID.
 * @param {number} data.courseId - The course's ID.
 * @param {number} data.score - The student's score.
 * @param {string} data.grade - The student's grade.
 * @returns {Promise<import('@prisma/client').StudentResult>} The created result.
 */
export const createStudentResult = (data) => {
  return prisma.studentResult.create({ data });
};

/**
 * Lists all result entries for a student for a particular term in a session.
 * @param {number} studentId - The student's ID or admission number.
 * @param {number} sessionId - The session's name or ID.
 * @param {number} termId - The term's name or ID.
 * @returns {Promise<import('@prisma/client').StudentResult[]>} A list of student results.
 */
export const listStudentResultsForTerm = (studentId, sessionId, termId) => {
  return prisma.studentResult.findMany({
    where: {
      studentId,
      sessionId,
      termId,
    },
    include: {
      course: true,
    },
  });
};

/**
 * Updates a student's result.
 * @param {number} id - The result's ID.
 * @param {object} data - The data to update.
 * @returns {Promise<import('@prisma/client').StudentResult>} The updated result.
 */
export const updateStudentResult = (id, data) => {
  return prisma.studentResult.update({ where: { id }, data });
};

/**
 * Deletes a student's result.
 * @param {number} id - The result's ID.
 * @returns {Promise<import('@prisma/client').StudentResult>} The deleted result.
 */
export const deleteStudentResult = (id) => {
  return prisma.studentResult.delete({ where: { id } });
};

// --- Additional Helper Functions ---

/**
 * Promotes a student to the next class.
 * @param {number} studentId - The student's ID.
 * @param {number} nextClassId - The ID of the next class.
 * @returns {Promise<import('@prisma/client').Student>} The updated student record.
 */
export const promoteStudent = (studentId, nextClassId) => {
  return prisma.student.update({
    where: { id: studentId },
    data: { classId: nextClassId },
  });
};

/**
 * Gets a student's full academic history (all results from all sessions).
 * @param {number} studentId - The student's ID.
 * @returns {Promise<import('@prisma/client').StudentResult[]>} A list of all student results.
 */
export const getStudentAcademicHistory = (studentId) => {
  return prisma.studentResult.findMany({
    where: { studentId },
    include: {
      session: true,
      term: true,
      course: true,
    },
    orderBy: [
      { session: { startDate: "asc" } },
      { term: { startDate: "asc" } },
    ],
  });
};
