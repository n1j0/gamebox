<script lang="ts" setup>
import { useTarget } from '~/composables/useTarget'

const { rounds, start, avgTime, reload, onClick, target } = useTarget()
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
