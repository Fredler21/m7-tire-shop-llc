'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      toast.error('Error sending message');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Your Name *</label>
          <input
            type="text"
            name="name"
            placeholder="John Smith"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-0 border-b border-outline-variant/50 focus:border-tertiary focus:outline-none text-on-surface pb-2 transition-all placeholder:text-on-secondary-container/50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Email Address *</label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-0 border-b border-outline-variant/50 focus:border-tertiary focus:outline-none text-on-surface pb-2 transition-all placeholder:text-on-secondary-container/50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="(555) 123-4567"
          value={formData.phone}
          onChange={handleChange}
          className="w-full bg-transparent border-0 border-b border-outline-variant/50 focus:border-tertiary focus:outline-none text-on-surface pb-2 transition-all placeholder:text-on-secondary-container/50"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Subject *</label>
        <input
          type="text"
          name="subject"
          placeholder="How can we help?"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full bg-transparent border-0 border-b border-outline-variant/50 focus:border-tertiary focus:outline-none text-on-surface pb-2 transition-all placeholder:text-on-secondary-container/50"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Message *</label>
        <textarea
          name="message"
          placeholder="Tell us more about your needs..."
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full bg-transparent border border-outline-variant/30 focus:border-tertiary focus:outline-none text-on-surface p-3 rounded-xl transition-all resize-none placeholder:text-on-secondary-container/50 mt-2"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed py-5 rounded-full font-bold uppercase tracking-widest shadow-lg hover:shadow-tertiary/20 transition-all disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
