// Academic Years
export const AcademicYears = [
    {
        id: 'year2024-2025',
        name: '2024/2025 Academic Year',
        startDate: '2024-09-09',
        endDate: '2025-07-25',
        current: true 
    },
    {
        id: 'year2025-2026',
        name: '2025/2026 Academic Year',
        startDate: '2025-09-08',
        endDate: '2026-07-23',
        current: false
    },
];

// Terms
export const Terms = [
    {
        id: 'term1_2024-2025',
        academicYearId: 'year2024-2025',
        name: 'First Term',
        startDate: '2024-09-09',
        endDate: '2024-12-13',
        current: false
    },
    {
        id: 'term2_2024-2025',
        academicYearId: 'year2024-2025',
        name: 'Second Term',
        startDate: '2025-01-06',
        endDate: '2025-04-04',
        current: true
    },
    {
        id: 'term3_2024-2025',
        academicYearId: 'year2024-2025',
        name: 'Third Term',
        startDate: '2025-04-22',
        endDate: '2025-07-25',
        current: false
    },
    {
        id: 'term1_2025-2026',
        academicYearId: 'year2025-2026',
        name: 'First Term',
        startDate: '2025-09-08',
        endDate: '2025-12-12',
        current: false
    },
];


export const Students = [
    {
        id: 'stu001',
        email: 'thvgger005@gmail.com',
        password: 'thvggerspassword',
        firstName: 'Thvgger',
        lastName: 'Adams',
        class: 'SS2',
        currentAcademicYearId: 'year2024-2025',
        role: 'student',
    },
    {
        id: 'stu002',
        email: 'timothy@gmail.com',
        password: 'timothy',
        firstName: 'Timothy',
        lastName: 'Akinpelu',
        class: 'SS2',
        currentAcademicYearId: 'year2024-2025',
        role: 'student',
    },
    {
        id: 'stu003',
        email: 'precious@gmail.com',
        password: 'precious',
        firstName: 'Precious',
        lastName: 'Idowu',
        class: 'JSS1',
        currentAcademicYearId: 'year2024-2025',
        role: 'student',
    },
];

export const Admins = [
    {
        id: 'adm001',
        email: 'admin@admin.com',
        password: 'adminpassword',
        firstName: 'Super',
        lastName: 'Admin',
        role: 'admin',
    },
];


export const Users = [...Students, ...Admins];


//Outstanding_Fees

export const OutstandingFees = [
    {
        id: 'fee001',
        studentId: 'stu001',
        academicYearId: 'year2024-2025',
        termId: 'term3_2024-2025',
        name: 'Third Term Tuition Fee',
        amount: 150000.00,
        dueDate: '2025-08-31',
        status: 'outstanding',
    },
    {
        id: 'fee002',
        studentId: 'stu001',
        academicYearId: 'year2024-2025',
        termId: 'term2_2024-2025',
        name: 'Second Term Library Fee',
        amount: 5000.00,
        dueDate: '2025-07-15',
        status: 'overdue',
    },
    {
        id: 'fee003',
        studentId: 'stu002',
        academicYearId: 'year2024-2025',
        termId: 'term3_2024-2025',
        name: 'Third Term Tuition Fee',
        amount: 150000.00,
        dueDate: '2025-08-31',
        status: 'outstanding',
    },
    {
        id: 'fee004',
        studentId: 'stu002',
        academicYearId: 'year2024-2024',
        termId: 'term2_2024-2025',
        name: 'Second Term Portal Fee',
        amount: 500.00,
        dueDate: '2025-08-31',
        status: 'outstanding',
    },
    {
        id: 'fee005',
        studentId: 'stu003',
        academicYearId: 'year2024-2025',
        termId: 'term3_2024-2025',
        name: 'Third Term Tuition Fee',
        amount: 120000.00, // JSS1 might have different tuition
        dueDate: '2025-08-31',
        status: 'outstanding',
    },
];

//Payment_History

export const PaymentHistory = [
    {
        id: 'pay001',
        studentId: 'stu001',
        academicYearId: 'year2024-2025',
        termId: 'term2_2024-2025',
        feeName: 'Second Term Lab Fee',
        amount: 10000.00,
        date: '2025-05-10',
        status: 'completed',
        transactionId: 'TXN12345'
    },
    {
        id: 'pay002',
        studentId: 'stu002',
        academicYearId: 'year2024-2025',
        termId: 'term1_2024-2025',
        feeName: 'First Term ID Card Fee',
        amount: 2000.00,
        date: '2025-01-20',
        status: 'completed',
        transactionId: 'TXN67890'
    },
    {
        id: 'pay003',
        studentId: 'stu001',
        academicYearId: 'year2024-2025',
        termId: 'term1_2024-2025',
        feeName: 'First Term School Fees',
        amount: 100000.00,
        date: '2025-05-10',
        status: 'completed',
        transactionId: 'TWN12432'
    },
    {
        id: 'pay004',
        studentId: 'stu001',
        academicYearId: 'year2024-2025',
        termId: 'term2_2024-2025',
        feeName: 'Second Term School Fees',
        amount: 130000.00,
        date: '2025-07-10',
        status: 'completed',
        transactionId: 'TXD32345'
    },
    {
        id: 'pay005',
        studentId: 'stu003',
        academicYearId: 'year2024-2025',
        termId: 'term2_2024-2025',
        feeName: 'Second Term Tuition Fee',
        amount: 120000.00,
        date: '2025-06-01',
        status: 'completed',
        transactionId: 'TXP98765'
    },
];