<template>
  <div>
    <PageHeader subtitle="内容管理" :back="true" :loading="false" />

    <Container class="pt-5">
      <a-form size="large" :model="form" @submit="handleSubmit" layout="vertical">
        <!-- form start -->
        <FormItems :form="form" />
        <a-form-item>
          <a-button type="primary" html-type="submit" size="large" :loading="submitting">提交</a-button>
        </a-form-item>
        <!-- form end -->
      </a-form>
    </Container>
  </div>
</template>

<script lang="ts" setup>
import { ArticleForm, ArticlePriceType, createArticleItem } from '@/api/posts/articles';
import { Container, PageHeader } from '@/components/layout';
import useLoading from '@/hooks/loading';
import { Message } from '@arco-design/web-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FormItems from './form-items.vue';

const router = useRouter();

const form = ref<ArticleForm>({
  book_id: 0,
  chapter_id: 0,
  category_id: 0,
  publish_at: new Date(),
  type: 0,
  format: 0,
  title: '',
  keyword: '',
  keywords: [],
  description: '',
  weight: 0,
  thumbnails: [],
  videos: [],
  audios: [],
  dig: {
    views: 0,
    likes: 0,
    dislikes: 0
  },
  content: {
    free_content: "",
    price_content: "",
  },
  forward_source: {
    source: '',
    source_author: ''
  },
  payments: [
    {
      price_type: ArticlePriceType.Content,
      token: "",
      price: 1800,
      discount: 80,
      discount_start_at: new Date(),
      discount_end_at: new Date(),
    },
    {
      price_type: ArticlePriceType.Attachment,
      token: "",
      price: 1800,
      discount: 80,
      discount_start_at: new Date(),
      discount_end_at: new Date(),
    }
  ],
  attachments: [
    { filesystem_id: 1, description: "", password: "" },
  ],
  tags: []
});

const { loading: submitting, setLoading: setSubmitting } = useLoading()
// form
const handleSubmit = async ({ values, errors }: any) => {
  if (!!errors) return;
  try {
    setSubmitting(true);
    await createArticleItem(values);

    Message.success("创建成功");
    router.back();
  } catch (e: any) {
    // Message.error(e.message)
  } finally {
    setSubmitting(false)
  }
};
</script>