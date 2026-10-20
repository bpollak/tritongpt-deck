import React from 'react';
import './SmtWorkSlide.css';
export default function SmtWorkSlide({slide:s}) {
 const content=<dl>{s.rows.map(r=><div key={r.label}><dt>{r.label}</dt><dd>{r.text}</dd></div>)}</dl>;
 return <article className={`smt-work smt-work--${s.kind||'rows'}`}>
 <div className="smt-work__eyebrow">AI in my daily work</div>{s.contextHref&&<a className="smt-work__context" href={s.contextHref} target="_blank" rel="noreferrer">Job context ↗</a>}<h1>{s.title}</h1><p className="smt-work__subtitle">{s.subtitle}</p>
 {s.kind==='evidence'?<div className="smt-work__evidence"><div>{content}<a href={s.link} target="_blank" rel="noreferrer">Read the October 19 edition ↗</a></div><img src={s.image} alt={`Public ${s.title} edition, October 19, 2026`}/></div>:content}
 {s.metrics&&<div className="smt-work__metrics">{s.metrics.map(([value,label])=><div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>}
 {s.takeaway&&<p className="smt-work__takeaway">{s.takeaway}</p>}{s.footer&&<p className="smt-work__footer">{s.footer}</p>}
 </article>;
}
