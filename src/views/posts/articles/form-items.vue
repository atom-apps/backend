<template>
  <a-form-item field="tenant_id" label="租户ID" :rules="[{required:true,message:'租户ID必填'}]">
    <a-input-number v-model="form.tenant_id" placeholder="请输入租户ID" />
  </a-form-item>

          
  <a-form-item field="user_id" label="用户ID" :rules="[{required:true,message:'用户ID必填'}]">
    <a-input-number v-model="form.user_id" placeholder="请输入用户ID" />
  </a-form-item>

          
  <a-form-item field="uuid" label="UUID" :rules="[{required:true,message:'UUID必填'}]">
    <a-input v-model="form.uuid" placeholder="请输入UUID" />
  </a-form-item>
  <a-form-item field="book_id" label="书ID" :rules="[{required:true,message:'书ID必填'}]">
    <a-input-number v-model="form.book_id" placeholder="请输入书ID" />
  </a-form-item>

          
  <a-form-item field="chapter_id" label="章节ID" :rules="[{required:true,message:'章节ID必填'}]">
    <a-input-number v-model="form.chapter_id" placeholder="请输入章节ID" />
  </a-form-item>

          
  <a-form-item field="category_id" label="分类" :rules="[{required:true,message:'分类必填'}]">
    <a-input-number v-model="form.category_id" placeholder="请输入分类" />
  </a-form-item>

          
  <a-form-item field="publish_at" label="发布时间" :rules="[{required:true,message:'发布时间必填'}]">
    <a-input v-model="form.publish_at" placeholder="请输入发布时间" />
  </a-form-item>
  <a-form-item field="type" label="文章类型" :rules="[{required:true,message:'文章类型必填'}]">
    <a-input-number v-model="form.type" placeholder="请输入文章类型" />
  </a-form-item>

          
  <a-form-item field="format" label="文章格式" :rules="[{required:true,message:'文章格式必填'}]">
    <a-input-number v-model="form.format" placeholder="请输入文章格式" />
  </a-form-item>

          
  <a-form-item field="title" label="标题" :rules="[{required:true,message:'标题必填'}]">
    <a-input v-model="form.title" placeholder="请输入标题" />
  </a-form-item>
  <a-form-item field="keyword" label="关键词" :rules="[{required:true,message:'关键词必填'}]">
    <a-input v-model="form.keyword" placeholder="请输入关键词" />
  </a-form-item>
  <a-form-item field="description" label="简介" :rules="[{required:true,message:'简介必填'}]">
    <a-input v-model="form.description" placeholder="请输入简介" />
  </a-form-item>
  <a-form-item field="thumbnails" label="缩略图" :rules="[{required:true,message:'缩略图必填'}]">
    <a-input v-model="form.thumbnails" placeholder="请输入缩略图" />
  </a-form-item>
  <a-form-item field="videos" label="视频" :rules="[{required:true,message:'视频必填'}]">
    <a-input v-model="form.videos" placeholder="请输入视频" />
  </a-form-item>
  <a-form-item field="audios" label="音频" :rules="[{required:true,message:'音频必填'}]">
    <a-input v-model="form.audios" placeholder="请输入音频" />
  </a-form-item>
  <a-form-item field="post_ip" label="发布IP" :rules="[{required:true,message:'发布IP必填'}]">
    <a-input v-model="form.post_ip" placeholder="请输入发布IP" />
  </a-form-item>
  <a-form-item field="weight" label="权重" :rules="[{required:true,message:'权重必填'}]">
    <a-input-number v-model="form.weight" placeholder="请输入权重" />
  </a-form-item>

          
</template>

<script lang="ts" setup>
import { ArticleItem } from '@/api/posts/articles';

const props = defineProps<{
  form: ArticleItem;
}>();
</script>