'use client'; // This directive makes it a Client Component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PaymentHistory, AcademicYears, Terms } from '@/data/mockdata';

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

    // Helper for status badge
    const statusClass = (status) => {
        if (status === 'outstanding') return 'bg-yellow-100 text-yellow-800';
        if (status === 'overdue') return 'bg-red-100 text-red-800';
        if (status === 'completed') return 'bg-green-100 text-green-800';
        return 'bg-slate-200 text-slate-700';
    };

    if (loading || !user) {
        return (
            <div className="max-w-3xl mx-auto p-5 text-slate-800 font-sans text-center mt-12">
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-5 text-slate-800 font-sans">
            <header className="flex justify-between items-center mb-8 border-b border-slate-200 pb-5 flex-wrap gap-2">
                <h1 className="text-3xl font-bold text-slate-900 m-0">Welcome, {user.firstName} {user.lastName}!</h1>
                <button onClick={handleLogout} className="bg-red-600 text-white border-none px-4 py-2 rounded cursor-pointer text-base transition-colors duration-200 hover:bg-red-700">Logout</button>
            </header>

            <section className="bg-white border border-slate-200 rounded-lg p-6 mb-6 shadow">
                <h2 className="text-blue-700 mb-5 text-2xl border-b border-slate-100 pb-2 font-bold">Your Information</h2>
                <p className="text-slate-700 mb-5 text-lg border-b border-slate-100 pb-2"><strong>Student ID:</strong> {user.id || 'N/A'}</p>
                <p className="text-slate-700 mb-5 text-lg border-b border-slate-100 pb-2"><strong>Email:</strong> {user.email || 'N/A'}</p>
                <p className="text-slate-700 mb-5 text-lg border-b border-slate-100 pb-2"><strong>Class:</strong> {user.class || 'N/A'}</p>
                <p className="text-slate-700 mb-0 text-lg"><strong>Current Academic Year:</strong> {getAcademicYearName(user.currentAcademicYearId) || 'N/A'}</p>
            </section>

            <section className="bg-white border border-slate-200 rounded-lg p-6 mb-6 shadow">
                <h3 className="text-blue-700 mb-5 text-xl border-b border-slate-100 pb-2 font-bold">Filter by:</h3>
                <div className="flex gap-5 items-center flex-wrap justify-start mb-2">
                    <label htmlFor="academicYearFilter" className="font-bold text-slate-700 whitespace-nowrap">Academic Year:</label>
                    <select
                        id="academicYearFilter"
                        value={selectedAcademicYearId}
                        onChange={(e) => {
                            setSelectedAcademicYearId(e.target.value);
                            setSelectedTermId(''); // Reset term when year changes
                        }}
                        className="px-3 py-2 border border-slate-300 rounded text-base min-w-[180px] bg-white text-slate-800 flex-grow max-w-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-slate-200 disabled:cursor-not-allowed"
                    >
                        <option value="">All Academic Years</option>
                        {AcademicYears.map(year => (
                            <option key={year.id} value={year.id}>{year.name}</option>
                        ))}
                    </select>

                    <label htmlFor="termFilter" className="font-bold text-slate-700 whitespace-nowrap">Term:</label>
                    <select
                        id="termFilter"
                        value={selectedTermId}
                        onChange={(e) => setSelectedTermId(e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded text-base min-w-[180px] bg-white text-slate-800 flex-grow max-w-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-slate-200 disabled:cursor-not-allowed"
                        disabled={!selectedAcademicYearId} // Disable if no year is selected
                    >
                        <option value="">All Terms</option>
                        {termsForSelectedYear.map(term => (
                            <option key={term.id} value={term.id}>{term.name}</option>
                        ))}
                    </select>
                </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-lg p-6 mb-6 shadow">
                <h2 className="text-blue-700 mb-5 text-2xl border-b border-slate-100 pb-2 font-bold">Payment History</h2>
                {studentPaymentHistory.length === 0 ? (
                    <p className="text-slate-700">No payment history found for the selected period.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse mt-5 text-sm">
                            <thead>
                                <tr>
                                    <th className="bg-slate-800 text-white font-bold uppercase px-4 py-3">Fee Paid For</th>
                                    <th className="bg-slate-800 text-white font-bold uppercase px-4 py-3">Amount</th>
                                    <th className="bg-slate-800 text-white font-bold uppercase px-4 py-3">Date</th>
                                    <th className="bg-slate-800 text-white font-bold uppercase px-4 py-3">Academic Year</th>
                                    <th className="bg-slate-800 text-white font-bold uppercase px-4 py-3">Term</th>
                                    <th className="bg-slate-800 text-white font-bold uppercase px-4 py-3">Status</th>
                                    <th className="bg-slate-800 text-white font-bold uppercase px-4 py-3">Transaction ID</th>
                                    <th className="bg-slate-800 text-white font-bold uppercase px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentPaymentHistory.map((payment) => (
                                    <tr key={payment.id} className="border-b border-slate-100">
                                        <td className="px-4 py-3 text-slate-700" data-label="Fee Paid For">{payment.feeName}</td>
                                        <td className="px-4 py-3 text-slate-700" data-label="Amount">₦{payment.amount.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-slate-700" data-label="Date">{new Date(payment.date).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 text-slate-700" data-label="Academic Year">{getAcademicYearName(payment.academicYearId)}</td>
                                        <td className="px-4 py-3 text-slate-700" data-label="Term">{getTermName(payment.termId)}</td>
                                        <td className="px-4 py-3" data-label="Status">
                                            <span className={`rounded-full px-3 py-1 font-bold capitalize text-xs inline-block ${statusClass(payment.status)}`}>{payment.status}</span>
                                        </td>
                                        <td className="px-4 py-3 text-slate-700" data-label="Transaction ID">{payment.transactionId}</td>
                                        <td className="px-4 py-3" data-label="Action">
                                            <Link href={`/reciept/${payment.id}`} className="bg-blue-600 text-white border-none px-3 py-2 rounded text-sm transition-colors duration-200 hover:bg-blue-800 inline-block text-center">
                                                Print
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}