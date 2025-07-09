'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { OutstandingFees, PaymentHistory, AcademicYears, Terms } from '../../data/mockdata';
import styles from './page.module.css';

export default function New() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [studentOutstandingFees, setStudentOutstandingFees] = useState([]);
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
            router.push('/login');
            return;
        }

        setUser(parsedUser); 


        const currentYear = AcademicYears.find(year => year.current);
        if (currentYear) {
            setSelectedAcademicYearId(currentYear.id);
        }

        setLoading(false);

    }, [router]);


    useEffect(() => {
        if (!user) return;

        let filteredOutstanding = OutstandingFees.filter(
            fee => fee.studentId === user.id
        );

        if (selectedAcademicYearId) {
            filteredOutstanding = filteredOutstanding.filter(
                fee => fee.academicYearId === selectedAcademicYearId
            );
        }

        if (selectedTermId) {
            filteredOutstanding = filteredOutstanding.filter(
                fee => fee.termId === selectedTermId
            );
        }
        setStudentOutstandingFees(filteredOutstanding);

        // Filter payment history
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

    }, [user, selectedAcademicYearId, selectedTermId]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        router.push('/login');
    };

    const termsForSelectedYear = Terms.filter(
        term => term.academicYearId === selectedAcademicYearId
    );

    const getAcademicYearName = (yearId) => {
        const year = AcademicYears.find(y => y.id === yearId);
        return year ? year.name : 'N/A';
    };

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
                                setSelectedTermId('');
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
                            disabled={!selectedAcademicYearId}
                        >
                            <option value="">All Terms</option>
                            {termsForSelectedYear.map(term => (
                                <option key={term.id} value={term.id}>{term.name}</option>
                            ))}
                        </select>
                    </div>
                </section>

                <section className={styles.outstandingFeesCard}>
                    <h2>Outstanding Fees</h2>
                    {studentOutstandingFees.length === 0 ? (
                        <p>No outstanding fees at the moment for the selected period.</p>
                    ) : (
                        <table className={styles.feesTable}>
                            <thead>
                                <tr>
                                    <th>Fee Name</th>
                                    <th>Amount</th>
                                    <th>Due Date</th>
                                    <th>Academic Year</th>
                                    <th>Term</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentOutstandingFees.map((fee) => (
                                    <tr key={fee.id}>
                                        <td data-label="Fee Name">{fee.name}</td>
                                        <td data-label="Amount">₦{fee.amount.toLocaleString()}</td>
                                        <td data-label="Due Date">{new Date(fee.dueDate).toLocaleDateString()}</td>
                                        <td data-label="Academic Year">{getAcademicYearName(fee.academicYearId)}</td>
                                        <td data-label="Term">{getTermName(fee.termId)}</td>
                                        <td data-label="Status"><span className={`${styles.status} ${styles[fee.status]}`}>{fee.status}</span></td>
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