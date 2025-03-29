import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DonationForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    donorName: '',
    email: '',
    phone: '',
    purpose: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDonation = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to make a donation');
      setLoading(false);
      return;
    }

    try {
      // Convert amount to paise before sending
      const amountInPaise = parseInt(formData.amount) * 100;

      const orderResponse = await fetch('http://localhost:3000/api/payment/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...formData,
          amount: amountInPaise // Send amount in paise
        })
      });

      if (!orderResponse.ok) {
        const errorText = await orderResponse.text();
        throw new Error(errorText || `Server error: ${orderResponse.status}`);
      }

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create donation order');
      }

      // Initialize Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.order.amount, // Amount from the order
        currency: orderData.order.currency,
        name: "Disaster Relief Fund",
        description: "Donation for Disaster Relief",
        order_id: orderData.order.id,
        prefill: {
          name: formData.donorName,
          email: formData.email,
          contact: formData.phone
        },
        handler: async function (response) {
          try {
            const verifyResponse = await fetch('http://localhost:3000/api/payment/verify-donation', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              alert('Thank you for your donation!');
              setFormData({
                amount: '',
                donorName: '',
                email: '',
                phone: '',
                purpose: ''
              });
            } else {
              throw new Error(verifyData.message || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Verification error:', error);
            setError('Payment verification failed. Please contact support.');
          }
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        },
        theme: {
          color: "#16a34a"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response) {
        setError('Payment failed: ' + response.error.description);
        setLoading(false);
      });
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Make a Donation</h2>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleDonation} className="space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Donation Amount (₹) *
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              required
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="donorName" className="block text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              id="donorName"
              name="donorName"
              value={formData.donorName}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              pattern="[0-9]{10}"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
              Purpose of Donation
            </label>
            <textarea
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Tell us what inspired you to donate..."
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            whileHover={{ scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.99 }}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Processing...
              </div>
            ) : (
              'Donate Now'
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Your donation will be used for disaster relief efforts.</p>
          <p className="mt-1">All transactions are secure and encrypted.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default DonationForm; 