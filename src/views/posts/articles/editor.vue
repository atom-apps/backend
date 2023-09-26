<template>
    <QuillEditor v-model:content="content" :options="options"/>
</template>


<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ref } from 'vue';

const options = () => {
    return {
        debug: 'info',
        contentType: 'html',
        modules: {
            toolbar: ['bold', 'italic', 'underline']
        },
        placeholder: 'Compose an epic...',
        readOnly: false,
        theme: 'snow'
    }
}
const content = ref('<h1>This is header</h1><p>This is paragraph</p>')

</script>

<style>
.ql-editor {
    min-height: 300px;
    max-height: 1000px;
}
</style>