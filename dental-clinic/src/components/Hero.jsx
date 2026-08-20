import './Hero.css';

const trustIndicators = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    label: 'Experienced Dentist',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    label: 'Modern Equipment',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    label: 'Patient-Focused Care',
  },
];

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__badge">Welcome to YacineMed</span>
          <h1 className="hero__title">
            Your Smile, <span className="hero__title-accent">Our Expertise.</span>
          </h1>
          <p className="hero__description">
            Experience exceptional dental care in a modern, comfortable environment.
            Our team of skilled professionals is dedicated to helping you achieve
            a healthy, confident smile.
          </p>
          <div className="hero__actions">
            <a href="#appointment" className="btn btn-primary">
              Book an Appointment
            </a>
            <a href="#services" className="btn btn-secondary">
              Our Services
            </a>
          </div>
          <ul className="hero__trust">
            {trustIndicators.map((item) => (
              <li key={item.label} className="hero__trust-item">
                <span className="hero__trust-icon">{item.icon}</span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__visual">
          <div className="hero__image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
              alt="Modern dental clinic with professional equipment"
              className="hero__image"
              loading="eager"
            />
            <div className="hero__image-badge">
              <span className="hero__image-badge-number">10+</span>
              <span className="hero__image-badge-text">Years of Excellence</span>
            </div>
          </div>
          <div className="hero__decoration hero__decoration--1"></div>
          <div className="hero__decoration hero__decoration--2"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
