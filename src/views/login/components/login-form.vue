<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">登录</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="username"
        :rules="[{ required: true, message: '请输入用户名' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input v-model="userInfo.username" placeholder="用户名" size="large">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: '请输入密码' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          placeholder="密码"
          allow-clear
          size="large"
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <a-button type="primary" html-type="submit" size="large" long :loading="loading"
          >登录</a-button
        >
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { LoginData, SigninMethod } from "@/api/user";
import useLoading from "@/hooks/loading";
import { useUserStore } from "@/store";
import { Message } from "@arco-design/web-vue";
import { ValidatedError } from "@arco-design/web-vue/es/form/interface";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const errorMessage = ref("");
const { loading, setLoading } = useLoading();
const userStore = useUserStore();

const userInfo = reactive<LoginData>({
  username: "admin",
  password: "admin",
  method: SigninMethod.Password,
  token: true,
});

const handleSubmit = async ({
  errors,
  values,
}: {
  errors: Record<string, ValidatedError> | undefined;
  values: Record<string, any>;
}) => {
  if (loading.value) return;

  if (!!errors) return;

  setLoading(true);

  try {
    await userStore.login(values as LoginData);
    const { redirect, ...othersQuery } = router.currentRoute.value.query;
    router.push({
      name: (redirect as string) || "Workplace",
      query: {
        ...othersQuery,
      },
    });
    Message.success("登录成功");
  } catch (err) {
    errorMessage.value = (err as Error).message;
  } finally {
    setLoading(false);
  }
};
</script>

<style lang="less" scoped>
.login-form {
  &-wrapper {
    width: 320px;
  }

  &-title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  &-sub-title {
    color: var(--color-text-3);
    font-size: 16px;
    line-height: 24px;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }

  &-password-actions {
    display: flex;
    justify-content: space-between;
  }

  &-register-btn {
    color: var(--color-text-3) !important;
  }
}
</style>
