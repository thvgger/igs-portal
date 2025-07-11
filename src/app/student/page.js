'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { OutstandingFees, PaymentHistory, AcademicYears, Terms } from '../../data/mockdata';

export default function Dash() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [studentOutstandingFees, setStudentOutstandingFees] = useState([]);
    const [studentPaymentHistory, setStudentPaymentHistory] = useState([]);
    const [loading, setLoading] = useState(true);
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
            <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
                <p className="text-base sm:text-lg text-slate-700 font-semibold">Loading dashboard...</p>
            </div>
        );
    }

    const statusClass = (status) => {
        if (status === 'outstanding') return 'bg-yellow-100 text-yellow-800';
        if (status === 'overdue') return 'bg-red-100 text-red-800';
        if (status === 'completed') return 'bg-green-100 text-green-800';
        return 'bg-slate-200 text-slate-700';
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 text-slate-800 font-sans min-h-screen bg-slate-50">
            <header className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-slate-200 pb-5 gap-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 text-center sm:text-left">Welcome, {user.firstName} {user.lastName}!</h1>
                <button
                    onClick={handleLogout}
                    className="w-full sm:w-auto bg-red-600 text-white border-none px-6 py-2 rounded-lg cursor-pointer text-base transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                    Logout
                </button>
            </header>

            <section className="bg-white border border-slate-200 rounded-lg p-6 mb-6 shadow-md">
                <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-5 border-b border-slate-100 pb-3">Your Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className="text-sm sm:text-base text-slate-700"><strong>Student ID:</strong> {user.id || 'N/A'}</p>
                    <p className="text-sm sm:text-base text-slate-700"><strong>Email:</strong> {user.email || 'N/A'}</p>
                    <p className="text-sm sm:text-base text-slate-700"><strong>Class:</strong> {user.class || 'N/A'}</p>
                    <p className="text-sm sm:text-base text-slate-700"><strong>Current Academic Year:</strong> {getAcademicYearName(user.currentAcademicYearId) || 'N/A'}</p>
                </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-lg p-6 mb-6 shadow-md">
                <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-5 border-b border-slate-100 pb-3">Filter Data</h3>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-center">
                    <div className="flex-1">
                        <label htmlFor="academicYearFilter" className="font-semibold text-slate-700 mb-2 block text-sm sm:text-base">Academic Year:</label>
                        <select
                            id="academicYearFilter"
                            value={selectedAcademicYearId}
                            onChange={(e) => {
                                setSelectedAcademicYearId(e.target.value);
                                setSelectedTermId('');
                            }}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm sm:text-base bg-white text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-slate-100 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            <option value="">All Academic Years</option>
                            {AcademicYears.map(year => (
                                <option key={year.id} value={year.id}>{year.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <label htmlFor="termFilter" className="font-semibold text-slate-700 mb-2 block text-sm sm:text-base">Term:</label>
                        <select
                            id="termFilter"
                            value={selectedTermId}
                            onChange={(e) => setSelectedTermId(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm sm:text-base bg-white text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-slate-100 disabled:cursor-not-allowed transition-all duration-200"
                            disabled={!selectedAcademicYearId}
                        >
                            <option value="">All Terms</option>
                            {termsForSelectedYear.map(term => (
                                <option key={term.id} value={term.id}>{term.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-lg p-6 mb-6 shadow-md">
                <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-5 border-b border-slate-100 pb-3">Payment History</h2>
                {studentPaymentHistory.length === 0 ? (
                    <p className="text-sm sm:text-base text-slate-700 text-center py-4">No payment history found for the selected period.</p>
                ) : (
                    <div className="block sm:hidden">
                        {studentPaymentHistory.map((payment) => (
                            <div key={payment.id} className="bg-white border border-slate-200 rounded-lg p-4 mb-4 shadow-sm last:mb-0">
                                <p className="text-sm text-slate-700 mb-3"><strong>Fee Paid For:</strong> <span className="font-medium">{payment.feeName}</span></p>
                                <p className="text-sm text-slate-700 mb-3"><strong>Amount:</strong> ₦{payment.amount.toLocaleString()}</p>
                                <p className="text-sm text-slate-700 mb-3"><strong>Date:</strong> {new Date(payment.date).toLocaleDateString()}</p>
                                <p className="text-sm text-slate-700 mb-3"><strong>Academic Year:</strong> {getAcademicYearName(payment.academicYearId)}</p>
                                <p className="text-sm text-slate-700 mb-3"><strong>Term:</strong> {getTermName(payment.termId)}</p>
                                <p className="text-sm text-slate-700 mb-3"><strong>Status:</strong> <span className={`rounded-full px-2 py-0.5 font-bold capitalize text-xs ${statusClass(payment.status)}`}>{payment.status}</span></p>
                                <p className="text-sm text-slate-700"><strong>Transaction ID:</strong> {payment.transactionId}</p>
                            </div>
                        ))}
                    </div>
                )}
                <div className="hidden sm:block overflow-x-auto rounded-lg border border-slate-200">
                    {studentPaymentHistory.length > 0 && (
                        <table className="w-full table-auto text-sm sm:text-base">
                            <thead className="bg-slate-800 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left">Fee Paid For</th>
                                    <th className="px-4 py-3 text-left">Amount</th>
                                    <th className="px-4 py-3 text-left">Date</th>
                                    <th className="px-4 py-3 text-left">Academic Year</th>
                                    <th className="px-4 py-3 text-left">Term</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                    <th className="px-4 py-3 text-left">Transaction ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentPaymentHistory.map((payment) => (
                                    <tr key={payment.id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50">
                                        <td className="px-4 py-3 text-slate-700 font-medium whitespace-nowrap">{payment.feeName}</td>
                                        <td className="px-4 py-3 text-slate-700 whitespace-nowrap">₦{payment.amount.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{new Date(payment.date).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 text-slate-700">{getAcademicYearName(payment.academicYearId)}</td>
                                        <td className="px-4 py-3 text-slate-700">{getTermName(payment.termId)}</td>
                                        <td className="px-4 py-3">
                                            <span className={`rounded-full px-3 py-1 font-bold capitalize text-xs sm:text-sm inline-block ${statusClass(payment.status)}`}>{payment.status}</span>
                                        </td>
                                        <td className="px-4 py-3 text-slate-700">{payment.transactionId}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-lg p-6 mb-6 shadow-md">
                <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-5 border-b border-slate-100 pb-3">Outstanding Fees</h2>
                {studentOutstandingFees.length === 0 ? (
                    <p className="text-sm sm:text-base text-slate-700 text-center py-4">No outstanding fees at the moment for the selected period.</p>
                ) : (
                    <div className="block sm:hidden">
                        {studentOutstandingFees.map((fee) => (
                            <div key={fee.id} className="bg-white border border-slate-200 rounded-lg p-4 mb-4 shadow-sm last:mb-0">
                                <p className="text-sm text-slate-700 mb-3"><strong>Fee Name:</strong> <span className="font-medium">{fee.name}</span></p>
                                <p className="text-sm text-slate-700 mb-3"><strong>Amount:</strong> ₦{fee.amount.toLocaleString()}</p>
                                <p className="text-sm text-slate-700 mb-3"><strong>Due Date:</strong> {new Date(fee.dueDate).toLocaleDateString()}</p>
                                <p className="text-sm text-slate-700 mb-3"><strong>Academic Year:</strong> {getAcademicYearName(fee.academicYearId)}</p>
                                <p className="text-sm text-slate-700 mb-3"><strong>Term:</strong> {getTermName(fee.termId)}</p>
                                <p className="text-sm text-slate-700"><strong>Status:</strong> <span className={`rounded-full px-2 py-0.5 font-bold capitalize text-xs ${statusClass(fee.status)}`}>{fee.status}</span></p>
                            </div>
                        ))}
                    </div>
                )}
                <div className="hidden sm:block overflow-x-auto rounded-lg border border-slate-200">
                    {studentOutstandingFees.length > 0 && (
                        <table className="w-full table-auto text-sm sm:text-base">
                            <thead className="bg-slate-800 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left">Fee Name</th>
                                    <th className="px-4 py-3 text-left">Amount</th>
                                    <th className="px-4 py-3 text-left">Due Date</th>
                                    <th className="px-4 py-3 text-left">Academic Year</th>
                                    <th className="px-4 py-3 text-left">Term</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentOutstandingFees.map((fee) => (
                                    <tr key={fee.id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50">
                                        <td className="px-4 py-3 text-slate-700 font-medium whitespace-nowrap">{fee.name}</td>
                                        <td className="px-4 py-3 text-slate-700 whitespace-nowrap">₦{fee.amount.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{new Date(fee.dueDate).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 text-slate-700">{getAcademicYearName(fee.academicYearId)}</td>
                                        <td className="px-4 py-3 text-slate-700">{getTermName(fee.termId)}</td>
                                        <td className="px-4 py-3">
                                            <span className={`rounded-full px-3 py-1 font-bold capitalize text-xs sm:text-sm inline-block ${statusClass(fee.status)}`}>{fee.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </div>
    );
}