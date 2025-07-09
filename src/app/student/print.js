'use client'; // This directive makes it a Client Component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PaymentHistory, AcademicYears, Terms } from '../../data/mockdata';
import styles from './page.module.css'; // Assuming you have some CSS for styling

export default function Print() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [studentPaymentHistory, setStudentPaymentHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    // State for filters
    const [selectedAcademicYearId, setSelectedAcademicYearId] = useState('');
    const [selectedTermId, setSelectedTermId] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (!storedUser) {
            router.push('/login');
            return;
        }

        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role !== 'student') {
            router.push('/login'); // Redirect if not a student
            return;
        }

        setUser(parsedUser); // Set the user state

        // Set initial selected academic year to the current one
        const currentYear = AcademicYears.find(year => year.current);
        if (currentYear) {
            setSelectedAcademicYearId(currentYear.id);
        }

        setLoading(false);

    }, [router]);

    // Effect to filter payment history based on selected year/term
    useEffect(() => {
        if (!user) return;

        let filteredHistory = PaymentHistory.filter(
            payment => payment.studentId === user.id
        );

        if (selectedAcademicYearId) {
            filteredHistory = filteredHistory.filter(
                payment => payment.academicYearId === selectedAcademicYearId
            );
        }

        if (selectedTermId) {
            filteredHistory = filteredHistory.filter(
                payment => payment.termId === selectedTermId
            );
        }
        setStudentPaymentHistory(filteredHistory);

    }, [user, selectedAcademicYearId, selectedTermId]); // Re-run when filters or user change

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        router.push('/login');
    };

    // Get terms for the selected academic year
    const termsForSelectedYear = Terms.filter(
        term => term.academicYearId === selectedAcademicYearId
    );

    // Helper to get academic year name
    const getAcademicYearName = (yearId) => {
        const year = AcademicYears.find(y => y.id === yearId);
        return year ? year.name : 'N/A';
    };

    // Helper to get term name
    const getTermName = (termId) => {
        const term = Terms.find(t => t.id === termId);
        return term ? term.name : 'N/A';
    };

    if (loading || !user) {
        return (
            <div className={styles.dashboardContainer} style={{ textAlign: 'center', marginTop: '50px' }}>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <>
            <div className={styles.dashboardContainer}>
                <header className={styles.dashboardHeader}>
                    <h1>Welcome, {user.firstName} {user.lastName}!</h1>
                    <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
                </header>

                <section className={styles.studentInfoCard}>
                    <h2>Your Information</h2>
                    <p><strong>Student ID:</strong> {user.id || 'N/A'}</p>
                    <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                    <p><strong>Class:</strong> {user.class || 'N/A'}</p>
                    <p><strong>Current Academic Year:</strong> {getAcademicYearName(user.currentAcademicYearId) || 'N/A'}</p>
                </section>

                <section className={styles.filterSection}>
                    <h3>Filter by:</h3>
                    <div className={styles.filterControls}>
                        <label htmlFor="academicYearFilter">Academic Year:</label>
                        <select
                            id="academicYearFilter"
                            value={selectedAcademicYearId}
                            onChange={(e) => {
                                setSelectedAcademicYearId(e.target.value);
                                setSelectedTermId(''); // Reset term when year changes
                            }}
                            className={styles.filterSelect}
                        >
                            <option value="">All Academic Years</option>
                            {AcademicYears.map(year => (
                                <option key={year.id} value={year.id}>{year.name}</option>
                            ))}
                        </select>

                        <label htmlFor="termFilter">Term:</label>
                        <select
                            id="termFilter"
                            value={selectedTermId}
                            onChange={(e) => setSelectedTermId(e.target.value)}
                            className={styles.filterSelect}
                            disabled={!selectedAcademicYearId} // Disable if no year is selected
                        >
                            <option value="">All Terms</option>
                            {termsForSelectedYear.map(term => (
                                <option key={term.id} value={term.id}>{term.name}</option>
                            ))}
                        </select>
                    </div>
                </section>

                <section className={styles.paymentHistoryCard}>
                    <h2>Payment History</h2>
                    {studentPaymentHistory.length === 0 ? (
                        <p>No payment history found for the selected period.</p>
                    ) : (
                        <table className={styles.feesTable}>
                            <thead>
                                <tr>
                                    <th>Fee Paid For</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Academic Year</th>
                                    <th>Term</th>
                                    <th>Status</th>
                                    <th>Transaction ID</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentPaymentHistory.map((payment) => (
                                    <tr key={payment.id}>
                                        <td data-label="Fee Paid For">{payment.feeName}</td>
                                        <td data-label="Amount">₦{payment.amount.toLocaleString()}</td>
                                        <td data-label="Date">{new Date(payment.date).toLocaleDateString()}</td>
                                        <td data-label="Academic Year">{getAcademicYearName(payment.academicYearId)}</td>
                                        <td data-label="Term">{getTermName(payment.termId)}</td>
                                        <td data-label="Status">
                                            <span className={`${styles.status} ${styles[payment.status]}`}>{payment.status}</span>
                                        </td>
                                        <td data-label="Transaction ID">{payment.transactionId}</td>
                                        <td data-label="Action">
                                            <Link href={`student/reciept/${payment.id}`} className={styles.payButton}>
                                                Print
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>
            </div>
        </>
    );
}