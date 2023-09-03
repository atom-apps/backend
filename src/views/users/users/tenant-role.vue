<template>
  <div>
    <PageHeader title="用户管理" subtitle="角色分配" :back="true" />

    <Container :loading="loading" :rows="2" :title="userInfo.username">

      <a-row>
        <a-col :span="12" :offset="6">
          <a-row class="mb-10" :gutter="10">
            <a-col :span="8">
              <a-select v-model="selectTenant" placeholder="请选择租户" size="large">
                <a-option v-for="item of tenants" :value="item.id" :label="item.name"
                  :disabled="hasTenant(Number(item.id))" />
              </a-select>
            </a-col>
            <a-col :span="8">
              <a-select v-model="selectRole" placeholder="请选择角色" size="large">
                <a-option v-for="item of roles" :value="item.id" :label="item.name"
                  :disabled="tenantHasRole(selectTenant, Number(item.id))" />
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
import { RoleItem, queryRoleList } from '@/api/users/roles';
import { TenantItem, queryTenantList } from '@/api/users/tenants';
import { UserItem, UserItemTenantRole, getUserItem } from '@/api/users/users';
import { Container, PageHeader } from "@/components/layout";
import useLoading from '@/hooks/loading';
import { TableColumnData } from '@arco-design/web-vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

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

const roles = ref<RoleItem[]>([]);
const tenants = ref<TenantItem[]>([]);

const fetchTenantRoles = async () => {
  try {
    // load roles
    const { data: roleData } = await queryRoleList({})
    roles.value = roleData.items

    // load tenants
    const { data: tenantData } = await queryTenantList({})
    tenants.value = tenantData.items
  } catch (e) {
  } finally {
  }
}

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
  fetchTenantRoles()
  fetchData()
})


//handle attach
const { loading: attaching, setLoading: setAttaching } = useLoading();
const attachUser = async () => {
  try {
    setAttaching(true);
    await attachUsers(Number(selectTenant.value), Number(selectRole.value), [Number(userInfo.value.id)])
    fetchData()
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
  } catch (e) {
    console.log(e)
  } finally {
    setDetaching(false);
  }
}


</script>