<template>
    <div id="editor-layer">
        <div id="editor-container">
            <QuillEditor v-model:content="content" :options="options" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ref } from 'vue';

import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
hljs.configure({
    languages: ['javascript', 'ruby', 'python']
})

const toolbarOptions = [
    [{ 'header': [2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],

    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    ['link', 'image'],
    // [{ 'direction': 'rtl' }],                         // text direction
    // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    ['clean']                                         // remove formatting button
];
const options = {
    debug: 'info',
    contentType: 'html',
    bounds: '#editor-container',
    modules: {
        toolbar: toolbarOptions,
        history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true
        }
    },
    placeholder: 'Compose an epic...',
    readOnly: false,
    theme: 'snow'
}
const content = ref('<h1>This is header</h1><p>This is paragraph</p>')

</script>

<style>
.ql-editor {
    min-height: 300px;
    max-height: 600px;
}
</style>