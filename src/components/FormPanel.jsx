import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash } from 'react-icons/fa';

const FormPanel = ({
    panelTitle,
    resumeData,
    generateFromDescription,
    generationError,
    isGenerating,
    updatePersonal,
    updateSummary,
    experience,
    addExperience,
    updateExperience,
    removeExperience,
    projects,
    addProject,
    updateProject,
    removeProject,
    education,
    addEducation,
    updateEducation,
    removeEducation,
    skills,
    addSkill,
    removeSkill,
    languages,
    addLanguage,
    removeLanguage,
    selectedTemplate,
    setSelectedTemplate
}) => {
    const [newSkill, setNewSkill] = useState('');
    const [newLanguage, setNewLanguage] = useState('');
    const [descriptionPrompt, setDescriptionPrompt] = useState(`Name: Muhaiminul Hasan Dihan
Job Title: Frontend Developer
Email: dihan@example.com
Phone: +880 1712-345678
Address: Dhaka, Bangladesh
LinkedIn: linkedin.com/in/MuhaiminulHasanDihan
Summary: Frontend developer with 4 years of experience building responsive web applications and design systems.
Skills: React, JavaScript, TypeScript, CSS, Tailwind CSS, Git
Languages: English, Bangla
Experience:
- Frontend Developer at Bright Studio (2022 - Present)
  Built reusable UI components, improved Lighthouse performance, and worked closely with designers.
- Junior Web Developer at Pixel Works (2020 - 2022)
  Developed landing pages and internal dashboards for client projects.
Projects:
- E‑Commerce Platform - React, Node.js, MongoDB | https://github.com/Mh-Dihan/Resume-builder-with-reactjs
  Built a full-stack e-commerce platform with payment integration and admin dashboard.
- Portfolio Website - React, Framer Motion, Tailwind CSS
  Created a modern portfolio website with smooth animations and responsive design.
Education:
- B.Sc. in Computer Science - East West University (2016 - 2020)
  Focused on software engineering and human-computer interaction.`);

    const templates = [
        { id: 'template1', name: 'Modern Classic', icon: 'fa-file-lines' },
        { id: 'template2', name: 'Minimal Elegant', icon: 'fa-leaf' },
        { id: 'template3', name: 'Professional Bold', icon: 'fa-star' }
    ];

    const handleAddSkill = () => {
        if (newSkill.trim()) {
            addSkill(newSkill.trim());
            setNewSkill('');
        }
    };

    const handleAddLanguage = () => {
        if (newLanguage.trim()) {
            addLanguage(newLanguage.trim());
            setNewLanguage('');
        }
    };

    return (
        <motion.div
            className="form-panel"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="form-content">
                <div className="panel-title-row">
                    <h2>{panelTitle}</h2>
                </div>

                <div className="form-section">
                    <h3><i className="fas fa-wand-magic-sparkles"></i> Generate From Description</h3>
                    <p className="helper-text">
                        Paste a plain-English description with personal details, skills, experience, and education.
                        The app will convert it into an editable resume.
                    </p>
                    <div className="input-group">
                        <label>Description</label>
                        <textarea
                            rows="12"
                            value={descriptionPrompt}
                            onChange={(e) => setDescriptionPrompt(e.target.value)}
                            placeholder="Describe your background, skills, work history, and education..."
                        />
                    </div>
                    <div className="generator-actions">
                        <button
                            className="generate-btn"
                            onClick={() => generateFromDescription(descriptionPrompt)}
                            disabled={isGenerating}
                        >
                            <i className="fas fa-sparkles"></i>
                            {isGenerating ? 'Generating...' : 'Generate Resume'}
                        </button>
                    </div>
                    {generationError && <p className="error-text">{generationError}</p>}
                </div>

                {/* Template Selection */}
                <div className="form-section">
                    <h3><i className="fas fa-palette"></i> Choose Template</h3>
                    <div className="template-selector">
                        {templates.map(template => (
                            <button
                                key={template.id}
                                className={`template-btn ${selectedTemplate === template.id ? 'active' : ''}`}
                                onClick={() => setSelectedTemplate(template.id)}
                            >
                                <i className={`fas ${template.icon}`}></i>
                                <span>{template.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-section">
                    <h3 className="form-section-title centered-title"><i className="fas fa-user-circle"></i> Personal Info</h3>
                    <div className="input-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={resumeData.personal.fullName}
                            onChange={(e) => updatePersonal('fullName', e.target.value)}
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="input-group">
                        <label>Job Title</label>
                        <input
                            type="text"
                            value={resumeData.personal.jobTitle}
                            onChange={(e) => updatePersonal('jobTitle', e.target.value)}
                            placeholder="Frontend Developer"
                        />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={resumeData.personal.email}
                            onChange={(e) => updatePersonal('email', e.target.value)}
                            placeholder="email@example.com"
                        />
                    </div>
                    <div className="input-group">
                        <label>Phone</label>
                        <input
                            type="text"
                            value={resumeData.personal.phone}
                            onChange={(e) => updatePersonal('phone', e.target.value)}
                            placeholder="+1 234 567 890"
                        />
                    </div>
                    <div className="input-group">
                        <label>Address</label>
                        <input
                            type="text"
                            value={resumeData.personal.address}
                            onChange={(e) => updatePersonal('address', e.target.value)}
                            placeholder="City, Country"
                        />
                    </div>
                    <div className="input-group">
                        <label>Website (optional)</label>
                        <input
                            type="text"
                            value={resumeData.personal.website || ''}
                            onChange={(e) => updatePersonal('website', e.target.value)}
                            placeholder="yourwebsite.com"
                        />
                    </div>
                    <div className="input-group">
                        <label>LinkedIn (optional)</label>
                        <input
                            type="text"
                            value={resumeData.personal.linkedin || ''}
                            onChange={(e) => updatePersonal('linkedin', e.target.value)}
                            placeholder="linkedin.com/in/MuhaiminulHasanDihan"
                        />
                    </div>
                </div>

                {/* Summary */}
                <div className="form-section">
                    <h3 className="form-section-title centered-title"><i className="fas fa-align-left"></i> Summary</h3>
                    <textarea
                        rows="4"
                        value={resumeData.summary}
                        onChange={(e) => updateSummary(e.target.value)}
                        placeholder="Write a brief professional summary..."
                        style={{ width: '100%', minWidth: '350px' }}
                    />
                </div>

                {/* Experience */}
                <div className="form-section">
                    <h3>
                        <i className="fas fa-briefcase"></i> Experience
                        <button className="add-btn" onClick={addExperience}>
                            <FaPlus /> Add
                        </button>
                    </h3>
                    <AnimatePresence>
                        {experience.map((exp) => (
                            <motion.div
                                key={exp.id}
                                className="entry-card"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                            >
                                <button className="remove-btn" onClick={() => removeExperience(exp.id)}>
                                    <FaTrash />
                                </button>
                                <div className="input-group">
                                    <label>Company</label>
                                    <input
                                        type="text"
                                        value={exp.company}
                                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                        placeholder="Company name"
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Position</label>
                                    <input
                                        type="text"
                                        value={exp.position}
                                        onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                                        placeholder="Job title"
                                    />
                                </div>
                                <div className="row-2">
                                    <div className="input-group">
                                        <label>Start Date</label>
                                        <input
                                            type="text"
                                            value={exp.startDate}
                                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                            placeholder="Jan 2020"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>End Date</label>
                                        <input
                                            type="text"
                                            value={exp.endDate}
                                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                            placeholder="Present"
                                        />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label>Description</label>
                                    <textarea
                                        rows="2"
                                        value={exp.description}
                                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                        placeholder="Describe your responsibilities and achievements..."
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="form-section">
                    <h3>
                        <i className="fas fa-diagram-project"></i> Projects
                        <button className="add-btn" onClick={addProject}>
                            <FaPlus /> Add
                        </button>
                    </h3>
                    <AnimatePresence>
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                className="entry-card"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                            >
                                <button className="remove-btn" onClick={() => removeProject(project.id)}>
                                    <FaTrash />
                                </button>
                                <div className="input-group">
                                    <label>Project Name</label>
                                    <input
                                        type="text"
                                        value={project.name}
                                        onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                                        placeholder="E‑Commerce Platform"
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Technologies</label>
                                    <input
                                        type="text"
                                        value={project.technologies}
                                        onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                                        placeholder="React, Node.js, MongoDB"
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Project Link (optional)</label>
                                    <input
                                        type="text"
                                        value={project.link}
                                        onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                                        placeholder="https://github.com/Mh-Dihan/Resume-builder-with-reactjs"
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Description</label>
                                    <textarea
                                        rows="2"
                                        value={project.description}
                                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                                        placeholder="Describe the project impact, features, and technologies used..."
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Education */}
                <div className="form-section">
                    <h3>
                        <i className="fas fa-graduation-cap"></i> Education
                        <button className="add-btn" onClick={addEducation}>
                            <FaPlus /> Add
                        </button>
                    </h3>
                    <AnimatePresence>
                        {education.map((edu) => (
                            <motion.div
                                key={edu.id}
                                className="entry-card"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                            >
                                <button className="remove-btn" onClick={() => removeEducation(edu.id)}>
                                    <FaTrash />
                                </button>
                                <div className="input-group">
                                    <label>Degree</label>
                                    <input
                                        type="text"
                                        value={edu.degree}
                                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                        placeholder="B.Sc. Computer Science"
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Institution</label>
                                    <input
                                        type="text"
                                        value={edu.institution}
                                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                        placeholder="University name"
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Year / Duration</label>
                                    <input
                                        type="text"
                                        value={edu.year}
                                        onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                                        placeholder="2015-2019"
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Description (optional)</label>
                                    <input
                                        type="text"
                                        value={edu.description}
                                        onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                                        placeholder="Achievements, GPA, etc."
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Skills */}
                <div className="form-section">
                    <h3><i className="fas fa-code"></i> Skills</h3>
                    <div className="tags-container">
                        {skills.map(skill => (
                            <span key={skill} className="tag">
                                {skill}
                                <button onClick={() => removeSkill(skill)}>×</button>
                            </span>
                        ))}
                    </div>
                    <div className="add-tag">
                        <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Add a skill (e.g., React)"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                        />
                        <button onClick={handleAddSkill}><FaPlus /></button>
                    </div>
                </div>

                {/* Languages */}
                <div className="form-section">
                    <h3><i className="fas fa-language"></i> Languages</h3>
                    <div className="tags-container">
                        {languages.map(lang => (
                            <span key={lang} className="tag">
                                {lang}
                                <button onClick={() => removeLanguage(lang)}>×</button>
                            </span>
                        ))}
                    </div>
                    <div className="add-tag">
                        <input
                            type="text"
                            value={newLanguage}
                            onChange={(e) => setNewLanguage(e.target.value)}
                            placeholder="Add a language (e.g., Spanish)"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddLanguage()}
                        />
                        <button onClick={handleAddLanguage}><FaPlus /></button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default FormPanel;
