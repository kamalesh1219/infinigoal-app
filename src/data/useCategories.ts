import { useEffect, useState } from "react";
import { fetchCategoriesByGroup } from "@/src/services/categories";

export function useCategoryGroup(group: string) {
  const [bigCards, setBigCards] = useState<any[]>([]);
  const [smallCards, setSmallCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchCategoriesByGroup(group);

      setBigCards(data.filter(item => item.size === "big"));
      setSmallCards(data.filter(item => item.size === "small"));

      setLoading(false);
    }

    load();
  }, [group]);

  return { bigCards, smallCards, loading };
}
