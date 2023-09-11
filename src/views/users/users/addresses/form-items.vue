<template>
  <a-form-item field="code" label="省市区" :rules="[{ required: true, message: '省市区必填' }]">
    <a-cascader v-model="form.code" :options="locations" placeholder="请输入省市区" :loading="loading" :load-more="loadMore" />
  </a-form-item>

  <a-form-item field="town" label="街道" :rules="[{ required: true, message: '街道必填' }]">
    <a-cascader v-model="form.town" :options="towns" placeholder="请输入街道" />
  </a-form-item>

  <a-form-item field="detail" label="详细地址" :rules="[{ required: true, message: '详细地址必填' }]">
    <a-input v-model="form.detail" placeholder="请输入详细地址" />
  </a-form-item>

  <a-form-item field="name" label="姓名" :rules="[{ required: true, message: '姓名必填' }]">
    <a-input v-model="form.name" placeholder="请输入姓名" />
  </a-form-item>

  <a-form-item field="phone" label="联系电话" :rules="[{ required: true, message: '联系电话必填' }]">
    <a-input v-model="form.phone" placeholder="请输入联系电话" />
  </a-form-item>

  <a-form-item field="zip_code" label="邮编" :rules="[{ required: true, message: '邮编必填' }]">
    <a-input v-model="form.zip_code" placeholder="请输入邮编" />
  </a-form-item>
</template>

<script lang="ts" setup>
import { getAreas, getCities, getProvinces, getTowns } from '@/api/systems/locations';
import { UserAddressItem } from '@/api/users/user_addresses';
import useLoading from '@/hooks/loading';
import { CascaderOption } from '@arco-design/web-vue';
import { ref, watch } from 'vue';

const props = defineProps<{
  form: UserAddressItem;
}>();

const { loading, setLoading } = useLoading();
const { loading: townLoading, setLoading: setTownLoading } = useLoading();

const locations = ref<CascaderOption[]>([])
const towns = ref<CascaderOption[]>([])

const parseCode = (code: string) => {
  const province = code.slice(0, 2)
  const city = code.slice(2, 4)
  const area = code.slice(4, 6)
  return { province, city, area }
}


const fetchProvince = async () => {
  setLoading(true)
  try {
    const { data } = await getProvinces()

    let items: CascaderOption[] = [];

    for (const item of data) {
      if (props.form.code === '') {
        items.push({ label: item.name, value: item.code })
        continue
      }

      const { province: currentProvince } = parseCode(String(item.code ?? ''))
      const { province, city, area } = parseCode(String(props.form.code))

      if (currentProvince !== province) {
        items.push({ label: item.name, value: item.code })
        continue
      }

      let cities: CascaderOption[] = [];
      const { data: citiesData } = await getCities(province)
      for (const cityData of citiesData) {
        if (city !== cityData.city) {
          cities.push({ label: item.name, value: item.code })
          continue
        }

        let areas: CascaderOption[] = [];
        const { data: areasData } = await getAreas(province, city)
        for (const areaData of areasData) {
          areas.push({ label: areaData.name, value: areaData.code, isLeaf: true })
        }

        cities.push({ label: item.name, value: item.code, children: areas })
      }

      items.push({ label: item.name, value: item.code, children: cities })
    }

    locations.value = items;
  } catch (e) {
  } finally {
    setLoading(false)
  }
}
fetchProvince()

const loadMore = async (option: CascaderOption, done: any) => {

  const code = String(option.value ?? '')
  const { province, city, area } = parseCode(code)

  try {
    setLoading(true)
    console.log(province, city, area)
    if (city === '00' && area === '00') {
      const { data } = await getCities(province)
      const nodes = data.map((item): CascaderOption => { return { label: item.name, value: item.code } })
      done(nodes)
    } else if (area === '00') {
      const { data } = await getAreas(province, city)
      const nodes = data.map((item): CascaderOption => { return { label: item.name, value: item.code, isLeaf: true } })
      done(nodes)
    }
  } catch (e) {
  } finally {
    setLoading(false)
  }
};

const fetchTowns = async (code: string) => {
  if (code === '') return;

  const { province, city, area } = parseCode(code)

  setTownLoading(true)
  try {
    const { data } = await getTowns(province, city, area)
    towns.value = data.map((item): CascaderOption => { return { label: item.name, value: item.town } })
  } catch (e) {
  } finally {
    setLoading(false)
  }
}
fetchTowns(props.form.code ?? '')

watch(
  () => props.form.code,
  async (val) => {
    await fetchTowns(String(val))
  }
)


</script>