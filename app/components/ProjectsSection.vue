<script setup lang="ts">
interface Project {
    name: string;
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
        description:
            "A Learning Management System (LMS) with three main areas: Student, Lecturer, and Admin portals.",
        image: "/projects/ittrenglish.png",
        year: "2025",
        techStack: ["Vue"],
        repoUrl: "https://github.com/dwipapap/cognivus-frontend",
    },
    {
        name: "Jasmine Cake & Cookies",
        description:
            "A modern website for a cake and cookies business with product showcase and ordering information.",
        image: "/projects/jasminecake.png",
        year: "2025",
        techStack: ["Next.js", "TypeScript"],
        repoUrl: "https://github.com/dwipapap/jasmine-cake-web",
        liveUrl: "https://jasminecakeandcookies.vercel.app",
    },
    {
        name: "PixelPocket",
        description:
            "A mobile app to track habits and expenses, helping users manage their daily routines and finances.",
        image: "/projects/kucingterbang.jpg",
        year: "2025",
        techStack: ["Kotlin", "Android"],
        repoUrl: "https://github.com/dwipapap/PixelPocket",
    },
];
</script>

<template>
    <section id="projects" class="py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl text-center mb-16">
                <h2
                    class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
                >
                    Projects
                </h2>
                <p
                    class="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-400"
                >
                    A list of projects I've worked on
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div
                    v-for="project in projects"
                    :key="project.name"
                    class="group relative flex flex-col overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-all hover:shadow-lg"
                >
                    <!-- Browser Header -->
                    <div
                        class="flex items-center gap-1.5 px-4 py-3 bg-gray-200/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800"
                    >
                        <div class="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                        <div class="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                        <div class="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                    </div>

                    <!-- Image Area -->
                    <div
                        class="aspect-16/10 w-full overflow-hidden bg-gray-200 dark:bg-gray-800 relative group-hover:opacity-90 transition-opacity"
                    >
                        <NuxtImg
                            :src="project.image"
                            :alt="project.name"
                            class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                    </div>

                    <!-- Content Footer -->
                    <div
                        class="flex flex-col flex-1 p-5 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50"
                    >
                        <div class="flex items-start justify-between mb-2">
                            <div>
                                <h3
                                    class="font-bold text-gray-900 dark:text-white text-lg"
                                >
                                    {{ project.name }}
                                </h3>
                                <span
                                    class="text-xs font-medium text-gray-500 dark:text-gray-400"
                                >
                                    {{ project.year }}
                                </span>
                            </div>

                            <div class="flex gap-2">
                                <UButton
                                    v-if="project.liveUrl"
                                    :to="project.liveUrl"
                                    target="_blank"
                                    icon="i-lucide-globe"
                                    variant="ghost"
                                    color="neutral"
                                    size="xs"
                                    aria-label="View live demo"
                                />
                                <UButton
                                    :to="project.repoUrl"
                                    target="_blank"
                                    icon="i-lucide-arrow-up-right"
                                    variant="ghost"
                                    color="neutral"
                                    size="xs"
                                    aria-label="View repository"
                                />
                            </div>
                        </div>

                        <p
                            class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 flex-1"
                        >
                            {{ project.description }}
                        </p>

                        <!-- Tech Stack -->
                        <div class="flex flex-wrap gap-2 mt-auto">
                            <span
                                v-for="tech in project.techStack"
                                :key="tech"
                                class="inline-flex items-center rounded-md bg-gray-50 dark:bg-gray-800 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 ring-1 ring-inset ring-gray-500/10"
                            >
                                {{ tech }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
