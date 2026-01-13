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
];

const { addRef } = useScrollAnimation();
</script>

<template>
    <section id="projects" class="py-24 sm:py-32 overflow-hidden">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <!-- Section Header -->
            <div class="mx-auto max-w-2xl text-center mb-20">
                <h2
                    class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
                >
                    Projects
                </h2>
                <p
                    class="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-400"
                >
                    Selected works and experiments
                </p>
            </div>

            <!-- Projects Grid - 2 column layout -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                <div
                    v-for="(project, index) in projects"
                    :key="project.name"
                    :ref="addRef"
                    class="flex flex-col scroll-animate"
                    :style="{ transitionDelay: `${index * 0.1}s` }"
                >
                    <!-- Image Column -->
                    <div class="relative group mb-6">
                        <!-- Image Container -->
                        <div
                            class="relative rounded-xl overflow-hidden shadow-lg transition-transform duration-500 hover:-translate-y-1"
                        >
                            <div
                                class="relative aspect-video w-full overflow-hidden bg-gray-200 dark:bg-gray-800"
                            >
                                <NuxtImg
                                    :src="project.image"
                                    :alt="project.name"
                                    class="h-full w-full object-cover object-top"
                                    loading="lazy"
                                />

                                <!-- Gradient Overlay for Badges -->
                                <div
                                    class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"
                                />

                                <!-- Tech Stack Badges -->
                                <div
                                    class="absolute bottom-4 left-4 flex flex-wrap gap-2"
                                >
                                    <UBadge
                                        v-for="tech in project.techStack"
                                        :key="tech"
                                        color="neutral"
                                        variant="solid"
                                        class="backdrop-blur-md bg-black/50 text-white border-white/10"
                                    >
                                        {{ tech }}
                                    </UBadge>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Text Column -->
                    <div class="flex flex-col justify-center">
                        <!-- Title & Subtitle -->
                        <div class="flex flex-wrap items-baseline gap-x-3 mb-4">
                            <h3
                                class="text-2xl font-bold text-gray-900 dark:text-white"
                            >
                                {{ project.name }}
                            </h3>
                            <span
                                v-if="project.subtitle"
                                class="text-lg text-gray-500 dark:text-gray-400"
                            >
                                {{ project.subtitle }}
                            </span>
                        </div>

                        <!-- Description -->
                        <p
                            class="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-4"
                        >
                            {{ project.description }}
                        </p>

                        <!-- Action Link -->
                        <div>
                            <ULink
                                :to="project.liveUrl || project.repoUrl"
                                target="_blank"
                                inactive-class="text-gray-900 dark:text-white font-medium border-b border-gray-900 dark:border-white hover:opacity-70 transition-opacity pb-0.5"
                            >
                                see project
                            </ULink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
