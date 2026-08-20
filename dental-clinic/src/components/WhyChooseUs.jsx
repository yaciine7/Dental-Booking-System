import './WhyChooseUs.css';

const features = [
  {
    title: 'Experienced Dentist',
    description:
      'Our lead dentist brings over a decade of expertise in general and cosmetic dentistry, ensuring you receive the highest quality care.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: 'Modern Technology',
    description:
      'We use the latest dental equipment and digital imaging technology for accurate diagnoses and comfortable treatments.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: 'Personalized Care',
    description:
      'Every patient receives a customized treatment plan designed around their unique needs, goals, and comfort level.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: 'Comfortable Environment',
    description:
      'Our clinic is designed to help you feel relaxed and at ease, with a calm atmosphere and friendly, attentive staff.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

function WhyChooseUs() {
  return (
    <section className="why section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Why Choose Us</span>
          <h2 className="section-title">The SmileCare Difference</h2>
          <p className="section-subtitle">
            We go beyond standard dental care to create an experience that
            puts your comfort, health, and confidence first.
          </p>
        </div>

        <div className="why__grid">
          {features.map((feature) => (
            <div key={feature.title} className="why__card">
              <div className="why__icon">{feature.icon}</div>
              <h3 className="why__title">{feature.title}</h3>
              <p className="why__description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
