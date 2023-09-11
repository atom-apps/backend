<template>
  <div>
    <PageHeader subtitle="用户管理">
      <ActionCreate v-can="'UserAddressCreate'" :to="{ name: 'UserAddressCreate' }" />
      <ActionRefresh @click="fetchData" />
    </PageHeader>


    <a-table class="m-5" row-key="id" :pagination="false" :hoverable="true" :stripe="true" :loading="loading"
      :columns="showColumns" :data="renderData">
      <template #created_at="{ record }">{{ datetime(record.created_at) }}</template>
      <template #updated_at="{ record }">{{ datetime(record.updated_at) }}</template>
      <template #deleted_at="{ record }">{{ datetime(record.deleted_at) }}</template>

      <template #operations="{ record }">
        <RowOperations :record="record" :reload="fetchData" edit="UserAddressEdit" remove="UserAddressDelete" :view="false"
          :params="{ user_id: record.user_id, id: record.id }" :deleteAction="deleteAction" />
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { UserAddressItem, deleteUserAddressItem, queryUserAddressList, tableUserAddressColumns } from "@/api/users/user_addresses";
import { PageHeader } from "@/components/layout";
import { ActionCreate, ActionRefresh, RowOperations } from "@/components/table";
import useDatetime from "@/hooks/datetime";
import useLoading from "@/hooks/loading";
import { TableColumnData } from "@arco-design/web-vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const { datetime } = useDatetime();

const { loading, setLoading } = useLoading(true);
const renderData = ref<UserAddressItem[]>([]);
const route = useRoute();

const { columns } = tableUserAddressColumns();
const showColumns = ref<TableColumnData[]>(columns);

const fetchData = async () => {
  setLoading(true);
  try {
    const { data } = await queryUserAddressList(Number(route.params.user_id));
    renderData.value = data;
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};
fetchData()

const deleteAction = async (id: number) => {
  setLoading(true);
  try {
    await deleteUserAddressItem(Number(route.params.user_id), id);
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};

</script>
