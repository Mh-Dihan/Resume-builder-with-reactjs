import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilePdf, FaSpinner } from 'react-icons/fa';

const DownloadButton = ({ previewRef }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownload = async () => {
        console.log("Download button clicked"); // Debug log

        if (!previewRef || !previewRef.current) {
            console.error('Preview reference not found');
            alert('Please wait for the resume preview to load');
            return;
        }

        setIsGenerating(true);

        const element = previewRef.current;
        console.log("Element to convert:", element); // Debug log

        const opt = {
            margin: [0, 0, 0, 0],
            filename: `my_resume_${new Date().toISOString().slice(0, 10)}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                letterRendering: true,
                useCORS: true,
                scrollY: 0
            },
            pagebreak: {
                mode: ['avoid-all', 'css', 'legacy']
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            }
        };

        try {
            // Check if html2pdf is loaded
            if (typeof window.html2pdf === 'undefined') {
                throw new Error('html2pdf library not loaded. Please check your internet connection.');
            }

            console.log("Starting PDF generation...");
            // Generate and download PDF
            await window.html2pdf().set(opt).from(element).save();
            console.log("PDF downloaded successfully!");
            alert("Resume downloaded successfully!");
        } catch (error) {
            console.error('PDF generation failed:', error);
            alert('Failed to generate PDF. Error: ' + error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <motion.button
            className="download-btn"
            onClick={handleDownload}
            disabled={isGenerating}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
                background: '#10b981',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}
        >
            {isGenerating ? (
                <>
                    <FaSpinner className="spinner" style={{ animation: 'spin 1s linear infinite' }} />
                    Generating PDF...
                </>
            ) : (
                <>
                    <FaFilePdf /> Download PDF
                </>
            )}
        </motion.button>
    );
};

export default DownloadButton;
