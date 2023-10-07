<template>
  <div class="editor-fullscreen-mask" :class="{ 'fullscreen': isFullscreen }"></div>
  <div id="editor" v-if="editor" :class="{ 'fullscreen': isFullscreen }">
    <bubble-menu class="bubble-menu" :tippy-options="{ duration: 100 }" :editor="editor">
      <a-button-group>
        <a-button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
          <icon-bold />
        </a-button>
        <a-button @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }">
          <icon-italic />
        </a-button>
        <a-button @click="editor.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }">
          <icon-strikethrough />
        </a-button>
      </a-button-group>
    </bubble-menu>

    <!-- table -->
    <!-- <button @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
        insertTable
      </button>
      <button @click="editor.chain().focus().addColumnBefore().run()" :disabled="!editor.can().addColumnBefore()">
        addColumnBefore
      </button>
      <button @click="editor.chain().focus().addColumnAfter().run()" :disabled="!editor.can().addColumnAfter()">
        addColumnAfter
      </button>
      <button @click="editor.chain().focus().deleteColumn().run()" :disabled="!editor.can().deleteColumn()">
        deleteColumn
      </button>
      <button @click="editor.chain().focus().addRowBefore().run()" :disabled="!editor.can().addRowBefore()">
        addRowBefore
      </button>
      <button @click="editor.chain().focus().addRowAfter().run()" :disabled="!editor.can().addRowAfter()">
        addRowAfter
      </button>
      <button @click="editor.chain().focus().deleteRow().run()" :disabled="!editor.can().deleteRow()">
        deleteRow
      </button>
      <button @click="editor.chain().focus().deleteTable().run()" :disabled="!editor.can().deleteTable()">
        deleteTable
      </button>
      <button @click="editor.chain().focus().mergeCells().run()" :disabled="!editor.can().mergeCells()">
        mergeCells
      </button>
      <button @click="editor.chain().focus().splitCell().run()" :disabled="!editor.can().splitCell()">
        splitCell
      </button>
      <button @click="editor.chain().focus().toggleHeaderColumn().run()" :disabled="!editor.can().toggleHeaderColumn()">
        toggleHeaderColumn
      </button>
      <button @click="editor.chain().focus().toggleHeaderRow().run()" :disabled="!editor.can().toggleHeaderRow()">
        toggleHeaderRow
      </button>
      <button @click="editor.chain().focus().toggleHeaderCell().run()" :disabled="!editor.can().toggleHeaderCell()">
        toggleHeaderCell
      </button>
      <button @click="editor.chain().focus().mergeOrSplit().run()" :disabled="!editor.can().mergeOrSplit()">
        mergeOrSplit
      </button>
      <button @click="editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()"
        :disabled="!editor.can().setCellAttribute('backgroundColor', '#FAF594')">
        setCellAttribute
      </button>
      <button @click="editor.chain().focus().fixTables().run()" :disabled="!editor.can().fixTables()">
        fixTables
      </button>
      <button @click="editor.chain().focus().goToNextCell().run()" :disabled="!editor.can().goToNextCell()">
        goToNextCell
      </button>
      <button @click="editor.chain().focus().goToPreviousCell().run()" :disabled="!editor.can().goToPreviousCell()">
        goToPreviousCell
      </button> -->

    <!-- <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
        paragraph
      </button> -->

    <a-space :wrap="true" class="buttons">
      <!-- image -->
      <!-- 添加图片 -->
      <a-button @click.prevent="addImage">
        <icon-image />
      </a-button>

      <a-button-group>
        <!-- h1 -->
        <!-- <a-button @click.prevent="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
          <icon-h1 />
        </a-button> -->

        <a-button @click.prevent="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :type="editor.isActive('heading', { level: 2 }) ? 'primary' : 'secondary'">
          <icon-h2 />
        </a-button>

        <a-button @click.prevent="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :type="editor.isActive('heading', { level: 3 }) ? 'primary' : 'secondary'">
          <icon-h3 />
        </a-button>
      </a-button-group>

      <a-button-group>
        <!-- h1 -->
        <a-button @click.prevent="editor.chain().focus().toggleBold().run()"
          :type="editor.isActive('bold') ? 'primary' : 'secondary'">
          <icon-bold />
        </a-button>

        <a-button @click.prevent="editor.chain().focus().toggleItalic().run()"
          :type="editor.isActive('italic') ? 'primary' : 'secondary'">
          <icon-italic />
        </a-button>

        <a-button @click.prevent="editor.chain().focus().toggleStrike().run()"
          :type="editor.isActive('strike') ? 'primary' : 'secondary'">
          <icon-strikethrough />
        </a-button>

        <a-button @click.prevent="editor.chain().focus().toggleUnderline().run()"
          :type="editor.isActive('underline') ? 'primary' : 'secondary'">
          <icon-underline />
        </a-button>
      </a-button-group>

      <a-button-group>
        <a-button @click.prevent="editor.chain().focus().setTextAlign('left').run()"
          :type="editor.isActive({ textAlign: 'left' }) ? 'primary' : 'secondary'">
          <icon-align-left />
        </a-button>

        <a-button @click.prevent="editor.chain().focus().setTextAlign('center').run()"
          :type="editor.isActive({ textAlign: 'center' }) ? 'primary' : 'secondary'">
          <icon-align-center />
        </a-button>

        <a-button @click.prevent="editor.chain().focus().setTextAlign('right').run()"
          :type="editor.isActive({ textAlign: 'right' }) ? 'primary' : 'secondary'">
          <icon-align-right />
        </a-button>
      </a-button-group>

      <a-button @click.prevent="editor.chain().focus().toggleHighlight().run()"
        :type="editor.isActive('highlight') ? 'primary' : 'secondary'">
        <icon-highlight />
      </a-button>

      <a-button-group>
        <!-- code -->
        <a-button @click.prevent="editor.chain().focus().toggleCodeBlock().run()"
          :type="editor.isActive('codeBlock') ? 'primary' : 'secondary'">
          <icon-code />
        </a-button>
        <!-- blackquote -->
        <a-button @click.prevent="editor.chain().focus().toggleBlockquote().run()"
          :type="editor.isActive('blockquote') ? 'primary' : 'secondary'">
          <icon-quote />
        </a-button>
      </a-button-group>

      <a-button @click.prevent="fullscreen" :type="isFullscreen ? 'primary' : 'secondary'">
        <icon-fullscreen-exit v-if="isFullscreen" />
        <icon-fullscreen v-else />
      </a-button>
    </a-space>

    <editor-content :editor="editor" />
  </div>
</template>

<script>
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import StarterKit from '@tiptap/starter-kit';
import { BubbleMenu, Editor, EditorContent } from '@tiptap/vue-3';

import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';

import Blockquote from '@tiptap/extension-blockquote';
import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import Image from '@tiptap/extension-image';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';

export default {
  methods: {
    addImage() {
      const url = window.prompt('URL')

      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run()
      }
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Highlight,
        Typography,

        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,

        Document,
        Paragraph,
        Text,
        Image,
        Dropcursor,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Blockquote,
      ],
      content: this.modelValue,
      onUpdate: () => {
        this.$emit('update:modelValue', this.editor.getHTML())
      },
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },


  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      editor: null,
    }
  },

  watch: {
    modelValue(value) {
      if (this.editor.getHTML() === value) {
        return
      }
      this.editor.commands.setContent(value, false)
    },
  },
  components: {
    EditorContent,
    BubbleMenu,
  },
}
</script>

<script setup>
import { ref } from "vue";

const isFullscreen = ref(false)

const fullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}
</script>


<style lang="scss">
.editor-fullscreen-mask {
  display: none;
  position: fixed;

  &.fullscreen {
    display: block;
    background-color: gray;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}

#editor.fullscreen {
  position: fixed;
  z-index: 10000;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;
  height: 100vh;
  background-color: #fdfdfd;
  overflow: hidden;

  .buttons {
    padding: 1.25rem;
    padding-left: 5rem;
    padding-right: 5rem;
  }

  .tiptap {
    padding: 5rem;
    border: none;
    position: absolute;
    left: 0;
    top: 5rem;
    bottom: 3rem;
    right: 0;
    margin-right: -15px;
    overflow-y: auto;
  }
}


/* Basic editor styles */
.tiptap {
  @apply m-0 p-5 outline-none border border-solid border-gray-100;

  min-height: 300px;
  max-height: 500px;
  overflow-y: auto;

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
    margin-inline: 0;
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}

/* Table-specific styling */
.tiptap {
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      >* {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }

    p {
      margin: 0;
    }
  }
}

.tableWrapper {
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
</style>