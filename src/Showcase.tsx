import React from 'react';
import { COLORS, FONTS } from './theme';
import './App.css';

const PROJECTS = [
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    title: 'Velvo',
    tag: 'Innovative elegance',
  },
  {
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
    title: 'TWYG',
    tag: 'Est. 100 million years ago',
  },
  {
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
    title: "Levi's",
    tag: 'Freedom to Move',
  },
];

const UPDATES = [
  {
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    meta: 'Behance / October 7, 2024',
    title: 'How We Create Impactful Brand Identities Through Our Process',
  },
  {
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    meta: 'The Brand Identity / October 19, 2024',
    title: 'The Role of Color Theory in Brand Identity Development',
  },
  {
    image: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=600&q=80',
    meta: 'Visuelle / November 2, 2024',
    title: 'Announcing an Exciting Collaboration with Leading Motion Designers',
  },
];

export default function Showcase() {
  return (
    <div className="babylon-showcase-section">
      {/* Latest Work */}
      <section className="babylon-latest-work">
        <div className="babylon-section-header">
          <h2 className="babylon-section-title">Latest Work</h2>
          <button type="button" className="babylon-section-link">View All</button>
        </div>
        <div className="babylon-work-grid">
          {PROJECTS.map((p) => (
            <div className="babylon-work-card" key={p.title}>
              <div className="babylon-work-img-wrapper">
                <img src={p.image} alt={p.title} />
              </div>
              <div className="babylon-work-card-label">
                <span className="babylon-work-title">{p.title}</span>
                <span className="babylon-work-tag">{p.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Latest Updates */}
      <section className="babylon-latest-updates">
        <div className="babylon-section-header">
          <h2 className="babylon-section-title">Latest Updates</h2>
          <button type="button" className="babylon-section-link">View All</button>
        </div>
        <div className="babylon-updates-grid">
          {UPDATES.map((u, i) => (
            <div className="babylon-update-card" key={i}>
              <div className="babylon-update-img-wrapper">
                <img src={u.image} alt={u.title} />
              </div>
              <div className="babylon-update-meta">{u.meta}</div>
              <div className="babylon-update-title">{u.title}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
