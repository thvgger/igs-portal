'use client'; // This directive makes it a Client Component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { OutstandingFees, PaymentHistory } from '../../data/mockdata';


export default function New() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [studentOutstandingFees, setStudentOutstandingFees] = useState([]);
    const [studentPaymentHistory, setStudentPaymentHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (!storedUser) {
            router.push('/login');
            return;
        }

        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role !== 'student') {
            router.push('/login');
            return;
        }

        setUser(parsedUser);

        const outstanding = OutstandingFees.filter(
            fee => fee.studentId === parsedUser.id
        );
        setStudentOutstandingFees(outstanding);

        const history = PaymentHistory.filter(
            payment => payment.studentId === parsedUser.id
        );
        setStudentPaymentHistory(history);

        setLoading(false);

    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        router.push('/login');
    };

    if (loading || !user) {
        return (
            <div className="dashboard-container" style={{ textAlign: 'center', marginTop: '50px' }}>
                <p>Loading dashboard...</p>
            </div>
        );
    }
    return(
        <>
        <div className="dashboard-container">

                <header className="dashboard-header">
                    <h1>Welcome, {user.firstName} {user.lastName}!</h1>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </header>

                <section className="student-info-card">
                    <h2>Your Information</h2>
                    <p><strong>Student ID:</strong> {user.id || 'N/A'}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </section>

                <section className="outstanding-fees-card">
                    <h2>Outstanding Fees</h2>
                    {studentOutstandingFees.length === 0 ? (
                        <p>No outstanding fees at the moment.</p>
                    ) : (
                        <table className="fees-table">
                            <thead>
                                <tr>
                                    <th>Fee Name</th>
                                    <th>Amount</th>
                                    {/*<th>Due Date</th>*/}
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentOutstandingFees.map((fee) => (
                                    <tr key={fee.id}>
                                        <td data-label="Fee Name">{fee.name}</td>
                                        <td data-label="Amount">₦{fee.amount.toLocaleString()}</td>
                                        {/*<td data-label="Due Date">{new Date(fee.dueDate).toLocaleDateString ()}</td>*/}
                                        <td data-label="Status"><span className={`status ${fee.status}`}>   {fee.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>
            </div>
        </>
    )
}