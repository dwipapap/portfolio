<script setup lang="ts">
import { projects, type Project } from '~/data/projects';

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
    isProjectsOpen.value = false;
    previewProject.value = project;
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
                    invitation system, and a browser-based hardware configurator. Each one shows a different
                    side of frontend, delivery, and technical problem solving.
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
                <ProjectCard
                    :project="primaryProject"
                    variant="primary"
                    @preview="openImagePreview"
                />

                <div class="grid gap-5">
                    <ProjectCard
                        v-for="project in supportingFeaturedProjects"
                        :key="project.name"
                        :project="project"
                        variant="supporting"
                        @preview="openImagePreview"
                    />
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
                    <ProjectCard
                        v-for="project in projects"
                        :key="project.name"
                        :project="project"
                        variant="drawer"
                        :show-image="hasOpenedDrawer"
                        @preview="openImagePreview"
                    />
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
