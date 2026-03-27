import React from 'react';
import { normalizeLink } from '../utils/linkUtils';

const Template3 = ({ data }) => {
    const { personal, summary, experience, projects = [], education, skills, languages } = data;

    return (
        <div className="resume-template template3">
            <div className="template3-header">
                <div className="header-content">
                    <h1>{personal.fullName || 'Your Name'}</h1>
                    <div className="header-details">
                        <div className="header-contact">
                            {personal.email && <span><i className="fas fa-envelope"></i> {personal.email}</span>}
                            {personal.phone && <span><i className="fas fa-phone"></i> {personal.phone}</span>}
                            {personal.website && (
                                <a className="header-link" href={normalizeLink(personal.website)} target="_blank" rel="noreferrer">
                                    <i className="fas fa-globe"></i> {personal.website}
                                </a>
                            )}
                            {personal.linkedin && (
                                <a className="header-link" href={normalizeLink(personal.linkedin)} target="_blank" rel="noreferrer">
                                    <i className="fab fa-linkedin"></i> {personal.linkedin}
                                </a>
                            )}
                        </div>
                        <h3 className="header-title">{personal.jobTitle || 'Job Title'}</h3>
                    </div>
                </div>
            </div>

            <div className="template3-body">
                {summary && (
                    <div className="body-section">
                        <div className="section-icon"><i className="fas fa-user"></i></div>
                        <div className="section-content">
                            <h4>Profile</h4>
                            <p>{summary}</p>
                        </div>
                    </div>
                )}

                {experience.length > 0 && (
                    <div className="body-section">
                        <div className="section-icon"><i className="fas fa-briefcase"></i></div>
                        <div className="section-content">
                            <h4>Work Experience</h4>
                            {experience.map((exp, idx) => (
                                <div key={idx} className="exp-card">
                                    <div className="exp-title">{exp.position} at {exp.company}</div>
                                    <div className="exp-date">{exp.startDate} - {exp.endDate}</div>
                                    <p>{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {education.length > 0 && (
                    <div className="body-section">
                        <div className="section-icon"><i className="fas fa-graduation-cap"></i></div>
                        <div className="section-content">
                            <h4>Education</h4>
                            {education.map((edu, idx) => (
                                <div key={idx} className="edu-card">
                                    <div className="edu-title">{edu.degree}</div>
                                    <div className="edu-institution">{edu.institution} | {edu.year}</div>
                                    {edu.description && <p>{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {projects.length > 0 && (
                    <div className="body-section">
                        <div className="section-icon"><i className="fas fa-diagram-project"></i></div>
                        <div className="section-content">
                            <h4>Projects</h4>
                            {projects.map((project, idx) => (
                                <div key={idx} className="project-item exp-card">
                                    <div className="exp-title">{project.name}</div>
                                    {project.technologies && <div className="exp-date">{project.technologies}</div>}
                                    {project.link && (
                                        <a className="resume-link" href={normalizeLink(project.link)} target="_blank" rel="noreferrer">
                                            {project.link}
                                        </a>
                                    )}
                                    {project.description && <p>{project.description}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="body-section skills-lang">
                    {skills.length > 0 && (
                        <div className="skills-block">
                            <h4><i className="fas fa-code"></i> Skills</h4>
                            <div className="skills-grid">
                                {skills.map((skill, idx) => (
                                    <span key={idx}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    {languages.length > 0 && (
                        <div className="languages-block">
                            <h4><i className="fas fa-language"></i> Languages</h4>
                            <div className="languages-grid">
                                {languages.map((lang, idx) => (
                                    <span key={idx}>{lang}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Template3;
