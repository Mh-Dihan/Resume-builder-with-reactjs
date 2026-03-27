import React from 'react';
import { normalizeLink } from '../utils/linkUtils';

const Template2 = ({ data }) => {
    const { personal, summary, experience, projects = [], education, skills, languages } = data;

    return (
        <div className="resume-template template2">
            <div className="template2-sidebar">
                <div className="profile-header">
                    <h2>{personal.fullName || 'Your Name'}</h2>
                    <p className="job-title">{personal.jobTitle || 'Job Title'}</p>
                </div>

                <div className="sidebar-section">
                    <h4>Contact</h4>
                    {personal.email && <p><i className="fas fa-envelope"></i> {personal.email}</p>}
                    {personal.phone && <p><i className="fas fa-phone"></i> {personal.phone}</p>}
                    {personal.address && <p><i className="fas fa-map-marker-alt"></i> {personal.address}</p>}
                    {personal.website && (
                        <p>
                            <i className="fas fa-globe"></i>
                            <a className="sidebar-link" href={normalizeLink(personal.website)} target="_blank" rel="noreferrer">
                                {personal.website}
                            </a>
                        </p>
                    )}
                    {personal.linkedin && (
                        <p>
                            <i className="fab fa-linkedin"></i>
                            <a className="sidebar-link" href={normalizeLink(personal.linkedin)} target="_blank" rel="noreferrer">
                                {personal.linkedin}
                            </a>
                        </p>
                    )}
                </div>

                {skills.length > 0 && (
                    <div className="sidebar-section">
                        <h4>Skills</h4>
                        <div className="sidebar-skills">
                            {skills.map((skill, idx) => (
                                <span key={idx}>{skill}</span>
                            ))}
                        </div>
                    </div>
                )}

                {languages.length > 0 && (
                    <div className="sidebar-section">
                        <h4>Languages</h4>
                        <div className="sidebar-languages">
                            {languages.map((lang, idx) => (
                                <span key={idx}>{lang}</span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="template2-main">
                {summary && (
                    <div className="main-section">
                        <h4>About Me</h4>
                        <p>{summary}</p>
                    </div>
                )}

                {experience.length > 0 && (
                    <div className="main-section">
                        <h4>Experience</h4>
                        {experience.map((exp, idx) => (
                            <div key={idx} className="exp-item">
                                <div className="exp-header">
                                    <strong>{exp.position}</strong> at {exp.company}
                                    <span>{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <p>{exp.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {education.length > 0 && (
                    <div className="main-section">
                        <h4>Education</h4>
                        {education.map((edu, idx) => (
                            <div key={idx} className="edu-item">
                                <div className="edu-header">
                                    <strong>{edu.degree}</strong> - {edu.institution}
                                    <span>{edu.year}</span>
                                </div>
                                {edu.description && <p>{edu.description}</p>}
                            </div>
                        ))}
                    </div>
                )}

                {projects.length > 0 && (
                    <div className="main-section">
                        <h4>Projects</h4>
                        {projects.map((project, idx) => (
                            <div key={idx} className="project-item exp-item">
                                <div className="exp-header">
                                    <strong>{project.name}</strong>
                                    {project.technologies && <span>{project.technologies}</span>}
                                </div>
                                {project.link && (
                                    <a className="resume-link" href={normalizeLink(project.link)} target="_blank" rel="noreferrer">
                                        {project.link}
                                    </a>
                                )}
                                {project.description && <p>{project.description}</p>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Template2;
