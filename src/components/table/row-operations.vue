<template>
    <a-space size="mini">
        <slot></slot>
        <a-button v-if="view" type="text" :size="reSize" v-can="view"
            @click="$router.push({ name: String(view), params: params })" status="normal"><template
                #icon><icon-eye /></template>查看</a-button>

        <a-button v-if="edit" v-can="edit" type="text" :size="reSize"
            @click="$router.push({ name: String(edit), params: params })" status="success"><template
                #icon><icon-edit /></template>编辑</a-button>

        <a-popconfirm v-if="remove" v-can="remove" content="确认删除？" type="warning" :ok-loading="loading"
            @ok="handleOk(record.id)" position="lt" :data-id="record.id">
            <a-button type="text" :size="reSize" status="danger"> <template #icon><icon-delete /></template>删除</a-button>
        </a-popconfirm>
    </a-space>
</template>


<script lang="ts" setup>
import useLoading from "@/hooks/loading";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps<{
    edit?: string | boolean;
    view?: string | boolean;
    remove?: string | boolean;
    params?: any;
    record: any;
    size?: "mini" | "medium" | "large" | "small" | undefined;
    reload: () => void;
    deleteAction: (id: number) => void;
}>();

const reSize = computed(() => {
    if (props.size) {
        switch (props.size) {
            case "mini":
                return "mini";
            case "small":
                return "mini";
            case "medium":
                return "small";
            case "large":
                return "medium";
            default:
                return "medium";
        }
    }
    return "small";
});

const { loading, setLoading } = useLoading();

const handleOk = async (id: number) => {
    try {
        setLoading(true);

        await props.deleteAction(props.record.id)

        props.reload()
    } catch (e) {
        console.log(e)
    } finally {
        setLoading(false);
    }
}
</script>