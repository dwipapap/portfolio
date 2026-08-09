<script setup lang="ts">
import type { Project } from '~/data/projects';

const props = withDefaults(
    defineProps<{
        project: Project;
        variant?: 'primary' | 'supporting' | 'drawer';
        showImage?: boolean;
    }>(),
    {
        variant: 'drawer',
        showImage: true,
    }
);

const emit = defineEmits<{ preview: [project: Project] }>();

function openPreview() {
    emit('preview', props.project);
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
    <article
        v-if="variant === 'primary'"
        class="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50"
    >
        <button
            type="button"
            class="group relative block aspect-[16/9] w-full overflow-hidden bg-gray-200 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 dark:bg-gray-900"
            :aria-label="`Preview ${project.name} screenshot`"
            @click="openPreview"
        >
            <NuxtImg
                v-if="showImage"
                :src="project.image"
                :alt="`${project.name} project screenshot`"
                class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="sm:100vw md:60vw lg:720px"
            />
            <div class="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
            <div class="absolute left-4 top-4 flex flex-wrap gap-2">
                <UBadge color="neutral" variant="solid" class="bg-black/65 text-white">
                    {{ project.year }}
                </UBadge>
                <UBadge color="neutral" variant="solid" class="bg-black/65 text-white">
                    {{ project.role }}
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
                        {{ project.subtitle }}
                    </p>
                    <h3 class="mt-1 text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                        {{ project.name }}
                    </h3>
                </div>
                <UButton
                    v-if="getProjectLink(project)"
                    :to="getProjectLink(project)"
                    target="_blank"
                    icon="i-lucide-external-link"
                    color="neutral"
                    variant="outline"
                    size="sm"
                    class="shrink-0 rounded-full"
                >
                    {{ getProjectLinkLabel(project) }}
                </UButton>
            </div>

            <p class="mt-4 max-w-3xl text-sm leading-7 text-gray-600 dark:text-gray-300">
                {{ project.description }}
            </p>

            <div class="mt-5 grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
                <div class="rounded-xl bg-white p-4 dark:bg-gray-900/60">
                    <p class="text-xs font-semibold uppercase tracking-[0.08em] text-gray-500 dark:text-gray-400">
                        Why it matters
                    </p>
                    <p class="mt-2 text-sm font-medium leading-6 text-gray-900 dark:text-white">
                        {{ project.impact }}
                    </p>
                </div>

                <ul class="space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    <li
                        v-for="highlight in project.highlights"
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
                    v-for="tech in project.techStack"
                    :key="tech"
                    color="neutral"
                    variant="soft"
                >
                    {{ tech }}
                </UBadge>
            </div>
        </div>
    </article>

    <article
        v-else-if="variant === 'supporting'"
        class="grid overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50 sm:grid-cols-[0.9fr_1.1fr] lg:grid-cols-1 xl:grid-cols-[0.85fr_1.15fr]"
    >
        <button
            type="button"
            class="group relative min-h-48 w-full overflow-hidden bg-gray-200 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 dark:bg-gray-900"
            :aria-label="`Preview ${project.name} screenshot`"
            @click="openPreview"
        >
            <NuxtImg
                v-if="showImage"
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

    <article
        v-else
        class="flex min-h-full flex-col rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50"
    >
        <button
            type="button"
            class="group relative w-full overflow-hidden rounded-xl bg-gray-200 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 dark:bg-gray-800"
            :aria-label="`Preview ${project.name} screenshot`"
            @click="openPreview"
        >
            <div class="relative aspect-[16/9]">
                <NuxtImg
                    v-if="showImage"
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
</template>
