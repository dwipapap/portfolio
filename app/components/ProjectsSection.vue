<script setup lang="ts">
interface Project {
    name: string;
    subtitle?: string;
    description: string;
    image: string;
    year: string;
    techStack: string[];
    repoUrl: string;
    liveUrl?: string;
}

const projects: Project[] = [
    {
        name: "ITTREnglish LMS",
        subtitle: "Learning Management System",
        description:
            "A comprehensive Learning Management System designed to streamline educational processes. The platform features distinct portals for students, lecturers, and administrators, facilitating seamless communication and resource management.",
        image: "/projects/ittrenglish.png",
        year: "2025",
        techStack: ["Vue.js", "Tailwind"],
        repoUrl: "https://github.com/dwipapap/cognivus-frontend",
    },
    {
        name: "Jasmine Cake",
        subtitle: "E-commerce Platform",
        description:
            "A modern, responsive e-commerce website built for a boutique bakery. Features include a dynamic product showcase, seamless ordering process, and an intuitive admin dashboard for inventory management.",
        image: "/projects/jasminecake.png",
        year: "2025",
        techStack: ["Next.js", "TypeScript", "Tailwind"],
        repoUrl: "https://github.com/dwipapap/jasmine-cake-web",
        liveUrl: "https://jasminecakeandcookies.vercel.app",
    },
    {
        name: "PixelPocket",
        subtitle: "Finance & Habit Tracker",
        description:
            "A mobile-first application focused on personal development and financial health. Users can track daily habits alongside expenses, visualizing correlations between lifestyle choices and spending patterns.",
        image: "/projects/kucingterbang.jpg",
        year: "2025",
        techStack: ["Kotlin", "Android", "Room DB"],
        repoUrl: "https://github.com/dwipapap/PixelPocket",
    },
    {
        name: "Acacia Crassicarpa Genome Sequence",
        subtitle: "Researcher",
        description:
            "Researching about Acacia Crassicarpa Genome, using NanoPlot for Quality Control, NextDenovo for Genome Assembly, and BUSCO for Gene Family Identification.",
        image: "/projects/genome.png",
        year: "2025",
        techStack: ["Linux", "HPC", "Bash Script"],
        repoUrl: "https://github.com/dwipapap/PixelPocket",
    },
];

const { addRef } = useScrollAnimation();

const isProjectsOpen = useState('projects-drawer-open', () => false);
const projectsDirection = useState<'left' | 'bottom'>('projects-drawer-direction', () => 'bottom');
const hasOpenedDrawer = ref(false);

watch(isProjectsOpen, (isOpen) => {
    if (isOpen) {
        hasOpenedDrawer.value = true;
    }
});

function handleWheel(e: WheelEvent) {
    if (window.innerWidth >= 768) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            const el = e.currentTarget as HTMLElement;
            el.scrollBy({
                left: e.deltaY,
                behavior: 'auto'
            });
        }
    }
}
</script>

<template>
    <section id="projects" class="py-16 overflow-hidden">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <!-- Section Header -->
            <div class="mx-auto max-w-2xl text-center mb-10">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                    Projects
                </h2>
                <p class="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-400 mb-8">
                    Selected works and experiments
                </p>

                <!-- Big Button -->
                <UButton size="xl" variant="solid"
                    class="px-8 py-4 text-lg rounded-full bg-purple-700 hover:bg-purple-700 text-white shadow-lg"
                    @click="projectsDirection = 'bottom'; isProjectsOpen = true">
                    What I've made
                </UButton>
            </div>
        </div>

        <UDrawer v-model:open="isProjectsOpen" :direction="projectsDirection" :handle="true" title="My Projects"
            description="A collection of my recent work and experiments." class="z-100">
            <template #body>
                <div class="flex flex-col md:flex-row gap-4 md:gap-5 h-full max-h-[75vh] md:max-h-[60vh] overflow-y-auto md:overflow-y-hidden md:overflow-x-auto p-4 md:px-6 md:py-4 snap-y md:snap-x snap-mandatory scroll-smooth items-stretch [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    @wheel="handleWheel">
                    <div v-for="(project, index) in projects" :key="project.name"
                        class="flex flex-col shrink-0 w-full md:w-[320px] snap-start bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 md:p-4 border border-gray-100 dark:border-gray-800 h-full">
                        <!-- Image Column -->
                        <div class="relative group mb-4">
                            <!-- Image Container -->
                            <div
                                class="relative rounded-xl overflow-hidden shadow-sm transition-transform duration-500">
                                <div
                                    class="relative aspect-21/9 md:aspect-video w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                                    <NuxtImg v-if="hasOpenedDrawer" :src="project.image" :alt="project.name"
                                        class="h-full w-full object-cover object-top" loading="lazy" />
                                    <div
                                        class="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />

                                    <div class="absolute bottom-2 left-2 flex flex-wrap gap-1">
                                        <UBadge v-for="tech in project.techStack" :key="tech" color="neutral"
                                            variant="solid" size="sm"
                                            class="backdrop-blur-md bg-black/60 text-white border-white/10">
                                            {{ tech }}
                                        </UBadge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Text Column -->
                        <div class="flex flex-col grow">
                            <!-- Title & Subtitle -->
                            <div class="flex flex-col gap-0.5 mb-2">
                                <h3 class="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                                    {{ project.name }}
                                </h3>
                                <span v-if="project.subtitle" class="text-xs text-gray-500 dark:text-gray-400">
                                    {{ project.subtitle }}
                                </span>
                            </div>

                            <!-- Description -->
                            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 grow line-clamp-3">
                                {{ project.description }}
                            </p>

                            <!-- Action Link -->
                            <div class="mt-auto">
                                <ULink :to="project.liveUrl || project.repoUrl" target="_blank"
                                    inactive-class="text-gray-900 dark:text-white font-medium text-xs border-b border-gray-900 dark:border-white hover:opacity-70 transition-opacity pb-0.5 inline-block">
                                    see project
                                </ULink>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </UDrawer>
    </section>
</template>
