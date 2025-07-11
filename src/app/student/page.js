'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// Assuming these mock data imports are correct and available in the same directory structure.
// For a real application, these would typically come from an API or a database.
import { OutstandingFees, PaymentHistory, AcademicYears, Terms } from '../../data/mockdata';

export default function Dash() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [studentOutstandingFees, setStudentOutstandingFees] = useState([]);
    const [studentPaymentHistory, setStudentPaymentHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    // State for filters
    const [selectedAcademicYearId, setSelectedAcademicYearId] = useState('');
    const [selectedTermId, setSelectedTermId] = useState('');

    /**
     * useEffect hook to handle user authentication and initial data loading.
     * It checks for a 'currentUser' in localStorage, redirects to login if not found or if the user is not a student.
     * Sets the initial academic year filter to the current academic year if available.
     */
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

        // Set the default academic year filter to the current academic year
        const currentYear = AcademicYears.find(year => year.current);
        if (currentYear) {
            setSelectedAcademicYearId(currentYear.id);
        }

        setLoading(false); // Mark loading as complete once user data is processed

    }, [router]); // Dependency array includes router to avoid linting warnings

    /**
     * useEffect hook to filter outstanding fees and payment history based on
     * the currently logged-in user and selected academic year/term filters.
     * This effect runs whenever 'user', 'selectedAcademicYearId', or 'selectedTermId' changes.
     */
    useEffect(() => {
        if (!user) return; // Do not proceed if user data is not yet available

        // Filter outstanding fees for the current student
        let filteredOutstanding = OutstandingFees.filter(
            fee => fee.studentId === user.id
        );

        // Apply academic year filter if selected
        if (selectedAcademicYearId) {
            filteredOutstanding = filteredOutstanding.filter(
                fee => fee.academicYearId === selectedAcademicYearId
            );
        }

        // Apply term filter if selected
        if (selectedTermId) {
            filteredOutstanding = filteredOutstanding.filter(
                fee => fee.termId === selectedTermId
            );
        }
        setStudentOutstandingFees(filteredOutstanding); // Update state with filtered outstanding fees

        // Filter payment history for the current student
        let filteredHistory = PaymentHistory.filter(
            payment => payment.studentId === user.id
        );

        // Apply academic year filter if selected
        if (selectedAcademicYearId) {
            filteredHistory = filteredHistory.filter(
                payment => payment.academicYearId === selectedAcademicYearId
            );
        }

        // Apply term filter if selected
        if (selectedTermId) {
            filteredHistory = filteredHistory.filter(
                payment => payment.termId === selectedTermId
            );
        }
        setStudentPaymentHistory(filteredHistory); // Update state with filtered payment history

    }, [user, selectedAcademicYearId, selectedTermId]); // Dependencies for re-running the effect

    /**
     * Handles user logout. Clears the 'currentUser' from localStorage and redirects to the login page.
     */
    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        router.push('/login');
    };

    /**
     * Filters the Terms data to get terms relevant to the currently selected academic year.
     * This is used to populate the term filter dropdown.
     */
    const termsForSelectedYear = Terms.filter(
        term => term.academicYearId === selectedAcademicYearId
    );

    /**
     * Helper function to get the academic year name from its ID.
     * @param {string} yearId - The ID of the academic year.
     * @returns {string} The name of the academic year or 'N/A' if not found.
     */
    const getAcademicYearName = (yearId) => {
        const year = AcademicYears.find(y => y.id === yearId);
        return year ? year.name : 'N/A';
    };

    /**
     * Helper function to get the term name from its ID.
     * @param {string} termId - The ID of the term.
     * @returns {string} The name of the term or 'N/A' if not found.
     */
    const getTermName = (termId) => {
        const term = Terms.find(t => t.id === termId);
        return term ? term.name : 'N/A';
    };

    // Show a loading indicator while data is being fetched or user is being authenticated
    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
                <p className="text-base sm:text-lg text-slate-700 font-semibold">Loading dashboard...</p>
            </div>
        );
    }

    /**
     * Helper function to determine the Tailwind CSS classes for status badges.
     * @param {string} status - The status string (e.g., 'outstanding', 'overdue', 'completed').
     * @returns {string} Tailwind CSS classes for the status badge.
     */
    const statusClass = (status) => {
        if (status === 'outstanding') return 'bg-yellow-100 text-yellow-800';
        if (status === 'overdue') return 'bg-red-100 text-red-800';
        if (status === 'completed') return 'bg-green-100 text-green-800';
        return 'bg-slate-200 text-slate-700';
    };

    return (
        // Main container for the dashboard, responsive padding and max-width
        <div className="max-w-4xl mx-auto p-4 sm:p-6 text-slate-800 font-sans min-h-screen bg-slate-50">
            {/* Header section with welcome message and logout button */}
            <header className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-slate-200 pb-5 gap-4">
                {/* Adjusted heading size for mobile: text-2xl on small, text-4xl on medium and up */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 text-center sm:text-left">Welcome, {user.firstName} {user.lastName}!</h1>
                <button
                    onClick={handleLogout}
                    className="w-full sm:w-auto bg-red-600 text-white border-none px-6 py-2 rounded-lg cursor-pointer text-base transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                    Logout
                </button>
            </header>

            {/* Student Information section */}
            <section className="bg-white border border-slate-200 rounded-lg p-6 mb-6 shadow-md">
                {/* Adjusted heading size for mobile: text-xl on small, text-2xl on medium and up */}
                <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-5 border-b border-slate-100 pb-3">Your Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Increased text size for better readability on mobile */}
                    <p className="text-sm sm:text-base text-slate-700"><strong>Student ID:</strong> {user.id || 'N/A'}</p>
                    <p className="text-sm sm:text-base text-slate-700"><strong>Email:</strong> {user.email || 'N/A'}</p>
                    <p className="text-sm sm:text-base text-slate-700"><strong>Class:</strong> {user.class || 'N/A'}</p>
                    <p className="text-sm sm:text-base text-slate-700"><strong>Current Academic Year:</strong> {getAcademicYearName(user.currentAcademicYearId) || 'N/A'}</p>
                </div>
            </section>

            {/* Filter Data section */}
            <section className="bg-white border border-slate-200 rounded-lg p-6 mb-6 shadow-md">
                {/* Adjusted heading size for mobile: text-lg on small, text-xl on medium and up */}
                <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-5 border-b border-slate-100 pb-3">Filter Data</h3>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-center">
                    <div className="flex-1">
                        <label htmlFor="academicYearFilter" className="font-semibold text-slate-700 mb-2 block text-sm sm:text-base">Academic Year:</label>
                        <select
                            id="academicYearFilter"
                            value={selectedAcademicYearId}
                            onChange={(e) => {
                                setSelectedAcademicYearId(e.target.value);
                                setSelectedTermId(''); // Reset term filter when academic year changes
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
                            disabled={!selectedAcademicYearId} // Disable term filter if no academic year is selected
                        >
                            <option value="">All Terms</option>
                            {termsForSelectedYear.map(term => (
                                <option key={term.id} value={term.id}>{term.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </section>

            {/* Payment History section */}
            <section className="bg-white border border-slate-200 rounded-lg p-6 mb-6 shadow-md">
                {/* Adjusted heading size for mobile: text-xl on small, text-2xl on medium and up */}
                <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-5 border-b border-slate-100 pb-3">Payment History</h2>
                {studentPaymentHistory.length === 0 ? (
                    <p className="text-sm sm:text-base text-slate-700 text-center py-4">No payment history found for the selected period.</p>
                ) : (
                    // Responsive table container with horizontal scroll on small screens
                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                        <table className="w-full table-auto text-sm sm:text-base"> {/* Base table text size increased */}
                            <thead className="bg-slate-800 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left">Fee Paid For</th>
                                    <th className="px-4 py-3 text-left">Amount</th>
                                    <th className="px-4 py-3 text-left">Date</th>
                                    {/* Hide these columns on small screens, show on sm and md breakpoints */}
                                    <th className="px-4 py-3 text-left hidden sm:table-cell">Academic Year</th>
                                    <th className="px-4 py-3 text-left hidden sm:table-cell">Term</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                    <th className="px-4 py-3 text-left hidden md:table-cell">Transaction ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentPaymentHistory.map((payment) => (
                                    <tr key={payment.id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50">
                                        <td className="px-4 py-3 text-slate-700 font-medium whitespace-nowrap" data-label="Fee Paid For">{payment.feeName}</td>
                                        <td className="px-4 py-3 text-slate-700 whitespace-nowrap" data-label="Amount">₦{payment.amount.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-slate-700 whitespace-nowrap" data-label="Date">{new Date(payment.date).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 text-slate-700 hidden sm:table-cell" data-label="Academic Year">{getAcademicYearName(payment.academicYearId)}</td>
                                        <td className="px-4 py-3 text-slate-700 hidden sm:table-cell" data-label="Term">{getTermName(payment.termId)}</td>
                                        <td className="px-4 py-3" data-label="Status">
                                            {/* Increased badge text size to sm for better readability */}
                                            <span className={`rounded-full px-3 py-1 font-bold capitalize text-xs sm:text-sm inline-block ${statusClass(payment.status)}`}>{payment.status}</span>
                                        </td>
                                        <td className="px-4 py-3 text-slate-700 hidden md:table-cell" data-label="Transaction ID">{payment.transactionId}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            {/* Outstanding Fees section */}
            <section className="bg-white border border-slate-200 rounded-lg p-6 mb-6 shadow-md">
                {/* Adjusted heading size for mobile: text-xl on small, text-2xl on medium and up */}
                <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-5 border-b border-slate-100 pb-3">Outstanding Fees</h2>
                {studentOutstandingFees.length === 0 ? (
                    <p className="text-sm sm:text-base text-slate-700 text-center py-4">No outstanding fees at the moment for the selected period.</p>
                ) : (
                    // Responsive table container with horizontal scroll on small screens
                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                        <table className="w-full table-auto text-sm sm:text-base"> {/* Base table text size increased */}
                            <thead className="bg-slate-800 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left">Fee Name</th>
                                    <th className="px-4 py-3 text-left">Amount</th>
                                    <th className="px-4 py-3 text-left">Due Date</th>
                                    {/* Hide these columns on small screens, show on sm and md breakpoints */}
                                    <th className="px-4 py-3 text-left hidden sm:table-cell">Academic Year</th>
                                    <th className="px-4 py-3 text-left hidden sm:table-cell">Term</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentOutstandingFees.map((fee) => (
                                    <tr key={fee.id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50">
                                        <td className="px-4 py-3 text-slate-700 font-medium whitespace-nowrap" data-label="Fee Name">{fee.name}</td>
                                        <td className="px-4 py-3 text-slate-700 whitespace-nowrap" data-label="Amount">₦{fee.amount.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-slate-700 whitespace-nowrap" data-label="Due Date">{new Date(fee.dueDate).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 text-slate-700 hidden sm:table-cell" data-label="Academic Year">{getAcademicYearName(fee.academicYearId)}</td>
                                        <td className="px-4 py-3 text-slate-700 hidden sm:table-cell" data-label="Term">{getTermName(fee.termId)}</td>
                                        <td className="px-4 py-3" data-label="Status">
                                            {/* Increased badge text size to sm for better readability */}
                                            <span className={`rounded-full px-3 py-1 font-bold capitalize text-xs sm:text-sm inline-block ${statusClass(fee.status)}`}>{fee.status}</span>
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