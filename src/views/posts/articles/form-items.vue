<template>
  <a-row :gutter="50">
    <a-col :span="16">
      <a-form-item field="title" label="标题" :rules="[{ required: true, message: '标题必填' }]">
        <a-input v-model="form.title" placeholder="请输入标题" />
      </a-form-item>


      <a-row :gutter="20">
        <a-col :span="8">
          <a-form-item field="category_id" label="分类" :rules="[{ required: true, message: '分类必填' }]">
            <!-- <a-input-number v-model="form.category_id" placeholder="请输入分类" /> -->
            <a-tree-select :border="true" :scrollbar="false" selectable="leaf" :loading="menuLoading" :data="treeData"
              v-model="categoryID" @change="changeCategoryID" placeholder="请选择分类" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="type" label="文章类型" :rules="[{ required: true, message: '文章类型必填' }]">
            <a-select :options="ArticleTypes" v-model="form.type" placeholder="请输入文章类型" />
          </a-form-item>
        </a-col>

        <a-col :span="8">
          <a-form-item field="format" label="文章格式" :rules="[{ required: true, message: '文章格式必填' }]">
            <a-select :options="ArticleFormats" v-model="form.format" placeholder="请输入文章格式" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-tabs class="mt-10">
        <a-tab-pane key="1">
          <template #title>图片</template>
          <a-form-item field="thumbnails" hide-label>
            <a-upload list-type="picture-card" action="/" :default-file-list="uploadImageList" image-preview />
          </a-form-item>
        </a-tab-pane>

        <a-tab-pane key="2">
          <template #title>视频</template>
          <a-row :gutter="20" v-for="(video, index) in videoList" class="mb-5">
            <a-col :span="4">
              <a-select :options="ArticleVideoProviders" v-model.lazy="videoList[index].provider" />
            </a-col>
            <a-col :span="18">
              <a-input v-model.lazy="videoList[index].url" class="w-full" />
            </a-col>
            <a-col :span="2"><a-button @click="removeVideo(index)" class="w-full" size="medium">删除</a-button></a-col>
          </a-row>
          <a-button @click="addNewVideo" class="w-full mt-5">添加新视频</a-button>
        </a-tab-pane>

        <a-tab-pane key="3">
          <template #title>音频</template>
          <a-row :gutter="20" v-for="(audio, index) in audioList" class="mb-5">
            <a-col :span="4">
              <a-select :options="ArticleAudioProviders" v-model.lazy="audioList[index].provider" />
            </a-col>
            <a-col :span="18">
              <a-input v-model.lazy="audioList[index].url" class="w-full" />
            </a-col>
            <a-col :span="2"><a-button @click="removeAudio(index)" class="w-full" size="medium">删除</a-button></a-col>
          </a-row>
          <a-button @click="addNewAudio" class="w-full mt-5">添加新视频</a-button>
        </a-tab-pane>

        <a-tab-pane key="4">
          <template #title>文件</template>
          <a-form-item field="attachments" hide-label>
            <!-- <a-input v-model="form.audios" /> -->
          </a-form-item>
        </a-tab-pane>
      </a-tabs>


      <a-tabs class="mt-10">
        <a-tab-pane key="1">
          <template #title>免费内容</template>
          <a-form-item field="content.free_content" hide-label :rules="[{ required: true, message: '内容必填' }]">
            <a-textarea v-model="form.content.free_content" placeholder="请输入内容" />
          </a-form-item>
        </a-tab-pane>

        <a-tab-pane key="2">
          <template #title>付费内容</template>
          <a-form-item field="content.price_content" hide-label :rules="[{ required: true, message: '内容必填' }]">
            <a-textarea v-model="form.content.price_content" placeholder="请输入付费内容" />
          </a-form-item>
        </a-tab-pane>
      </a-tabs>


      <div class="pt-10 article-collapse">
        <a-collapse :default-active-key="['1']">
          <a-collapse-item header="付费" key="1">
            <a-table :columns="paymentColumns()" :data="form.payments" :pagination="false" id="price-table">
              <template #price_type="{ record }">
                <span v-if="record.price_type == ArticlePriceType.Content">内容</span>
                <span v-else-if="record.price_type == ArticlePriceType.Attachment">附件</span>
                <span v-else>未知</span>
              </template>

              <template #token="{ rowIndex, record }">
                <a-form-item field="payments[rowIndex].token" hide-label>
                  <a-input v-model="form.payments[rowIndex].token" />
                </a-form-item>
              </template>

              <template #price="{ rowIndex, record }">
                <a-form-item field="payments[rowIndex].price" hide-label>
                  <a-input-number v-model="form.payments[rowIndex].price" hide-button>
                    <template #suffix>分</template>
                  </a-input-number>
                </a-form-item>
              </template>

              <template #discount="{ rowIndex, record }">
                <a-form-item field="payments[rowIndex].discount" hide-label>
                  <a-input-number v-model="form.payments[rowIndex].discount" :min="1" :max="100" hide-button>
                    <template #suffix>%</template>
                  </a-input-number>
                </a-form-item>
              </template>

              <template #discount_start_at="{ rowIndex, record }">
                <a-form-item field="payments[rowIndex].discount_start_at" hide-label>
                  <a-date-picker format="YYYY-MM-DD HH" show-time v-model="form.payments[rowIndex].discount_start_at" />
                </a-form-item>
              </template>

              <template #discount_end_at="{ rowIndex, record }">
                <a-form-item field="payments[rowIndex].discount_end_at" hide-label>
                  <a-date-picker format="YYYY-MM-DD HH" show-time v-model="form.payments[rowIndex].discount_end_at" />
                </a-form-item>
              </template>


            </a-table>
          </a-collapse-item>
        </a-collapse>

      </div>

    </a-col>


    <a-col :span="8" class="article-collapse">
      <a-collapse :default-active-key="['1']">
        <a-collapse-item header="信息" key="1">
          <a-form-item field="tags" label="标签" :rules="[{ required: true, message: '标签必填' }]">
            <a-input-tag v-model="form.tags" unique-value placeholder="请输入标签" />
          </a-form-item>

          <a-form-item field="keywords" label="关键词" :rules="[{ required: true, message: '关键词必填' }]">
            <a-input-tag v-model="form.keywords" unique-value placeholder="请输入关键词" />
          </a-form-item>

          <a-form-item field="description" label="简介" :rules="[{ required: true, message: '简介必填' }]">
            <a-textarea v-model="form.description" placeholder="请输入简介" :max-length="120" show-word-limit />
          </a-form-item>
        </a-collapse-item>

        <a-collapse-item header="发布" :key="2">
          <a-row :gutter="20">
            <a-col :span="12">
              <a-form-item field="publish_at" label="发布时间" :rules="[{ required: true, message: '发布时间必填' }]">
                <a-date-picker show-time format="YYYY-MM-DD HH:mm" v-model="form.publish_at" placeholder="请输入发布时间" />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item field="weight" label="权重" :rules="[{ required: true, message: '权重必填' }]">
                <a-input-number v-model="form.weight" placeholder="请输入权重" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-collapse-item>

        <a-collapse-item header="Dig" key="3">
          <a-row :gutter="20">
            <a-col :span="8">
              <a-form-item field="dig.weight" label="阅读数">
                <a-input-number v-model="form.dig.views" />
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item field="dig.likes" label="喜欢">
                <a-input-number v-model="form.dig.likes" />
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item field="dig.dislikes" label="喜欢">
                <a-input-number v-model="form.dig.dislikes" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-collapse-item>

      </a-collapse>

    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { ArticleAudio, ArticleAudioProvider, ArticleAudioProviders, ArticleForm, ArticleFormats, ArticlePriceType, ArticleTypes, ArticleVideo, ArticleVideoProvider, ArticleVideoProviders } from '@/api/posts/articles';
import { getMenuTree } from '@/api/systems/menus';
import useLoading from '@/hooks/loading';
import { FileItem, TableColumnData, TreeNodeData } from '@arco-design/web-vue';
import { ref, watch } from 'vue';

const props = defineProps<{
  form: ArticleForm;
}>();

const uploadImageList = ref<FileItem[]>([]);
const videoList = ref<ArticleVideo[]>([]);
const audioList = ref<ArticleAudio[]>([]);

const paymentColumns = (): TableColumnData[] => {
  return [
    { title: '类型', dataIndex: 'price_type', slotName: 'price_type', width: 60 },
    { title: '免费密钥', dataIndex: 'token', slotName: 'token' },
    { title: '价格', dataIndex: 'price', slotName: 'price' },
    { title: '折扣', dataIndex: 'discount', slotName: 'discount' },
    { title: '开始时间', dataIndex: 'discount_start_at', slotName: 'discount_start_at' },
    { title: '结束时间', dataIndex: 'discount_end_at', slotName: 'discount_end_at' },
  ]
}

const treeData = ref<TreeNodeData[]>([]);

const getFirstLeaf = (tree: TreeNodeData[]): string => {
  for (let item of tree) {
    if (item.children && item.children.length > 0) {
      return getFirstLeaf(item.children)
    }

    return String(item.key)
  }
  return ""
}

const categoryID = ref("")
const { loading: menuLoading, setLoading: setMenuLoading } = useLoading(false);
const getCategoryTree = async () => {
  setMenuLoading(true);
  try {
    const { data } = await getMenuTree(1);
    treeData.value = data;
    categoryID.value = getFirstLeaf(data)
    props.form.category_id = Number(categoryID.value)
  } finally {
    setMenuLoading(false);
  }
}

const changeCategoryID = (value: any) => {
  props.form.category_id = Number(value)
  console.log(props.form.category_id)
}

getCategoryTree()

watch(videoList.value, async (newValue, oldValue) => {
  props.form.videos = newValue
})
const addNewVideo = () => {
  videoList.value.push({ provider: ArticleVideoProvider.Url, url: "" })
}
const removeVideo = (idx: number) => {
  videoList.value.splice(idx, 1)
}

watch(audioList.value, async (newValue, oldValue) => {
  props.form.audios = newValue
})
const addNewAudio = () => {
  audioList.value.push({ provider: ArticleAudioProvider.Url, url: "" })
}
const removeAudio = (idx: number) => {
  audioList.value.splice(idx, 1)
}
</script>

<style>
.article-collapse .arco-collapse-item-header {
  border-bottom: 0 !important;
}

.article-collapse .arco-collapse-item-content {
  background-color: var(--color-bg-2) !important;
}

#price-table .arco-form-item {
  margin-bottom: 0 !important;
}
</style>