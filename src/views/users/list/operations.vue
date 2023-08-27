<template>
    <a-space>
        <a-tooltip content="查看">
            <a-button type="outline" size="mini" @click="$router.push({ name: view, params: params })"
                status="normal"><template #icon><icon-eye /></template> </a-button>
        </a-tooltip>
        <a-tooltip content="编辑">
            <a-button type="outline" size="mini" @click="$router.push({ name: edit, params: params })"
                status="success"><template #icon><icon-edit /></template> </a-button>
        </a-tooltip>
        <a-popconfirm content="确认删除？" type="warning" :ok-loading="loading" @ok="handleOk(record.id)" position="lt"
            :data-id="record.id">
            <a-tooltip content="删除">
                <a-button type="outline" size="mini" status="danger">
                    <template #icon><icon-delete /></template>
                </a-button>
            </a-tooltip>
        </a-popconfirm>
    </a-space>
</template>


<script lang="ts" setup>
import { deleteUser } from "@/api/users";
import useLoading from "@/hooks/loading";

const props = defineProps<{
    edit: string;
    view: string;
    params: any;
    record: any;
    reload: () => void;
}>();

const { loading, setLoading } = useLoading();

const handleOk = async (id: number) => {
    try {
        setLoading(true);
        await deleteUser(props.record.id)

        props.reload()
    } catch (e) {
        console.log(e)
    } finally {
        setLoading(false);
    }
}
</script>