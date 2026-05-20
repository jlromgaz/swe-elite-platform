import { describe, it, expect } from 'vitest';
import { groupResources } from './groupResources';

type Resource = {
  id: string;
  type: string;
  title: string;
  url: string;
  locale: string;
  durationMin: number | null;
  quality: number;
};

describe('groupResources', () => {
  it('maps video → "Videos", article → "Articles", unknown → "Other"', () => {
    const resources: Resource[] = [
      { id: '1', type: 'video', title: 'V1', url: 'https://example.com/v1', locale: 'en', durationMin: 10, quality: 5 },
      { id: '2', type: 'article', title: 'A1', url: 'https://example.com/a1', locale: 'en', durationMin: null, quality: 5 },
      { id: '3', type: 'podcast', title: 'P1', url: 'https://example.com/p1', locale: 'en', durationMin: 45, quality: 7 },
    ];

    const groups = groupResources(resources);

    const videoGroup = groups.find((g) => g.label === 'Videos');
    expect(videoGroup).toBeDefined();
    expect(videoGroup!.resources).toHaveLength(1);
    expect(videoGroup!.resources[0].id).toBe('1');

    const articleGroup = groups.find((g) => g.label === 'Articles');
    expect(articleGroup).toBeDefined();
    expect(articleGroup!.resources).toHaveLength(1);

    const otherGroup = groups.find((g) => g.label === 'Other');
    expect(otherGroup).toBeDefined();
    expect(otherGroup!.resources).toHaveLength(1);
  });

  it('returns empty array when input is empty', () => {
    const groups = groupResources([]);
    expect(groups).toEqual([]);
  });

  it('groups multiple resources of the same type together', () => {
    const resources: Resource[] = [
      { id: '1', type: 'video', title: 'V1', url: 'https://example.com/v1', locale: 'en', durationMin: 10, quality: 5 },
      { id: '2', type: 'video', title: 'V2', url: 'https://example.com/v2', locale: 'en', durationMin: 20, quality: 6 },
      { id: '3', type: 'article', title: 'A1', url: 'https://example.com/a1', locale: 'en', durationMin: null, quality: 5 },
    ];

    const groups = groupResources(resources);

    expect(groups).toHaveLength(2);
    const videoGroup = groups.find((g) => g.label === 'Videos');
    expect(videoGroup!.resources).toHaveLength(2);

    const articleGroup = groups.find((g) => g.label === 'Articles');
    expect(articleGroup!.resources).toHaveLength(1);
  });

  it('handles case-insensitive types (VIDEO → "Videos")', () => {
    const resources: Resource[] = [
      { id: '1', type: 'VIDEO', title: 'V1', url: 'https://example.com/v1', locale: 'en', durationMin: 10, quality: 5 },
    ];

    const groups = groupResources(resources);

    const videoGroup = groups.find((g) => g.label === 'Videos');
    expect(videoGroup).toBeDefined();
    expect(videoGroup!.resources).toHaveLength(1);
  });
});