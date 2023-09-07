<template>
  <div>
    <PageHeader subtitle="用户管理" :back="true" />

    <Container :loading="loading" :rows="2" :title="userInfo.username">

      <a-row>
        <a-col :span="12" :offset="6">
          <a-row class="mb-10" :gutter="10">
            <a-col :span="8">
              <a-select v-model="selectTenant" placeholder="请选择租户" size="large" ref="tenantSelector">
                <a-option v-for="item of userStore.tenants" :value="item.value" :label="item.label"
                  :disabled="hasTenant(Number(item.value))" />
              </a-select>
            </a-col>
            <a-col :span="8">
              <a-select v-model="selectRole" placeholder="请选择角色" size="large">
                <a-option v-for="item of userStore.roles" :value="item.value" :label="item.label"
                  :disabled="tenantHasRole(selectTenant, Number(item.value))" />
              </a-select>
            </a-col>
            <a-col :span="8">
              <a-button type="primary" :loading="attaching" size="large" class="w-full"
                @click="attachUser">关联权限</a-button>
            </a-col>
          </a-row>

          <a-table row-key="id" :hoverable="true" :stripe="true" :loading="loading" :columns="columns" :data="tableItems"
            :pagination="false" :bordered="true" size="large">
            <template #tenant="{ record }">{{ record.tenant.name }}</template>
            <template #role="{ record }">{{ record.role.name }}</template>
            <template #operations="{ record }">
              <a-popconfirm content="确认删除？" type="warning" :ok-loading="detaching"
                @ok="detachUser(record.tenant.id, record.role.id)" position="lt" :data-id="record.id">
                <a-button type="outline" size="mini" status="danger">删除</a-button>
              </a-popconfirm>
            </template>
          </a-table>
        </a-col>
      </a-row>

    </Container>
  </div>
</template>

<script lang="ts" setup>
import { attachUsers, detachUsers } from '@/api/users/permissions';
import { UserItem, UserItemTenantRole, getUserItem } from '@/api/users/users';
import { Container, PageHeader } from "@/components/layout";
import useLoading from '@/hooks/loading';
import { useUserStore } from '@/store';
import { Message, TableColumnData } from '@arco-design/web-vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const userStore = useUserStore();
const route = useRoute();

const selectTenant = ref<number>()
const selectRole = ref<number>()


const { loading, setLoading } = useLoading();
const userInfo = ref<UserItem>({});
const tableItems = ref<UserItemTenantRole[]>([]);
const columns = ref<TableColumnData[]>([
  { title: '租户', dataIndex: 'tenant', slotName: 'tenant' },
  { title: '角色', dataIndex: 'role', slotName: 'role' },
  { title: '操作', dataIndex: 'operations', slotName: 'operations', align: 'right' },
])

const hasTenant = (id: number) => {
  let has = false
  userInfo.value.tenant_roles?.forEach((item: UserItemTenantRole) => {
    if (item.tenant?.id === id) {
      has = true
    }
  })
  return has
}

const tenantHasRole = (tenant: number | undefined, role: number) => {
  if (tenant === undefined || role === undefined) return true

  let has = false
  userInfo.value.tenant_roles?.forEach((item: UserItemTenantRole) => {
    if (item.tenant?.id === tenant && item.role?.id === role) {
      has = true
    }
  })
  return has
}

const fetchData = async () => {
  try {
    setLoading(true);
    const { data: profile } = await getUserItem(Number(route.params.id))
    userInfo.value = profile

    let items: UserItemTenantRole[] = [];
    profile.tenant_roles?.forEach((tenant_role: UserItemTenantRole) => {
      items.push({ tenant: tenant_role.tenant, role: tenant_role.role })
    })
    tableItems.value = items
  } catch (e) {

  } finally {
    setLoading(false)
  }
}
onMounted(() => {
  fetchData()
})


//handle attach
const { loading: attaching, setLoading: setAttaching } = useLoading();
const attachUser = async () => {
  try {
    setAttaching(true);
    await attachUsers(Number(selectTenant.value), Number(selectRole.value), [Number(userInfo.value.id)])
    Message.success("更新成功")


    selectTenant.value = undefined
    selectRole.value = undefined

    await fetchData()

  } catch (e) {
    console.log(e)
  } finally {
    setAttaching(false);
  }
}


// handle delete role
const { loading: detaching, setLoading: setDetaching } = useLoading();
const detachUser = async (tenant: number, role: number) => {
  try {
    setDetaching(true);
    await detachUsers(tenant, role, [Number(userInfo.value.id)])
    fetchData()

    Message.success("更新成功")
  } catch (e) {
    console.log(e)
  } finally {
    setDetaching(false);
  }
}


</script>