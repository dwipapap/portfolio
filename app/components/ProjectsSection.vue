<script setup lang="ts">
interface Project {
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

const projects: Project[] = [
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
        image: "/projects/portoundangan.png",
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
        image: "/projects/genome.png",
        year: "2025",
        techStack: ["Linux", "HPC", "Bash Script"],
        highlights: [
            "Used NanoPlot for sequencing read quality control.",
            "Ran NextDenovo for genome assembly workflow exploration.",
            "Used BUSCO to evaluate gene family completeness.",
        ],
        featured: true,
    },
    {
        name: "Jasmine Cake",
        subtitle: "E-commerce Platform",
        role: "Frontend Developer",
        description:
            "A responsive e-commerce website for a boutique bakery with product browsing, ordering flow, and inventory-oriented admin screens.",
        impact: "Turned bakery product information into a clearer online buying experience.",
        image: "/projects/jasminecake.png",
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
        image: "/projects/kucingterbang.jpg",
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
        image: "/projects/pomodoro.png",
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
        image: "/projects/macroexcels.png",
        year: "2026",
        techStack: ["Excel", "VBA"],
        highlights: [
            "Used VBA macro logic to reduce manual document preparation.",
            "Kept the workflow inside Excel so non-technical users can operate it.",
            "Focused on practical IT support automation.",
        ],
    },
];

useScrollAnimation();

const featuredProjects = projects.filter((project) => project.featured);
const primaryProject = featuredProjects[0];
const supportingFeaturedProjects = featuredProjects.slice(1);

const isProjectsOpen = useState("projects-drawer-open", () => false);
const projectsDirection = useState<"left" | "bottom">("projects-drawer-direction", () => "bottom");
const hasOpenedDrawer = ref(false);
const previewProject = ref<Project | null>(null);

const isImagePreviewOpen = computed({
    get: () => Boolean(previewProject.value),
    set: (isOpen: boolean) => {
        if (!isOpen) {
            previewProject.value = null;
        }
    },
});

watch(isProjectsOpen, (isOpen) => {
    if (isOpen) {
        hasOpenedDrawer.value = true;
    }
});

function openProjectsDrawer() {
    projectsDirection.value = "bottom";
    isProjectsOpen.value = true;
}

function openImagePreview(project: Project) {
    previewProject.value = project;
}

function getProjectLink(project: Project) {
    return project.liveUrl || project.repoUrl;
}

function getProjectLinkLabel(project: Project) {
    if (project.liveUrl) {
        return "Live demo";
    }

    if (project.repoUrl) {
        return "Source code";
    }

    return "Private project";
}
</script>

<template>
    <section id="projects" class="py-16 overflow-hidden">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-3xl text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                    Projects that show how I work
                </h2>
                <p class="mt-4 text-base leading-8 text-gray-600 dark:text-gray-400">
                    Three projects are highlighted for quick scanning: a learning platform, a client-facing
                    invitation system, and a research workflow. Each one shows a different side of frontend,
                    delivery, and technical problem solving.
                </p>

                <div class="mt-6 flex justify-center">
                    <UButton
                        icon="i-lucide-folder-open"
                        color="neutral"
                        variant="solid"
                        size="lg"
                        class="justify-center rounded-full px-5"
                        @click="openProjectsDrawer"
                    >
                        View all projects
                    </UButton>
                </div>
            </div>

            <div v-if="primaryProject" class="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
                <article
                    class="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50"
                >
                    <button
                        type="button"
                        class="group relative block aspect-[16/9] w-full overflow-hidden bg-gray-200 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 dark:bg-gray-900"
                        :aria-label="`Preview ${primaryProject.name} screenshot`"
                        @click="openImagePreview(primaryProject)"
                    >
                        <NuxtImg
                            :src="primaryProject.image"
                            :alt="`${primaryProject.name} project screenshot`"
                            class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                            sizes="sm:100vw md:60vw lg:720px"
                        />
                        <div class="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                        <div class="absolute left-4 top-4 flex flex-wrap gap-2">
                            <UBadge color="neutral" variant="solid" class="bg-black/65 text-white">
                                {{ primaryProject.year }}
                            </UBadge>
                            <UBadge color="neutral" variant="solid" class="bg-black/65 text-white">
                                {{ primaryProject.role }}
                            </UBadge>
                        </div>
                        <div
                            class="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                        >
                            <UIcon name="i-lucide-expand" class="size-3.5" />
                            Preview
                        </div>
                    </button>

                    <div class="p-5 sm:p-6">
                        <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <p class="text-sm font-medium text-purple-700 dark:text-purple-300">
                                    {{ primaryProject.subtitle }}
                                </p>
                                <h3 class="mt-1 text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                                    {{ primaryProject.name }}
                                </h3>
                            </div>
                            <UButton
                                v-if="getProjectLink(primaryProject)"
                                :to="getProjectLink(primaryProject)"
                                target="_blank"
                                icon="i-lucide-external-link"
                                color="neutral"
                                variant="outline"
                                size="sm"
                                class="shrink-0 rounded-full"
                            >
                                {{ getProjectLinkLabel(primaryProject) }}
                            </UButton>
                        </div>

                        <p class="mt-4 max-w-3xl text-sm leading-7 text-gray-600 dark:text-gray-300">
                            {{ primaryProject.description }}
                        </p>

                        <div class="mt-5 grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
                            <div class="rounded-xl bg-white p-4 dark:bg-gray-900/60">
                                <p class="text-xs font-semibold uppercase tracking-[0.08em] text-gray-500 dark:text-gray-400">
                                    Why it matters
                                </p>
                                <p class="mt-2 text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                    {{ primaryProject.impact }}
                                </p>
                            </div>

                            <ul class="space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                <li
                                    v-for="highlight in primaryProject.highlights"
                                    :key="highlight"
                                    class="flex gap-3"
                                >
                                    <UIcon
                                        name="i-lucide-check-circle"
                                        class="mt-0.5 size-4 shrink-0 text-purple-700 dark:text-purple-300"
                                    />
                                    <span>{{ highlight }}</span>
                                </li>
                            </ul>
                        </div>

                        <div class="mt-5 flex flex-wrap gap-2">
                            <UBadge
                                v-for="tech in primaryProject.techStack"
                                :key="tech"
                                color="neutral"
                                variant="soft"
                            >
                                {{ tech }}
                            </UBadge>
                        </div>
                    </div>
                </article>

                <div class="grid gap-5">
                    <article
                        v-for="project in supportingFeaturedProjects"
                        :key="project.name"
                        class="grid overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50 sm:grid-cols-[0.9fr_1.1fr] lg:grid-cols-1 xl:grid-cols-[0.85fr_1.15fr]"
                    >
                        <button
                            type="button"
                            class="group relative min-h-48 w-full overflow-hidden bg-gray-200 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 dark:bg-gray-900"
                            :aria-label="`Preview ${project.name} screenshot`"
                            @click="openImagePreview(project)"
                        >
                            <NuxtImg
                                :src="project.image"
                                :alt="`${project.name} project screenshot`"
                                class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                                sizes="sm:100vw md:45vw lg:360px"
                            />
                            <div class="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                            <UBadge
                                color="neutral"
                                variant="solid"
                                class="absolute left-3 top-3 bg-black/65 text-white"
                            >
                                {{ project.year }}
                            </UBadge>
                            <div
                                class="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full bg-black/65 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                            >
                                <UIcon name="i-lucide-expand" class="size-4" />
                            </div>
                        </button>

                        <div class="flex flex-col p-4">
                            <p class="text-xs font-medium uppercase tracking-[0.08em] text-purple-700 dark:text-purple-300">
                                {{ project.role }}
                            </p>
                            <h3 class="mt-2 text-lg font-bold leading-tight text-gray-900 dark:text-white">
                                {{ project.name }}
                            </h3>
                            <p class="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                {{ project.impact }}
                            </p>

                            <ul class="mt-4 space-y-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                <li
                                    v-for="highlight in project.highlights.slice(0, 2)"
                                    :key="highlight"
                                    class="flex gap-2"
                                >
                                    <UIcon
                                        name="i-lucide-dot"
                                        class="mt-1 size-4 shrink-0 text-purple-700 dark:text-purple-300"
                                    />
                                    <span>{{ highlight }}</span>
                                </li>
                            </ul>

                            <div class="mt-4 flex flex-wrap gap-1.5">
                                <UBadge
                                    v-for="tech in project.techStack"
                                    :key="tech"
                                    color="neutral"
                                    variant="soft"
                                    size="sm"
                                >
                                    {{ tech }}
                                </UBadge>
                            </div>

                            <ULink
                                v-if="getProjectLink(project)"
                                :to="getProjectLink(project)"
                                target="_blank"
                                inactive-class="mt-4 inline-flex w-fit items-center gap-1 border-b border-gray-900 pb-0.5 text-xs font-medium text-gray-900 transition-opacity hover:opacity-70 dark:border-white dark:text-white"
                            >
                                {{ getProjectLinkLabel(project) }}
                                <UIcon name="i-lucide-arrow-up-right" class="size-3.5" />
                            </ULink>
                            <span
                                v-else
                                class="mt-4 text-xs font-medium text-gray-500 dark:text-gray-400"
                            >
                                {{ getProjectLinkLabel(project) }}
                            </span>
                        </div>
                    </article>
                </div>
            </div>
        </div>

        <UDrawer
            v-model:open="isProjectsOpen"
            :direction="projectsDirection"
            :handle="true"
            title="All Projects"
            description="A fuller view of selected work, experiments, and practical tools."
            class="z-100"
        >
            <template #body>
                <div
                    class="grid max-h-[75vh] gap-4 overflow-y-auto p-4 sm:grid-cols-2 md:max-h-[70vh] md:p-6 xl:grid-cols-3"
                >
                    <article
                        v-for="project in projects"
                        :key="project.name"
                        class="flex min-h-full flex-col rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50"
                    >
                        <button
                            type="button"
                            class="group relative w-full overflow-hidden rounded-xl bg-gray-200 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 dark:bg-gray-800"
                            :aria-label="`Preview ${project.name} screenshot`"
                            @click="openImagePreview(project)"
                        >
                            <div class="relative aspect-[16/9]">
                                <NuxtImg
                                    v-if="hasOpenedDrawer"
                                    :src="project.image"
                                    :alt="`${project.name} project screenshot`"
                                    class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                                    loading="lazy"
                                />
                                <div class="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                                <div class="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/60 to-transparent" />
                                <div
                                    class="absolute right-2 top-2 inline-flex size-8 items-center justify-center rounded-full bg-black/65 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                                >
                                    <UIcon name="i-lucide-expand" class="size-4" />
                                </div>
                                <div class="absolute bottom-2 left-2 flex flex-wrap gap-1">
                                    <UBadge
                                        v-for="tech in project.techStack"
                                        :key="tech"
                                        color="neutral"
                                        variant="solid"
                                        size="sm"
                                        class="bg-black/60 text-white"
                                    >
                                        {{ tech }}
                                    </UBadge>
                                </div>
                            </div>
                        </button>

                        <div class="flex grow flex-col pt-4">
                            <div class="flex items-start justify-between gap-3">
                                <div>
                                    <h3 class="text-lg font-bold leading-tight text-gray-900 dark:text-white">
                                        {{ project.name }}
                                    </h3>
                                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        {{ project.role }} / {{ project.year }}
                                    </p>
                                </div>
                                <UBadge v-if="project.featured" color="primary" variant="soft" size="sm">
                                    Featured
                                </UBadge>
                            </div>

                            <p class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                {{ project.impact }}
                            </p>

                            <ULink
                                v-if="getProjectLink(project)"
                                :to="getProjectLink(project)"
                                target="_blank"
                                inactive-class="mt-auto inline-flex w-fit items-center gap-1 pt-4 text-xs font-medium text-gray-900 transition-opacity hover:opacity-70 dark:text-white"
                            >
                                {{ getProjectLinkLabel(project) }}
                                <UIcon name="i-lucide-arrow-up-right" class="size-3.5" />
                            </ULink>
                            <span
                                v-else
                                class="mt-auto pt-4 text-xs font-medium text-gray-500 dark:text-gray-400"
                            >
                                {{ getProjectLinkLabel(project) }}
                            </span>
                        </div>
                    </article>
                </div>
            </template>
        </UDrawer>

        <UModal
            v-model:open="isImagePreviewOpen"
            :title="previewProject?.name || 'Project preview'"
            :description="previewProject?.subtitle"
            :ui="{ content: 'sm:max-w-6xl', body: 'p-0 sm:p-0' }"
        >
            <template #body>
                <div v-if="previewProject" class="bg-black">
                    <img
                        :src="previewProject.image"
                        :alt="`${previewProject.name} full project screenshot`"
                        class="max-h-[78vh] w-full object-contain"
                    />
                </div>
            </template>
        </UModal>
    </section>
</template>
