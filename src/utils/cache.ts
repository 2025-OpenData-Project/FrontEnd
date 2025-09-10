// 캐시 유틸리티
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time To Live (밀리초)
}

class CacheManager {
  private cache = new Map<string, CacheItem<any>>();

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    // TTL 체크
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;

    // TTL 체크
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  clear(): void {
    this.cache.clear();
  }

  // 데이터가 변경되었는지 체크 (간단한 JSON 비교)
  isDataChanged<T>(key: string, newData: T): boolean {
    const cachedData = this.get<T>(key);
    if (!cachedData) return true;

    return JSON.stringify(cachedData) !== JSON.stringify(newData);
  }
}

export const cacheManager = new CacheManager();

// 관광지 랭킹 캐시 키
export const CACHE_KEYS = {
  TOUR_SPOTS_RANK: "tour_spots_rank",
  TOUR_SPOT_DETAIL: (id: number) => `tour_spot_detail_${id}`,
  USER_INFO: "user_info",
  PAST_COURSES: "past_courses",
  PREFERRED_SPOTS: "preferred_spots",
} as const;
