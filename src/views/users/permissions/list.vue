<template>
  <div>
    <PageHeader title="用户管理" subtitle="权限列表" />

    <Container class="m-5">
      <a-table
        row-key="id"
        v-model:selectedKeys="selectedKeys"
        :loading="loading"
        :columns="columns"
        :data="renderData"
        size="large"
      />
    </Container>
  </div>
</template>

<script lang="ts" setup>
import { PermissionItem, tablePermissionColumns } from "@/api/users/permissions";
import { Container, PageHeader } from "@/components/layout";
import useLoading from "@/hooks/loading";
import { onMounted, ref } from "vue";

const { columns } = tablePermissionColumns();

// load columns
onMounted(() => {
  fetchData();
});

// fetch table data
const { loading, setLoading } = useLoading(true);
const renderData = ref<PermissionItem[]>([]);

const fetchData = async () => {
  setLoading(true);
  try {
  } catch (err) {
  } finally {
    setLoading(false);
  }
};

// row selection
const selectedKeys = ref([]);
</script>
