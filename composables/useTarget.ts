import { Ref } from 'vue'

export const useTarget = () => {
    const target: Ref<HTMLImageElement | null> = ref(null)
    const timeSum: Ref<number> = ref(0)
    const rounds: Ref<number> = ref(-1)
    const startTime: Ref<Date | number> = ref(0)

    const avgTime = computed(() => (timeSum.value / rounds.value || 0).toFixed(2))

    const start = () => {
        rounds.value++
        nextTick(() => {
            setPosition()
            startTime.value = new Date()
        })
    }

    const randomValue = (max) => Math.floor(Math.random() * (max + 1))

    const setPosition = () => {
        const maxWidth = window.innerWidth - target.value.width - 30
        const maxHeight = window.innerHeight - target.value.height - 30
        target.value.style.top = `${ randomValue(maxHeight) }px`
        target.value.style.left = `${ randomValue(maxWidth) }px`
    }

    const onClick = () => {
        // valueOf() is needed due to TS-compiler
        timeSum.value += new Date().valueOf() - startTime.value.valueOf()
        rounds.value++
        setPosition()
        startTime.value = new Date()
    }

    const reload = () => {
        timeSum.value = 0
        rounds.value = -1
        startTime.value = 0
    }

    return {
        rounds,
        start,
        avgTime,
        reload,
        onClick,
        target,
    }
}
