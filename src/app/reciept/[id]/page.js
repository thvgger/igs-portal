'use client';

import React from 'react';
import './page.css';
import { useParams } from 'next/navigation';
import { Students, PaymentHistory } from '@/data/mockdata';

const App = () => {
  const params = useParams();
  const paymentId = params.id;

  function getPaymentById(paymentId) {
    return PaymentHistory.find(payment => payment.id === paymentId);
  }

  const payment = getPaymentById(paymentId);
  const student = payment ? Students.find(s => s.id === payment.studentId) : null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="app-container">

      <div id="receipt-container">
        <h1 className="receipt-title">Payment Receipt</h1>

        <div className="receipt-header">
          <div>
            <p>Student Portal</p>
            <p>University Name, City, Country</p>
          </div>
          <p>Date: {payment ? new Date(payment.date).toLocaleDateString() : new Date().toLocaleDateString()}</p>
        </div>

        <div className="student-info">
          <h2>Student Details:</h2>
          <div className="student-details-grid">
            <p><span>Student Name:</span> {student ? `${student.firstName} ${student.lastName}` : 'N/A'}</p>
            <p><span>Student ID:</span> {student ? student.id : 'N/A'}</p>
            <p><span>Program:</span> Computer Science</p>
            <p><span>Semester:</span>....</p>
          </div>
        </div>

        <div className="payment-details">
          <h2>Payment Details:</h2>
          <table className="payment-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{payment ? payment.feeName : 'N/A'}</td>
                <td>{payment ? payment.amount.toLocaleString('en-US', { style: 'currency', currency: 'NGN' }) : 'N/A'}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>Total Amount Paid:</td>
                <td>{payment ? payment.amount.toLocaleString('en-US', { style: 'currency', currency: 'NGN' }) : 'N/A'}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="transaction-info">
          <p><span>Payment Method:</span> Credit Card</p>
          <p><span>Transaction ID:</span> {payment ? payment.transactionId : 'N/A'}</p>
          <p><span>Payment Status:</span> {payment ? payment.status : 'N/A'}</p>
        </div>

        <div className="receipt-footer">
          <p>Thank you for your payment!</p>
          <p>Please keep this receipt for your records.</p>
        </div>
      </div>

      <button
        onClick={handlePrint}
        className="no-print print-button"
      >
        Print Receipt
      </button>
    </div>
  );
};

export default App;