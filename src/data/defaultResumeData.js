export const createEmptyResumeData = () => ({
    personal: {
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        linkedin: ''
    },
    summary: '',
    experience: [],
    projects: [],
    education: [],
    skills: [],
    languages: []
});

export const createSampleResumeData = () => ({
    personal: {
        fullName: 'Muhaiminul Hasan Dihan',
        jobTitle: 'Senior UI Engineer',
        email: 'alex.m@resume.dev',
        phone: '+1 (555) 789-1234',
        address: 'San Francisco, CA',
        website: 'alexmorgan.dev',
        linkedin: 'linkedin.com/in/alexmorgan'
    },
    summary: 'Passionate Senior UI Engineer with 7+ years of experience building scalable, user-centric web applications. Expert in React, modern CSS frameworks, and performance optimization. Proven track record of leading frontend teams and delivering high-quality products.',
    experience: [
        {
            id: Date.now(),
            company: 'TechCorp Inc.',
            position: 'Senior Frontend Engineer',
            startDate: '2022-01',
            endDate: 'Present',
            description: 'Led frontend development for 3 major products, improved performance by 40%, mentored 5 junior developers.'
        },
        {
            id: Date.now() + 1,
            company: 'Creative Studio',
            position: 'Frontend Developer',
            startDate: '2019-03',
            endDate: '2021-12',
            description: 'Built responsive web applications, collaborated with designers, implemented component libraries.'
        }
    ],
    projects: [
        {
            id: Date.now() + 3,
            name: 'E‑Commerce Platform',
            technologies: 'React, Node.js, MongoDB',
            description: 'Built a full-stack e-commerce platform with payment integration and admin dashboard.',
            link: 'https://github.com/Mh-Dihan/Resume-builder-with-reactjs'
        },
        {
            id: Date.now() + 4,
            name: 'Portfolio Website',
            technologies: 'React, Framer Motion, Tailwind CSS',
            description: 'Created a modern portfolio website with smooth animations and responsive design.',
            link: 'https://github.com/Mh-Dihan/Resume-builder-with-reactjs'
        }
    ],
    education: [
        {
            id: Date.now() + 2,
            degree: 'B.Sc. in Computer Science',
            institution: 'University of Technology',
            year: '2015-2019',
            description: 'Graduated with Honors, GPA: 3.8/4.0'
        }
    ],
    skills: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Tailwind CSS', 'Git', 'Node.js', 'Figma'],
    languages: ['English (Native)', 'Spanish (Intermediate)']
});
