export type ResourceGroup = {
  label: string;
  resources: {
    id: string;
    type: string;
    title: string;
    url: string;
    locale: string;
    durationMin: number | null;
    quality: number;
    completed?: boolean;
  }[];
};

const TYPE_LABELS: Record<string, string> = {
  video: 'Videos',
  article: 'Articles',
};

export function groupResources(
  resources: {
    id: string;
    type: string;
    title: string;
    url: string;
    locale: string;
    durationMin: number | null;
    quality: number;
    completed?: boolean;
  }[]
): ResourceGroup[] {
  if (resources.length === 0) return [];

  const groups: Record<string, typeof resources> = {};
  for (const r of resources) {
    const key = r.type.toLowerCase();
    (groups[key] ??= []).push(r);
  }

  const labelMap = TYPE_LABELS;
  const result: ResourceGroup[] = [];
  for (const [key, items] of Object.entries(groups)) {
    result.push({ label: labelMap[key] ?? 'Other', resources: items });
  }

  return result;
}