import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FormPanel from './components/FormPanel';
import ResumePreview from './components/ResumePreview';
import DarkModeToggle from './components/DarkModeToggle';
import { createSampleResumeData } from './data/defaultResumeData';
import { generateResumeFromDescription } from './utils/resumeGenerator';
import './styles/App.css';
import './styles/darkMode.css';
import './styles/animations.css';

const uiText = {
    appTitle: 'Resume Builder',
    appSubtitle: 'Live Preview · Multiple Templates · PDF Download',
    formPanelTitle: 'Comprehensive Form',
    previewPanelTitle: 'Live Preview'
};

function App() {
    const [resumeData, setResumeData] = useState(createSampleResumeData);
    const [generationError, setGenerationError] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const [selectedTemplate, setSelectedTemplate] = useState('template1');
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const updatePersonal = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            personal: { ...prev.personal, [field]: value }
        }));
    };

    const updateSummary = (value) => {
        setResumeData(prev => ({ ...prev, summary: value }));
    };

    const generateFromDescription = (description) => {
        setIsGenerating(true);
        setGenerationError('');

        try {
            const generatedResume = generateResumeFromDescription(description);
            setResumeData(generatedResume);
        } catch (error) {
            setGenerationError(error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    const addExperience = () => {
        setResumeData(prev => ({
            ...prev,
            experience: [...prev.experience, {
                id: Date.now(),
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                description: ''
            }]
        }));
    };

    const updateExperience = (id, field, value) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.map(exp =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        }));
    };

    const removeExperience = (id) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.filter(exp => exp.id !== id)
        }));
    };

    const addEducation = () => {
        setResumeData(prev => ({
            ...prev,
            education: [...prev.education, {
                id: Date.now(),
                degree: '',
                institution: '',
                year: '',
                description: ''
            }]
        }));
    };

    const addProject = () => {
        setResumeData(prev => ({
            ...prev,
            projects: [...(prev.projects || []), {
                id: Date.now(),
                name: '',
                technologies: '',
                link: '',
                description: ''
            }]
        }));
    };

    const updateProject = (id, field, value) => {
        setResumeData(prev => ({
            ...prev,
            projects: (prev.projects || []).map(project =>
                project.id === id ? { ...project, [field]: value } : project
            )
        }));
    };

    const removeProject = (id) => {
        setResumeData(prev => ({
            ...prev,
            projects: (prev.projects || []).filter(project => project.id !== id)
        }));
    };

    const updateEducation = (id, field, value) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.map(edu =>
                edu.id === id ? { ...edu, [field]: value } : edu
            )
        }));
    };

    const removeEducation = (id) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.filter(edu => edu.id !== id)
        }));
    };

    const addSkill = (skill) => {
        if (skill && !resumeData.skills.includes(skill)) {
            setResumeData(prev => ({
                ...prev,
                skills: [...prev.skills, skill]
            }));
        }
    };

    const removeSkill = (skill) => {
        setResumeData(prev => ({
            ...prev,
            skills: prev.skills.filter(s => s !== skill)
        }));
    };

    const addLanguage = (language) => {
        if (language && !resumeData.languages.includes(language)) {
            setResumeData(prev => ({
                ...prev,
                languages: [...prev.languages, language]
            }));
        }
    };

    const removeLanguage = (language) => {
        setResumeData(prev => ({
            ...prev,
            languages: prev.languages.filter(l => l !== language)
        }));
    };

    return (
        <div className="app">
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

            <motion.header
                className="app-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1>
                    <i className="fas fa-file-alt"></i> {uiText.appTitle}
                </h1>
                <p>Live Preview · Multiple Templates · PDF Download</p>
            </motion.header>

            <div className="builder-container">
                <FormPanel
                    panelTitle={uiText.formPanelTitle}
                    resumeData={resumeData}
                    generateFromDescription={generateFromDescription}
                    generationError={generationError}
                    isGenerating={isGenerating}
                    updatePersonal={updatePersonal}
                    updateSummary={updateSummary}
                    experience={resumeData.experience}
                    addExperience={addExperience}
                    updateExperience={updateExperience}
                    removeExperience={removeExperience}
                    projects={resumeData.projects || []}
                    addProject={addProject}
                    updateProject={updateProject}
                    removeProject={removeProject}
                    education={resumeData.education}
                    addEducation={addEducation}
                    updateEducation={updateEducation}
                    removeEducation={removeEducation}
                    skills={resumeData.skills}
                    addSkill={addSkill}
                    removeSkill={removeSkill}
                    languages={resumeData.languages}
                    addLanguage={addLanguage}
                    removeLanguage={removeLanguage}
                    selectedTemplate={selectedTemplate}
                    setSelectedTemplate={setSelectedTemplate}
                />

                <ResumePreview
                    panelTitle={uiText.previewPanelTitle}
                    resumeData={resumeData}
                    selectedTemplate={selectedTemplate}
                />
            </div>
        </div>
    );
}

export default App;
