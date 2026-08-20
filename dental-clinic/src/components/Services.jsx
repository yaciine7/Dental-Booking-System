import './Services.css';

const services = [
  {
    id: 'whitening',
    name: 'Teeth Whitening',
    description: 'Professional whitening treatments for a brighter smile.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
  },
  {
    id: 'cleaning',
    name: 'Dental Cleaning',
    description: 'Professional cleaning and plaque/tartar removal.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C8 2 5 5 5 9c0 4 3 7 7 13 4-6 7-9 7-13 0-4-3-7-7-7z" />
        <path d="M9 9h6M9 12h6" />
      </svg>
    ),
  },
  {
    id: 'checkup',
    name: 'Dental Check-Up',
    description: 'Complete examination and prevention-focused dental care.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    id: 'fillings',
    name: 'Dental Fillings',
    description: 'Treatment of cavities and restoration of damaged teeth.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="8" width="18" height="12" rx="2" />
        <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  {
    id: 'crowns',
    name: 'Dental Crowns',
    description: 'Restore damaged or weakened teeth.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l2 4h4l-3 3 1 5-4-2-4 2 1-5-3-3h4l2-4z" />
        <path d="M6 18h12v4H6z" />
      </svg>
    ),
  },
  {
    id: 'root-canal',
    name: 'Root Canal Treatment',
    description: 'Professional treatment for infected or damaged teeth.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M8 6h8M8 10h8M8 14h8M8 18h8" />
      </svg>
    ),
  },
  {
    id: 'veneers',
    name: 'Dental Veneers',
    description: 'Improve the appearance, shape, and color of teeth.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 12c0-4 3-8 8-8s8 4 8 8-3 8-8 8-8-4-8-8z" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
  },
  {
    id: 'orthodontics',
    name: 'Orthodontic Treatment',
    description: 'Teeth alignment and bite correction.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 8h16M4 12h16M4 16h16" />
        <circle cx="8" cy="8" r="2" fill="currentColor" />
        <circle cx="16" cy="12" r="2" fill="currentColor" />
        <circle cx="10" cy="16" r="2" fill="currentColor" />
      </svg>
    ),
  },
];

function Services() {
  return (
    <section id="services" className="services section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Services</span>
          <h2 className="section-title">Complete Dental Care for Your Smile</h2>
          <p className="section-subtitle">
            From preventive care to advanced treatments, we offer a full range
            of dental services to keep your smile healthy and beautiful.
          </p>
        </div>

        <div className="services__grid">
          {services.map((service) => (
            <article key={service.id} className="services__card">
              <div className="services__icon">{service.icon}</div>
              <h3 className="services__name">{service.name}</h3>
              <p className="services__description">{service.description}</p>
              <a href="#appointment" className="services__link">
                Learn More
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
