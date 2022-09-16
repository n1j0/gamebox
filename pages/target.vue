<script lang="ts" setup>
import { computed, nextTick, Ref, ref } from 'vue'

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
</script>

<template>
    <div id="app">
        <button v-if="rounds === -1" @click="start">Let's go</button>
        <template v-else-if="rounds === 5">
            <span>Finished: {{ avgTime }} ms</span>
            <button @click="reload">Restart</button>
        </template>
        <template v-else>
            <span>{{ avgTime }} ms</span>
            <img alt="Vue logo" ref="target" src="~/assets/logo.png" @click="onClick">
        </template>
    </div>
</template>

<style scoped>
#app {
    width: 100vw;
    height: 100vh;
}

img {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: auto;
}
</style>
