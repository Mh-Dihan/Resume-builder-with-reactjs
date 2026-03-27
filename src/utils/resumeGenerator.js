import { createEmptyResumeData } from '../data/defaultResumeData';

const knownSkills = [
    'React', 'JavaScript', 'TypeScript', 'Node.js', 'Express.js', 'Python', 'Django',
    'Flask', 'Java', 'C++', 'C#', 'PHP', 'Laravel', 'SQL', 'MongoDB', 'PostgreSQL',
    'MySQL', 'HTML', 'CSS', 'HTML/CSS', 'Tailwind CSS', 'Bootstrap', 'Redux',
    'Next.js', 'Vue.js', 'Angular', 'Git', 'GitHub', 'Figma', 'UI/UX', 'REST API',
    'GraphQL', 'AWS', 'Docker', 'Kubernetes', 'Firebase', 'Jest', 'Cypress'
];

const knownLanguages = [
    'English', 'Bangla', 'Bengali', 'Hindi', 'Spanish', 'French', 'German', 'Arabic',
    'Urdu', 'Chinese', 'Japanese'
];

const sectionAliases = {
    summary: ['summary', 'professional summary', 'profile', 'about'],
    experience: ['experience', 'work experience', 'employment', 'career'],
    projects: ['projects', 'project experience', 'personal projects'],
    education: ['education', 'academic background', 'studies'],
    skills: ['skills', 'technical skills', 'core skills'],
    languages: ['languages', 'language proficiency'],
    name: ['name', 'full name'],
    title: ['job title', 'title', 'role', 'position'],
    email: ['email', 'mail'],
    phone: ['phone', 'mobile', 'contact'],
    address: ['address', 'location'],
    website: ['website', 'portfolio'],
    linkedin: ['linkedin']
};

const normalize = (value) => value.toLowerCase().replace(/\s+/g, ' ').trim();

const parseListLine = (line) => line
    .replace(/^[-*•]\s*/, '')
    .split(/[\n,|]/)
    .map(item => item.trim())
    .filter(Boolean);

const unique = (items) => [...new Set(items.filter(Boolean))];

const findLineValue = (text, aliases) => {
    const lines = text.split('\n');
    for (const rawLine of lines) {
        const line = rawLine.trim();
        const lowerLine = normalize(line);
        for (const alias of aliases) {
            const normalizedAlias = normalize(alias);
            if (lowerLine.startsWith(`${normalizedAlias}:`)) {
                return line.slice(line.indexOf(':') + 1).trim();
            }
        }
    }

    return '';
};

const getSectionBlock = (text, aliases) => {
    const escapedAliases = aliases.map(alias => alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const sectionPattern = new RegExp(
        `(?:^|\\n)(?:${escapedAliases.join('|')})\\s*:\\s*([\\s\\S]*?)(?=\\n(?:${Object.values(sectionAliases).flat().map(alias => alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\s*:|$)`,
        'i'
    );
    const match = text.match(sectionPattern);
    return match ? match[1].trim() : '';
};

const inferSummary = (text) => {
    const cleaned = text.replace(/\s+/g, ' ').trim();
    if (!cleaned) return '';
    const sentences = cleaned.match(/[^.!?]+[.!?]?/g) || [];
    return sentences.slice(0, 2).join(' ').trim();
};

const inferName = (text) => {
    const firstLine = text.split('\n').map(line => line.trim()).find(Boolean) || '';
    if (/^[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3}$/.test(firstLine)) {
        return firstLine;
    }
    return '';
};

const inferTitle = (text) => {
    const match = text.match(/\b(?:as a|working as|role as|position as|currently a|currently an)\s+([^.,\n]+)/i);
    return match ? match[1].trim() : '';
};

const extractEmail = (text) => text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || '';

const extractPhone = (text) => text.match(/(\+?\d[\d\s().-]{7,}\d)/)?.[0] || '';

const extractWebsite = (text) => text.match(/\b(?:https?:\/\/)?(?:www\.)?[a-z0-9-]+\.[a-z]{2,}(?:\/[^\s]*)?/i)?.[0] || '';

const extractLinkedIn = (text) => text.match(/\b(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[^\s]+/i)?.[0] || '';

const inferSkills = (text) => unique(
    knownSkills.filter(skill => new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(text))
);

const inferLanguages = (text) => unique(
    knownLanguages
        .filter(language => new RegExp(`\\b${language}\\b`, 'i').test(text))
        .map(language => language === 'Bengali' ? 'Bangla' : language)
);

const parseExperience = (block) => {
    if (!block) return [];

    const entries = block
        .split(/\n(?=[-*•]|\d+\.)/)
        .map(item => item.replace(/^[-*•]|\d+\./, '').trim())
        .filter(Boolean);

    return entries.map((entry, index) => {
        const [headline, ...rest] = entry.split('\n').map(line => line.trim()).filter(Boolean);
        const description = rest.join(' ');
        const atMatch = headline?.match(/^(.*?)\s+at\s+(.*?)(?:\s+\((.*?)\))?$/i);
        const dashMatch = headline?.match(/^(.*?)\s*-\s*(.*?)(?:\s*\((.*?)\))?$/i);
        const parsed = atMatch || dashMatch;

        return {
            id: Date.now() + index,
            position: parsed?.[1]?.trim() || headline || '',
            company: parsed?.[2]?.trim() || '',
            startDate: parsed?.[3]?.split(/to|-/i)?.[0]?.trim() || '',
            endDate: parsed?.[3]?.split(/to|-/i)?.[1]?.trim() || '',
            description: description || entry
        };
    });
};

const parseEducation = (block) => {
    if (!block) return [];

    const entries = block
        .split(/\n(?=[-*•]|\d+\.)/)
        .map(item => item.replace(/^[-*•]|\d+\./, '').trim())
        .filter(Boolean);

    return entries.map((entry, index) => {
        const [headline, ...rest] = entry.split('\n').map(line => line.trim()).filter(Boolean);
        const description = rest.join(' ');
        const match = headline?.match(/^(.*?)\s*-\s*(.*?)(?:\s*\((.*?)\))?$/);

        return {
            id: Date.now() + 100 + index,
            degree: match?.[1]?.trim() || headline || '',
            institution: match?.[2]?.trim() || '',
            year: match?.[3]?.trim() || '',
            description
        };
    });
};

const parseProjects = (block) => {
    if (!block) return [];

    const entries = block
        .split(/\n(?=[-*•]|\d+\.)/)
        .map(item => item.replace(/^[-*•]|\d+\./, '').trim())
        .filter(Boolean);

    return entries.map((entry, index) => {
        const [headline, ...rest] = entry.split('\n').map(line => line.trim()).filter(Boolean);
        const description = rest.join(' ');
        const match = headline?.match(/^(.*?)\s+-\s+(.*?)(?:\s*\|\s*(.*?))?$/);

        return {
            id: Date.now() + 200 + index,
            name: match?.[1]?.trim() || headline || '',
            technologies: match?.[2]?.trim() || '',
            link: match?.[3]?.trim() || '',
            description
        };
    });
};

export const generateResumeFromDescription = (description) => {
    const text = description.trim();
    if (!text) {
        throw new Error('Please enter a description before generating a resume.');
    }

    const resumeData = createEmptyResumeData();
    const summaryBlock = getSectionBlock(text, sectionAliases.summary);
    const skillsBlock = getSectionBlock(text, sectionAliases.skills);
    const languagesBlock = getSectionBlock(text, sectionAliases.languages);
    const experienceBlock = getSectionBlock(text, sectionAliases.experience);
    const projectsBlock = getSectionBlock(text, sectionAliases.projects);
    const educationBlock = getSectionBlock(text, sectionAliases.education);

    resumeData.personal.fullName = findLineValue(text, sectionAliases.name) || inferName(text);
    resumeData.personal.jobTitle = findLineValue(text, sectionAliases.title) || inferTitle(text);
    resumeData.personal.email = findLineValue(text, sectionAliases.email) || extractEmail(text);
    resumeData.personal.phone = findLineValue(text, sectionAliases.phone) || extractPhone(text);
    resumeData.personal.address = findLineValue(text, sectionAliases.address);
    resumeData.personal.website = findLineValue(text, sectionAliases.website) || extractWebsite(text);
    resumeData.personal.linkedin = findLineValue(text, sectionAliases.linkedin) || extractLinkedIn(text);

    resumeData.summary = summaryBlock || inferSummary(text);
    resumeData.skills = unique([
        ...parseListLine(skillsBlock),
        ...inferSkills(text)
    ]);
    resumeData.languages = unique([
        ...parseListLine(languagesBlock),
        ...inferLanguages(text)
    ]);
    resumeData.experience = parseExperience(experienceBlock);
    resumeData.projects = parseProjects(projectsBlock);
    resumeData.education = parseEducation(educationBlock);

    if (!resumeData.personal.fullName && !resumeData.summary && resumeData.skills.length === 0) {
        throw new Error('The description did not contain enough resume details to generate a result.');
    }

    return resumeData;
};
