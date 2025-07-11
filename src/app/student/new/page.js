'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { OutstandingFees, PaymentHistory, AcademicYears, Terms } from '../../../data/mockdata';

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
                            setSelectedTermId('');
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
                        disabled={!selectedAcademicYearId}
                    >
                        <option value="">All Terms</option>
                        {termsForSelectedYear.map(term => (
                            <option key={term.id} value={term.id}>{term.name}</option>
                        ))}
                    </select>
                </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-lg p-6 mb-6 shadow">
                <h2 className="text-blue-700 mb-5 text-2xl border-b border-slate-100 pb-2 font-bold">Outstanding Fees</h2>
                {studentOutstandingFees.length === 0 ? (
                    <p className="text-slate-700">No outstanding fees at the moment for the selected period.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse mt-5 text-sm">
                            <thead>
                                <tr>
                                    <th className="bg-slate-800 text-white font-bold uppercase px-4 py-3">Fee Name</th>
                                    <th className="bg-slate-800 text-white font-bold uppercase px-4 py-3">Amount</th>
                                    <th className="bg-slate-800 text-white font-bold uppercase px-4 py-3">Due Date</th>
                                    <th className="bg-slate-800 text-white font-bold uppercase px-4 py-3">Academic Year</th>
                                    <th className="bg-slate-800 text-white font-bold uppercase px-4 py-3">Term</th>
                                    <th className="bg-slate-800 text-white font-bold uppercase px-4 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentOutstandingFees.map((fee) => (
                                    <tr key={fee.id} className="border-b border-slate-100">
                                        <td className="px-4 py-3 text-slate-700" data-label="Fee Name">{fee.name}</td>
                                        <td className="px-4 py-3 text-slate-700" data-label="Amount">₦{fee.amount.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-slate-700" data-label="Due Date">{new Date(fee.dueDate).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 text-slate-700" data-label="Academic Year">{getAcademicYearName(fee.academicYearId)}</td>
                                        <td className="px-4 py-3 text-slate-700" data-label="Term">{getTermName(fee.termId)}</td>
                                        <td className="px-4 py-3" data-label="Status">
                                            <span className={`rounded-full px-3 py-1 font-bold capitalize text-xs inline-block ${statusClass(fee.status)}`}>{fee.status}</span>
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