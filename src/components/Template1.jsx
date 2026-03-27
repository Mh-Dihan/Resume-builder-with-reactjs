import React from 'react';
import { normalizeLink } from '../utils/linkUtils';

const Template1 = ({ data }) => {
    const { personal, summary, experience, projects = [], education, skills, languages } = data;

    return (
        <div className="resume-template template1">
            <div className="template-header">
                <h1>{personal.fullName || 'Your Name'}</h1>
                <h3>{personal.jobTitle || 'Job Title'}</h3>
                <div className="contact-info">
                    {personal.email && <span><i className="fas fa-envelope"></i> {personal.email}</span>}
                    {personal.phone && <span><i className="fas fa-phone"></i> {personal.phone}</span>}
                    {personal.address && <span><i className="fas fa-map-marker-alt"></i> {personal.address}</span>}
                </div>
                {(personal.website || personal.linkedin) && (
                    <div className="social-links">
                        {personal.website && (
                            <a href={normalizeLink(personal.website)} target="_blank" rel="noreferrer">
                                <i className="fas fa-globe"></i> {personal.website}
                            </a>
                        )}
                        {personal.linkedin && (
                            <a href={normalizeLink(personal.linkedin)} target="_blank" rel="noreferrer">
                                <i className="fab fa-linkedin"></i> {personal.linkedin}
                            </a>
                        )}
                    </div>
                )}
            </div>

            {summary && (
                <div className="template-section">
                    <h4>Professional Summary</h4>
                    <p>{summary}</p>
                </div>
            )}

            {experience.length > 0 && (
                <div className="template-section">
                    <h4>Work Experience</h4>
                    {experience.map((exp, idx) => (
                        <div key={idx} className="experience-item">
                            <div className="item-header">
                                <strong>{exp.position}</strong> at <strong>{exp.company}</strong>
                                <span className="date">{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <p>{exp.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {education.length > 0 && (
                <div className="template-section">
                    <h4>Education</h4>
                    {education.map((edu, idx) => (
                        <div key={idx} className="education-item">
                            <div className="item-header">
                                <strong>{edu.degree}</strong> - {edu.institution}
                                <span className="date">{edu.year}</span>
                            </div>
                            {edu.description && <p>{edu.description}</p>}
                        </div>
                    ))}
                </div>
            )}

            {projects.length > 0 && (
                <div className="template-section">
                    <h4>Projects</h4>
                    {projects.map((project, idx) => (
                        <div key={idx} className="project-item">
                            <div className="item-header">
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

            {(skills.length > 0 || languages.length > 0) && (
                <div className="template-section skills-section">
                    {skills.length > 0 && (
                        <div>
                            <h4>Skills</h4>
                            <div className="skills-list">
                                {skills.map((skill, idx) => (
                                    <span key={idx} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    {languages.length > 0 && (
                        <div>
                            <h4>Languages</h4>
                            <div className="languages-list">
                                {languages.map((lang, idx) => (
                                    <span key={idx} className="language-tag">{lang}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Template1;
