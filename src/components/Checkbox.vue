<template>
    <div class="w-5 h-5">
        <button
        v-if="!check"
        class="w-full h-full border-2 border-gray-400 rounded focus:outline-none"
        @click="tap()">
        </button>
        <button
        v-else
        class="w-full h-full border-2 border-gray-400 rounded bg-indigo-400 focus:outline-none"
        @click="tap()"></button>
    </div>
</template>

<script>
export default {
    name: 'checkbox',
    data() {
        return {
            check: false
        }
    },
    methods: {
        tap() {
            this.check = !this.check;
            this.$emit('onCheck');
        }
    }
}
</script>

<style>

</style>