import { useState } from 'react';

export const useResumeData = () => {
    const [resumeData, setResumeData] = useState({
        personal: {
            fullName: 'Muhaiminul Hasan Dihan',
            jobTitle: 'Senior UI Engineer',
            email: 'alex.m@resume.dev',
            phone: '+1 (555) 789-1234',
            address: 'San Francisco, CA',
            website: 'alexmorgan.dev',
            linkedin: 'linkedin.com/in/alexmorgan'
        },
        summary: 'Passionate Senior UI Engineer with 7+ years of experience building scalable, user-centric web applications.',
        experience: [],
        education: [],
        skills: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS'],
        languages: ['English (Native)']
    });

    const updatePersonal = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            personal: { ...prev.personal, [field]: value }
        }));
    };

    return { resumeData, updatePersonal };
};
