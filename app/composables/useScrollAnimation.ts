import { ref, onMounted, onUnmounted, type ComponentPublicInstance } from 'vue';

export function useScrollAnimation(threshold = 0.2) {
    const elements = ref<HTMLElement[]>([]);
    let observer: IntersectionObserver | null = null;

    const addRef = (el: Element | ComponentPublicInstance | null) => {
        if (!el) return;

        const domEl = '$el' in el ? (el as { $el: HTMLElement }).$el : el;

        if (domEl instanceof HTMLElement && !elements.value.includes(domEl)) {
            elements.value.push(domEl);
        }
    };

    onMounted(() => {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer!.unobserve(entry.target);
                    }
                });
            },
            { threshold }
        );

        elements.value.forEach((el) => {
            if (el) observer!.observe(el);
        });
    });

    onUnmounted(() => {
        observer?.disconnect()
        observer = null
        elements.value = []
    })

    return { addRef };
}
