import { TableColumnData } from "@arco-design/web-vue/es/table/interface";

export type SizeProps = "mini" | "small" | "medium" | "large";
export type Column = TableColumnData & { hidden?: false, checked?: true };
