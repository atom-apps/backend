<template>
  <div>
    <PageHeader subtitle="内容管理" :back="true" :loading="loading">
      <a-button v-can="'ArticleEdit'" type="primary"
        @click="$router.push({ name: 'ArticleEdit', params: { id: route.params.id } })">编辑</a-button>

      <a-popconfirm v-can="'ArticleDelete'" content="确认删除？" type="warning" :ok-loading="deleting"
        @ok="handleConfirmDelete" position="lt">
        <a-tooltip content="删除">
          <a-button type="outline" status="danger">删除</a-button>
        </a-tooltip>
      </a-popconfirm>
    </PageHeader>

    <Container :loading="loading" :rows="2">
      <a-descriptions :data="renderData" :column="1" bordered :align="{ label: 'right' }" size="large" :title="title">
        <a-descriptions-item v-for="item of renderData" :label="getLabel(item.label)">
          <template v-if="item.label == 'dig'">
            <a-space>
              <a-tag>{{ item.value.views }}</a-tag>
              <a-tag>{{ item.value.likes }}</a-tag>
              <a-tag>{{ item.value.dislikes }}</a-tag>
            </a-space>
          </template>

          <template v-else-if="item.label == 'thumbnails'">
            <a-image-preview-group infinite>
              <a-space>
                <a-image v-for="img of item.value" :src="img.image" :width="img.width" />
              </a-space>
            </a-image-preview-group>
          </template>

          <template v-else-if="item.label == 'created_at'">{{ datetime(item.value) }}</template>
          <template v-else-if="item.label == 'updated_at'">{{ datetime(item.value) }}</template>
          <template v-else-if="item.label == 'publish_at'">{{ datetime(item.value) }}</template>
          <template v-else-if="item.label == 'content'">
            {{ item.value.free_content }}
            <a-divider />
            {{ item.value.price_content }}
          </template>

          <template v-else-if="item.label == 'forward_source'">
            <a-link target="_blank" :href="item.value.source">{{ item.value.source_author }}</a-link>
          </template>

          <template v-else-if="item.label == 'tags'">
              <a-space>
                <a-tag v-for="tag of item.value">{{ tag }}</a-tag>
              </a-space>
          </template>


          <template v-else>{{ item.value }}</template>
        </a-descriptions-item>

      </a-descriptions>
    </Container>
  </div>
</template>

<script lang="ts" setup>
import {
ArticleItem,
deleteArticleItem,
getArticleItem,
tableArticleLabels,
} from "@/api/posts/articles";
import { Container, PageHeader } from "@/components/layout";
import useDatetime from "@/hooks/datetime";
import useLoading from "@/hooks/loading";
import { DescData, Message } from "@arco-design/web-vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const { date, datetime, beforeNow, afterNow } = useDatetime();

const route = useRoute();
const router = useRouter();

const title = ref<string>("Title");

const { loading, setLoading } = useLoading();
const renderData = ref<DescData[]>([]);
const itemInfo = ref<ArticleItem>({});
const labels = tableArticleLabels();
const getLabel = (key: any) => {
  if (Object.prototype.hasOwnProperty.call(labels, String(key))) {
    return labels[String(key)]
  }
  return key
}

const fetchData = async () => {
  try {
    setLoading(true);
    const { data: profile } = await getArticleItem(Number(route.params.id));
    itemInfo.value = profile;

    let items: DescData[] = [];
    for (const key in profile) {
      items.push({ label: key, value: profile[key] });

    }
    renderData.value = items;
  } catch (e) {
  } finally {
    setLoading(false);
  }
};
onMounted(() => {
  fetchData();
});

// handle delete
const { loading: deleting, setLoading: setDeleting } = useLoading();

const handleConfirmDelete = async () => {
  try {
    setDeleting(true);
    await deleteArticleItem(Number(route.params.id));

    Message.success("删除成功");
    router.back();
  } catch (e) {
    console.log(e);
  } finally {
    setDeleting(false);
  }
};
</script>
