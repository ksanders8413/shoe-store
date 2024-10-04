import React, { useState } from 'react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle form submission logic (e.g., send data to API)
    console.log(formData);
    setIsSubmitted(true);
  };

  return (
    <div className=" text-gray-300 min-h-screen py-16 px-4 -mt-4 -mb-10">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-emerald-400">
          Contact Us
        </h1>

        {isSubmitted ? (
          <div className="text-center text-emerald-400">
            <h2 className="text-2xl font-semibold mb-4">Thank you!</h2>
            <p>We’ve received your message and will get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label className="mb-2 font-semibold" htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 rounded bg-gray-800 text-gray-200"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-semibold" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 rounded bg-gray-800 text-gray-200"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-semibold" htmlFor="message">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="p-3 h-32 rounded bg-gray-800 text-gray-200"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-emerald-400 text-gray-900 font-bold rounded hover:bg-emerald-500 transition-all"
            >
              Send Message
            </button>
          </form>
        )}

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-emerald-400 mb-4">
            Get in Touch
          </h2>
          <p>Have any questions or need help? Feel free to contact us:</p>
          <p>Email: <a href="mailto:support@fuegokickz.com" className="text-emerald-400">support@fuegokickz.com</a></p>
          <p>Phone: +1 (920) 915-1700</p>
          <p>Orlando, FL USA</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
