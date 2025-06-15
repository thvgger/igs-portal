
export const Students = [
    {
        id: 'stu001',
        email: 'thvgger005@gmail.com',
        password: 'Thvgger.005',
        firstName: 'Thvgger',
        lastName: 'Adams',
        role: 'student',
    },
    {
        id: 'stu002',
        email: 'timothy@gmail.com',
        password: 'timothy',
        firstName: 'Timothy',
        lastName: 'Akinpelu',
        role: 'student',
    },
];

export const Admins = [
    {
        id: 'adm001',
        email: 'admin@example.com',
        password: 'adminpassword',
        firstName: 'Super',
        lastName: 'Admin',
        role: 'admin',
    },
];


export const Users = [...Students, ...Admins];


export const OutstandingFees = [
    { 
        id: 'fee001',
        studentId: 'stu001', 
        name: 'Tuition Fee', 
        amount: 150000.00, 
        dueDate: '2025-08-31', 
        status: 'outstanding' 
    },

    { 
        id: 'fee002', 
        studentId: 'stu001', 
        name: 'Library Fee', 
        amount: 5000.00, 
        dueDate: '2025-07-15', 
        status: 'outstanding' 
    },

    { 
        id: 'fee003', 
        studentId: 'stu002', 
        name: 'Tuition Fee', 
        amount: 150000.00, 
        dueDate: '2025-08-31', 
        status: 'outstanding' 
    },
];

export const PaymentHistory = [
    { id: 'pay001', studentId: 'stu001', feeName: 'Lab Fee', amount: 10000.00, date: '2025-05-10', status: 'completed', transactionId: 'TXN12345' },
    { id: 'pay002', studentId: 'stu002', feeName: 'ID Card Fee', amount: 2000.00, date: '2025-01-20', status: 'completed', transactionId: 'TXN67890' },
];