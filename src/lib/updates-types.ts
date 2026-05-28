export type UpdateCategory = "admission" | "exam" | "notice" | "news";

export type UpdateItem = {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  sourceId: string;
  category: UpdateCategory;
  publishedAt: string;
};

export type UpdatesStore = {
  syncedAt: string;
  items: UpdateItem[];
};
