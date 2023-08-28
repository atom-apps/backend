<template>
  <div>
    <a-page-header title="用户管理" subtitle="用户详情" :show-back="false" class="bg-white">
      <template #breadcrumb>
        <a-breadcrumb>
          <a-breadcrumb-item>用户管理</a-breadcrumb-item>
          <a-breadcrumb-item>用户详情</a-breadcrumb-item>
        </a-breadcrumb>
      </template>

      <template #extra>
        <a-space class="flex justify-end items-center">
          <a-button>编辑</a-button>
          <a-button>删除</a-button>
        </a-space>
      </template>
    </a-page-header>

    <a-card class="m-5">
      <a-descriptions :data="renderData" :column="1" align="right" size="mini" />
    </a-card>
  </div>
</template>

<script lang="ts" setup>

import { DescData } from '@arco-design/web-vue';


const renderData = [
  {
    label: "Username",
    value: "Username",
  },
  {
    label: 'Certification',
    value: "Cert"
  },
  {
    label: 'AccountID',
    value: 'AccountID',
  },
  {
    label: 'Phone',
    value: "Phone",
  },
  {
    label: 'RegisterAt',
    value: "RegisterAt",
  },
] as DescData[];
</script>