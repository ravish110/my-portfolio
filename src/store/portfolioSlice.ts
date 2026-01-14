import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Project {
    name: string;
    period: string;
    desc: string;
    skills?: string[];
    projectLink?: string;
}

interface Experience {
    company: string;
    role: string;
    period: string;
    desc: string;
    skills?: string[];
    projects?: Project[];
    projectLink?: string;
}

interface SkillCategory {
    title: string;
    skills: string[];
}

interface PortfolioState {
    hero: {
        name: string;
        role: string;
        experience: string;
        email: string;
        phone: string;
        location: string;
        bio: string;
    };
    skills: SkillCategory[];
    experience: Experience[];
}

const initialState: PortfolioState = {
    hero: {
        name: "Ravish Abbas",
        role: "Sr. Frontend Developer",
        experience: "9+ years",
        email: "ravish.abbas94@gmail.com",
        phone: "+91 9029666805",
        location: "Navi Mumbai, India",
        bio: "Specializing in creating visually appealing, responsive, and high-performance websites with over 9+ years of experience."
    },
    skills: [
        {
            title: "Frameworks & Libraries",
            skills: ["React.js", "Redux Toolkit", "Redux", "AngularJS", "Angular 14", "jQuery", "TypeScript", "JavaScript (ES6+)"]
        },
        {
            title: "Styling & UI",
            skills: ["HTML5", "CSS3", "SCSS", "LESS", "Bootstrap", "Material Design", "Ant Design", "PrimeNG", "Responsive Web Design"]
        },
        {
            title: "Data Visualization",
            skills: ["Chart.js", "D3.js"]
        },
        {
            title: "Tools & Others",
            skills: ["Git", "RESTful API", "Google Analytics", "SEO Optimization", "Figma", "GenAI"]
        }
    ],
    experience: [
        {
            company: "Neosoft Technologies Pvt Ltd",
            role: "Sr. Frontend Developer",
            period: "Feb 2017 - Present",
            desc: "Leading frontend development for various high-impact client projects, specializing in React.js, Angular, and modern architecture.",
            skills: ["React.js", "Angular", "Redux", "TypeScript", "Architecture"],
            projects: [
                {
                    name: "Infosys Aster Global CMO AI Hub",
                    period: "Oct 2023 - Present",
                    desc: "Developed frontend architecture using React.js and integrated AI-ML chatbots.",
                    skills: ["React.js", "AI-ML Integration", "Architecture"]
                },
                {
                    name: "Thomas Cook Pvt Ltd",
                    period: "May 2023 - Sep 2023",
                    desc: "Led development of a hotel booking portal and custom pricing calendars using React.js and Redux Toolkit.",
                    skills: ["React.js", "Redux Toolkit", "Lead"]
                },
                {
                    name: "Turtlemintmoney",
                    period: "Jan 2021 - Aug 2023",
                    desc: "Built mutual fund investment platforms using React, TypeScript, and D3.js.",
                    projectLink: "https://www.turtlemintmoney.com",
                    skills: ["React.js", "Redux", "D3.js", "TypeScript"]
                },
                {
                    name: "Turtlemint",
                    period: "Jan 2019 - Dec 2020",
                    desc: "Developed insurance products using AngularJS, Angular 14, and Material Design.",
                    projectLink: "https://www.turtlemint.com",
                    skills: ["AngularJS", "Angular 14", "Material Design"]
                },
                {
                    name: "Mintpro",
                    period: "Jan 2018 - Dec 2018",
                    desc: "Developed web pages for agent/partner platform selling insurance and mutual funds.",
                    projectLink: "https://www.turtlemintpro.com",
                    skills: ["AngularJS", "Bootstrap", "Responsive"]
                }
            ]
        },
        {
            company: "Infomatic service pvt ltd",
            role: "Frontend Developer",
            period: "Jan 2024 - Dec 2024",
            desc: "Designing adaptive layouts and intuitive UI elements. Leveraging Angular's HttpClient for API integration.",
            skills: ["Angular", "UI/UX", "API Integration"]
        },
        {
            company: "Eltizam Saudi CMS",
            role: "Frontend Developer",
            period: "Sep 2023 - Jan 2024",
            desc: "Designed and developed web pages using .NET framework ensuring seamless user experiences.",
            skills: [".NET", "Web Development"]
        },
        {
            company: "Electronics Bazaar",
            role: "Frontend Developer",
            period: "Sep 2016 - Dec 2017",
            desc: "Developed an e-commerce store for refurbished electronics from PSD designs.",
            skills: ["HTML", "CSS", "Bootstrap", "PSD to HTML"],
            projectLink: "https://www.electronicsbazaar.com"
        },
        {
            company: "Bank One",
            role: "Frontend Developer",
            period: "Jun 2017 - Aug 2017",
            desc: "Developed a website for Bank One Mauritius with responsive design and optimizations.",
            skills: ["Bootstrap", "Optimization", "Pixel Perfect"],
            projectLink: "https://www.bankone.mu"
        },
        {
            company: "River Village Resort",
            role: "Frontend Developer",
            period: "Feb 2017 - May 2017",
            desc: "Developed a website for River Village Resort using Bootstrap and slider gallery.",
            skills: ["Bootstrap", "Responsive", "Gallery"],
            projectLink: "http://www.rivervillageresort.in"
        }
    ]
};

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        updatePortfolio: (state, action: PayloadAction<Partial<PortfolioState>>) => {
            return { ...state, ...action.payload };
        }
    }
});

export const { updatePortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
