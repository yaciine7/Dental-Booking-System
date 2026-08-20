import './About.css';

const stats = [
  { number: '10+', label: 'Years Experience' },
  { number: '2,000+', label: 'Happy Patients' },
  { number: '100%', label: 'Modern Technology' },
  { number: '1-on-1', label: 'Personalized Treatment' },
];

const certifications = [
  'Certified Dental Surgeon',
  'Member of International Dental Association',
  'Advanced Cosmetic Dentistry Training',
];

function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about__grid">
          <div className="about__image-col">
            <div className="about__image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80"
                alt="Professional dentist in modern clinic"
                className="about__image"
                loading="lazy"
              />
            </div>
            <div className="about__experience-card">
              <span className="about__experience-number">10+</span>
              <span className="about__experience-label">Years of Trusted Care</span>
            </div>
          </div>

          <div className="about__content">
            <span className="section-label">About Our Clinic</span>
            <h2 className="section-title about__title">
              Dedicated to Your Oral Health &amp; Beautiful Smile
            </h2>
            <p className="about__text">
              At YacineMed Dental Clinic, we combine years of expertise with
              state-of-the-art technology to deliver exceptional dental care.
              Our mission is to provide a comfortable, welcoming environment
              where every patient feels valued and cared for.
            </p>
            <p className="about__text">
              Led by Dr. Amira Benali, our team is committed to personalized
              treatment plans tailored to your unique needs. From routine
              check-ups to advanced cosmetic procedures, we ensure the highest
              standard of care at every visit.
            </p>

            <div className="about__dentist">
              <div className="about__dentist-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                </svg>
              </div>
              <div>
                <h3 className="about__dentist-name">Dr. Amira Benali</h3>
                <p className="about__dentist-role">Lead Dentist &amp; Clinic Director</p>
              </div>
            </div>

            <ul className="about__certifications">
              {certifications.map((cert) => (
                <li key={cert} className="about__cert-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="about__stats">
          {stats.map((stat) => (
            <div key={stat.label} className="about__stat-card">
              <span className="about__stat-number">{stat.number}</span>
              <span className="about__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
