import { TableColumnData } from "@arco-design/web-vue/es/table/interface";

export type SizeProps = "mini" | "small" | "medium" | "large";
export type Column = TableColumnData & { checked?: boolean } & { hidden?: boolean };
