import { LabelItem } from '@/types/global';
import 'dayjs/locale/zh-cn';

export default function useTools() {
  const json2label = (map: Record<string, any>): LabelItem[] => {
    return Object.entries(map).map(([key, value]) => ({
      label: key,
      value: value
    }));
  }

  return { json2label }
}
