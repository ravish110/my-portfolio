import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePortfolio } from '../store/portfolioSlice';
import type { RootState } from '../store';
import * as pdfjsLib from 'pdfjs-dist';
import resumeFile from '../assets/resume.pdf';

// Set up worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const usePdfSync = () => {
    const dispatch = useDispatch();
    const initialState = useSelector((state: RootState) => state.portfolio);
    const hasSynced = useRef(false);

    useEffect(() => {
        const syncFromPdf = async () => {
            if (hasSynced.current) return;

            try {
                const loadingTask = pdfjsLib.getDocument(resumeFile);
                const pdf = await loadingTask.promise;
                let fullText = '';

                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map((item: any) => item.str).join(' ');
                    fullText += pageText + ' ';
                }

                // Normalize text for better matching
                const normalizedContent = fullText.toLowerCase().replace(/\s+/g, ' ');
                console.log('Normalized PDF Content Length:', normalizedContent.length);

                const updates: any = {};

                // 1. Sync Hero Experience (Years)
                const expMatch = fullText.match(/(\d+)\+?\s*years/i);
                if (expMatch) {
                    updates.hero = { ...initialState.hero, experience: `${expMatch[1]}+ years` };
                }

                // 2. Filter Experience & Projects
                const filteredExperience = initialState.experience.map(exp => {
                    const companyName = exp.company.toLowerCase();
                    const companyWords = companyName.split(' ').filter(w => w.length > 3);
                    const companyInPdf = normalizedContent.includes(companyName) ||
                        companyWords.some(word => normalizedContent.includes(word));

                    if (!companyInPdf) return null;

                    if (exp.projects) {
                        const filteredProjects = exp.projects.filter(proj => {
                            const projName = proj.name.toLowerCase();
                            const projWords = projName.split(' ').filter(w => w.length > 3);
                            return normalizedContent.includes(projName) ||
                                projWords.some(word => normalizedContent.includes(word));
                        });
                        return { ...exp, projects: filteredProjects };
                    }

                    return exp;
                }).filter(Boolean) as any[];

                if (JSON.stringify(filteredExperience) !== JSON.stringify(initialState.experience)) {
                    updates.experience = filteredExperience;
                }

                // 3. Filter Skills
                const filteredSkills = initialState.skills.map(cat => ({
                    ...cat,
                    skills: cat.skills.filter(skill => {
                        // Special handling for short skills like 'Git', 'D3.js' to avoid false positives
                        const searchStr = skill.toLowerCase();
                        if (searchStr.length < 3) return true; // Keep very short ones
                        return normalizedContent.includes(searchStr);
                    })
                })).filter(cat => cat.skills.length > 0);

                if (JSON.stringify(filteredSkills) !== JSON.stringify(initialState.skills)) {
                    updates.skills = filteredSkills;
                }

                // 4. Update Redux if changes detected
                if (Object.keys(updates).length > 0) {
                    dispatch(updatePortfolio(updates));
                    console.log('Portfolio synced from PDF:', updates);
                }

                hasSynced.current = true;

            } catch (error) {
                console.error('Failed to sync from PDF:', error);
            }
        };

        syncFromPdf();
    }, [dispatch, initialState]);
};
