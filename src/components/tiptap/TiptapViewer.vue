<script setup lang="ts">
  import Image from '@tiptap/extension-image';
  import Link from '@tiptap/extension-link';
  import StarterKit from '@tiptap/starter-kit';
  import { useEditor, EditorContent } from '@tiptap/vue-3';

  const props = withDefaults(
    defineProps<{
      content: string;
    }>(),
    {
      content: '',
    },
  );

  const editor = useEditor({
    content: props.content,
    extensions: [StarterKit, Link, Image],
    editable: false,
  });
</script>

<template>
  <div v-if="editor" class="tiptap">
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<style lang="scss" src="src/css/tiptap.scss"></style>
