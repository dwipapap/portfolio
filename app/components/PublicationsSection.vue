<script setup lang="ts">
interface PublicationMetric {
    label: string;
    value: string;
    detail: string;
}

const publication = {
    title: "Empirical CPU-Memory Benchmarking for Long-Read Genome Assembly Resource Optimization in High-Performance Computing",
    venue: "Journal of Information Systems and Informatics",
    issue: "Vol. 8 No. 3, June 2026",
    publishedAt: "June 22, 2026",
    authors: ["Fatayat", "Tisha Melia", "Dwipa Amedihardjo"],
    doi: "10.63158/journalisi.v8i3.1602",
    paperUrl: "https://journal-isi.org/index.php/isi/article/view/1602",
    doiUrl: "https://doi.org/10.63158/journalisi.v8i3.1602",
    summary:
        "Empirical benchmarking study for Acacia crassicarpa long-read genome assembly on HPC infrastructure, comparing CPU and memory allocations managed through Slurm to find a balanced resource configuration.",
    tags: ["HPC", "Slurm", "Genome Assembly", "BUSCO", "Resource Optimization"],
};

const metrics: PublicationMetric[] = [
    {
        label: "Scenarios",
        value: "9",
        detail: "CPU and RAM combinations tested",
    },
    {
        label: "Optimal config",
        value: "64C / 64GB",
        detail: "Balanced runtime and efficiency",
    },
    {
        label: "Completeness",
        value: "99.8%",
        detail: "BUSCO genome completeness",
    },
    {
        label: "N50",
        value: "7.8 Mb",
        detail: "Assembly continuity under scenario 2",
    },
];

const { addRef } = useScrollAnimation();
</script>

<template>
    <section id="publications" class="py-16 overflow-hidden">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
                :ref="addRef"
                class="scroll-animate mb-10 max-w-2xl"
            >
                <div class="flex items-center gap-3 text-purple-700 dark:text-purple-400 mb-3">
                    <UIcon name="i-lucide-scroll-text" class="size-5" />
                    <span class="text-sm font-semibold">Published Research</span>
                </div>
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                    Publications
                </h2>
                <p class="mt-3 text-lg leading-8 text-gray-600 dark:text-gray-400">
                    Peer-reviewed work that connects bioinformatics, infrastructure, and practical resource planning.
                </p>
            </div>

            <article
                :ref="addRef"
                class="scroll-animate grid gap-8 rounded-2xl border border-gray-100 bg-gray-50/90 p-5 shadow-sm sm:p-6 lg:grid-cols-[1.25fr_0.75fr] lg:p-8 dark:border-gray-800 dark:bg-gray-800/50"
            >
                <div class="flex flex-col">
                    <div class="mb-5 flex flex-wrap gap-2">
                        <UBadge
                            v-for="tag in publication.tags"
                            :key="tag"
                            color="neutral"
                            variant="outline"
                            size="sm"
                            class="rounded-full"
                        >
                            {{ tag }}
                        </UBadge>
                    </div>

                    <h3 class="max-w-3xl text-xl font-bold leading-tight text-gray-900 sm:text-2xl dark:text-white">
                        {{ publication.title }}
                    </h3>

                    <div class="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <p class="font-medium text-gray-800 dark:text-gray-200">
                            {{ publication.venue }}
                        </p>
                        <p>{{ publication.issue }}. Published {{ publication.publishedAt }}.</p>
                        <p>
                            Authors:
                            <span class="text-gray-800 dark:text-gray-200">
                                {{ publication.authors.join(', ') }}
                            </span>
                        </p>
                        <p>
                            DOI:
                            <ULink
                                :to="publication.doiUrl"
                                target="_blank"
                                inactive-class="font-medium text-purple-700 hover:opacity-75 dark:text-purple-400"
                            >
                                {{ publication.doi }}
                            </ULink>
                        </p>
                    </div>

                    <p class="mt-5 max-w-3xl text-base leading-7 text-gray-700 dark:text-gray-300">
                        {{ publication.summary }}
                    </p>

                    <div class="mt-6 flex flex-wrap gap-3">
                        <UButton
                            :to="publication.paperUrl"
                            target="_blank"
                            icon="i-lucide-file-text"
                            color="neutral"
                            variant="solid"
                            class="rounded-full"
                        >
                            Read paper
                        </UButton>
                        <UButton
                            :to="publication.doiUrl"
                            target="_blank"
                            icon="i-lucide-external-link"
                            color="neutral"
                            variant="outline"
                            class="rounded-full"
                        >
                            Open DOI
                        </UButton>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-3 self-start sm:gap-4 lg:grid-cols-1">
                    <div
                        v-for="metric in metrics"
                        :key="metric.label"
                        class="rounded-xl border border-gray-200 bg-white/70 p-4 dark:border-gray-700 dark:bg-gray-900/40"
                    >
                        <div class="text-xs font-semibold text-gray-500 dark:text-gray-400">
                            {{ metric.label }}
                        </div>
                        <div class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                            {{ metric.value }}
                        </div>
                        <div class="mt-1 text-sm leading-5 text-gray-600 dark:text-gray-400">
                            {{ metric.detail }}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>
