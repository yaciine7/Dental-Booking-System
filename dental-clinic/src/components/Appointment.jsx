import { useState } from 'react';
import { appointmentsService } from '../services/appointmentsService';
import './Appointment.css';

const serviceOptions = [
  'Teeth Whitening',
  'Dental Cleaning',
  'Dental Check-Up',
  'Dental Fillings',
  'Dental Crowns',
  'Root Canal Treatment',
  'Dental Veneers',
  'Orthodontic Treatment',
  'Other',
];

const timeOptions = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];

const initialFormData = {
  fullName: '',
  phone: '',
  email: '',
  service: '',
  date: '',
  time: '',
  message: '',
};

function Appointment() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+\d\s()-]{8,}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.date) {
      newErrors.date = 'Preferred date is required';
    }

    if (!formData.time) {
      newErrors.time = 'Preferred time is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitError('');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError('');

      await appointmentsService.create(formData);

      setSubmitted(true);
      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      setSubmitError(
        error.message || 'Unable to book the appointment right now. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="appointment" className="appointment section">
      <div className="container">
        <div className="appointment__wrapper">
          <div className="appointment__info">
            <span className="section-label">Book Now</span>
            <h2 className="section-title appointment__title">
              Ready to Improve Your Smile?
            </h2>
            <p className="appointment__text">
              Schedule your appointment today and take the first step toward a
              healthier, more confident smile. Fill out the form and our team
              will confirm your booking shortly.
            </p>
            <ul className="appointment__benefits">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Free initial consultation
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Flexible scheduling
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Quick confirmation
              </li>
            </ul>
          </div>

          <div className="appointment__form-wrapper">
            {submitted ? (
              <div className="appointment__success">
                <div className="appointment__success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3>Appointment Request Received</h3>
                <p>
                  Your appointment request has been received. We will contact you
                  shortly.
                </p>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setSubmitted(false)}
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form className="appointment__form" onSubmit={handleSubmit} noValidate>
                <div className="appointment__row">
                  <div className="appointment__field">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={errors.fullName ? 'appointment__input--error' : ''}
                    />
                    {errors.fullName && (
                      <span className="appointment__error">{errors.fullName}</span>
                    )}
                  </div>
                  <div className="appointment__field">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+213 XX XX XX XX"
                      className={errors.phone ? 'appointment__input--error' : ''}
                    />
                    {errors.phone && (
                      <span className="appointment__error">{errors.phone}</span>
                    )}
                  </div>
                </div>

                <div className="appointment__field">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={errors.email ? 'appointment__input--error' : ''}
                  />
                  {errors.email && (
                    <span className="appointment__error">{errors.email}</span>
                  )}
                </div>

                <div className="appointment__row">
                  <div className="appointment__field">
                    <label htmlFor="service">Select Service *</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={errors.service ? 'appointment__input--error' : ''}
                    >
                      <option value="">Choose a service</option>
                      {serviceOptions.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <span className="appointment__error">{errors.service}</span>
                    )}
                  </div>
                  <div className="appointment__field">
                    <label htmlFor="date">Preferred Date *</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={errors.date ? 'appointment__input--error' : ''}
                    />
                    {errors.date && (
                      <span className="appointment__error">{errors.date}</span>
                    )}
                  </div>
                </div>

                <div className="appointment__field">
                  <label htmlFor="time">Preferred Time *</label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={errors.time ? 'appointment__input--error' : ''}
                  >
                    <option value="">Choose a time</option>
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <span className="appointment__error">{errors.time}</span>
                  )}
                </div>

                <div className="appointment__field">
                  <label htmlFor="message">Message (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any additional information..."
                    rows="4"
                  />
                </div>

                {submitError && (
                  <p className="appointment__error" style={{ marginBottom: '1rem' }}>
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary appointment__submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Booking...' : 'Book Appointment'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Appointment;
