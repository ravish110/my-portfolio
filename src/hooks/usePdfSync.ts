import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updatePortfolio } from '../store/portfolioSlice';
import * as pdfjsLib from 'pdfjs-dist';
import resumeFile from '../assets/resume.pdf';

// Set up worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const usePdfSync = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const syncFromPdf = async () => {
            try {
                const loadingTask = pdfjsLib.getDocument(resumeFile);
                const pdf = await loadingTask.promise;
                let fullText = '';

                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map((item: any) => item.str).join(' ');
                    fullText += pageText + '\n';
                }

                console.log('PDF Text Extracted:', fullText);

                // Heuristic Parsing (Simple Example)
                // In a production app, this would be more sophisticated
                const updates: any = {};

                // Example: Extract experience years
                const expMatch = fullText.match(/(\d+)\+?\s*years/i);
                if (expMatch) {
                    updates.hero = { experience: `${expMatch[1]}+ years` };
                }

                // If we found any updates, dispatch them
                if (Object.keys(updates).length > 0) {
                    dispatch(updatePortfolio(updates));
                }

            } catch (error) {
                console.error('Failed to sync from PDF:', error);
            }
        };

        syncFromPdf();
    }, [dispatch]);
};
