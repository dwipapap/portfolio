export interface Project {
    name: string;
    subtitle: string;
    role: string;
    description: string;
    impact: string;
    image: string;
    year: string;
    techStack: string[];
    highlights: string[];
    repoUrl?: string;
    liveUrl?: string;
    featured?: boolean;
}

export const projects: Project[] = [
    {
        name: "ITTREnglish LMS",
        subtitle: "Learning Management System",
        role: "Frontend Developer",
        description:
            "A multi-role learning platform for students, lecturers, and administrators, designed to make course activity and academic resources easier to manage.",
        impact: "Built the user-facing LMS experience for role-based education workflows.",
        image: "/projects/lms.webp",
        year: "2025",
        techStack: ["Vue.js", "Tailwind"],
        highlights: [
            "Structured separate flows for student, lecturer, and admin users.",
            "Designed responsive screens around learning resources and communication.",
            "Focused the interface on repeatable academic tasks, not one-off pages.",
        ],
        repoUrl: "https://github.com/dwipapap/cognivus-frontend",
        featured: true,
    },
    {
        name: "Undangan Nikah",
        subtitle: "Wedding Invitation Platform",
        role: "Full-stack Developer",
        description:
            "A Next.js invitation website with Supabase-backed admin features for managing guest-facing invitation content.",
        impact: "Delivered a polished event website with a maintainable admin workflow.",
        image: "/projects/portoundangan.webp",
        year: "2026",
        techStack: ["Next.js", "Supabase"],
        highlights: [
            "Built the public invitation experience with a clean mobile-first layout.",
            "Connected Supabase so content can be managed without editing code.",
            "Balanced visual presentation with practical admin needs.",
        ],
        repoUrl: "https://github.com/dwipapap/undangan-nikah",
        featured: true,
    },
    {
        name: "Acacia Crassicarpa Genome Sequence",
        subtitle: "Bioinformatics Research Pipeline",
        role: "Researcher",
        description:
            "Genome research work using Linux-based tooling for read quality control, genome assembly, and gene family identification.",
        impact: "Applied HPC and command-line workflows to support genome analysis research.",
        image: "/projects/genome.webp",
        year: "2025",
        techStack: ["Linux", "HPC", "Bash Script"],
        highlights: [
            "Used NanoPlot for sequencing read quality control.",
            "Ran NextDenovo for genome assembly workflow exploration.",
            "Used BUSCO to evaluate gene family completeness.",
        ],
    },
    {
        name: "Jasmine Cake",
        subtitle: "E-commerce Platform",
        role: "Frontend Developer",
        description:
            "A responsive e-commerce website for a boutique bakery with product browsing, ordering flow, and inventory-oriented admin screens.",
        impact: "Turned bakery product information into a clearer online buying experience.",
        image: "/projects/jasminecake.webp",
        year: "2025",
        techStack: ["Next.js", "TypeScript", "Tailwind"],
        highlights: [
            "Created a product showcase for browsing bakery items.",
            "Built responsive pages for mobile and desktop customers.",
            "Prepared admin-facing flows for managing shop content.",
        ],
        repoUrl: "https://github.com/dwipapap/jasmine-cake-web",
        liveUrl: "https://jasminecakeandcookies.vercel.app",
    },
    {
        name: "PixelPocket",
        subtitle: "Finance & Habit Tracker",
        role: "Android Developer",
        description:
            "A mobile-first Android app that combines habit tracking and expense tracking to help users read patterns in their daily behavior.",
        impact: "Explored the link between spending behavior and personal routines.",
        image: "/projects/kucingterbang.webp",
        year: "2025",
        techStack: ["Kotlin", "Android", "Room DB"],
        highlights: [
            "Modeled local data with Room DB.",
            "Designed around daily mobile input patterns.",
            "Combined two personal tracking workflows in one app.",
        ],
        repoUrl: "https://github.com/dwipapap/PixelPocket",
    },
    {
        name: "Pomodoro Timer",
        subtitle: "Portfolio Productivity Widget",
        role: "Frontend Developer",
        description:
            "A Pomodoro widget embedded into the portfolio, with work and break modes for focused sessions.",
        impact: "Added an interactive personal touch without leaving the portfolio page.",
        image: "/projects/pomodoro.webp",
        year: "2026",
        techStack: ["Vue.js", "Nuxt UI"],
        highlights: [
            "Built timer controls and session modes.",
            "Kept the widget compact enough to support the main portfolio flow.",
            "Used the feature to show personality and UI interaction craft.",
        ],
    },
    {
        name: "Nota PO Excel",
        subtitle: "Purchase Order Automation",
        role: "Automation Developer",
        description:
            "An Excel-based purchase order note generator using VBA macros for operational document work.",
        impact: "Automated a repetitive office workflow with a familiar tool.",
        image: "/projects/macroexcels.webp",
        year: "2026",
        techStack: ["Excel", "VBA"],
        highlights: [
            "Used VBA macro logic to reduce manual document preparation.",
            "Kept the workflow inside Excel so non-technical users can operate it.",
            "Focused on practical IT support automation.",
        ],
    },
    {
        name: "SPIRIT Mouse Configurator",
        subtitle: "Browser-based Mouse Configurator",
        role: "Creator & Developer",
        description:
            "A browser-based configurator for the Press Play SPIRIT gaming mouse using WebHID. No install, no drivers — open in Chromium browser, connect the mouse, and configure DPI, LED colors, polling rate, and button bindings.",
        impact: "Brought a Windows-only mouse configurator to the web, enabling cross-platform configuration on Linux and macOS.",
        image: "/projects/spirit.webp",
        year: "2026",
        techStack: ["Vue.js", "Vite", "PrimeVue", "WebHID"],
        highlights: [
            "Reverse-engineered HID protocol by sniffing USB packets from official software",
            "6-stage DPI (100-26000) with per-stage LED colors",
            "Button binding for 5 profiles with keyboard, mouse, multimedia functions",
            "Safety-first: unknown protocol bytes preserved, never fabricated",
        ],
        repoUrl: "https://github.com/dwipapap/SpiritMouse-Web",
        liveUrl: "https://ppmouse.dwipaa.my.id/",
        featured: true,
    },
];
