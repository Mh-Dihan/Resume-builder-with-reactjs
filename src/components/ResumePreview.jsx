import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Template1 from './Template1';
import Template2 from './Template2';
import Template3 from './Template3';
import DownloadButton from './DownloadButton';

const ResumePreview = ({ panelTitle, resumeData, selectedTemplate }) => {
    const previewRef = useRef(null);

    const renderTemplate = () => {
        switch (selectedTemplate) {
            case 'template1':
                return <Template1 data={resumeData} />;
            case 'template2':
                return <Template2 data={resumeData} />;
            case 'template3':
                return <Template3 data={resumeData} />;
            default:
                return <Template1 data={resumeData} />;
        }
    };

    return (
        <motion.div
            className="preview-panel"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="preview-header">
                <h3><i className="fas fa-eye"></i> {panelTitle}</h3>
                <DownloadButton previewRef={previewRef} />
            </div>
            <div className="preview-container">
                <div className="resume-page-shell" ref={previewRef}>
                    {renderTemplate()}
                </div>
            </div>
        </motion.div>
    );
};

export default ResumePreview;
