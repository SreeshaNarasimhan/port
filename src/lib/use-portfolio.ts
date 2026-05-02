import { useEffect, useState } from "react";
import { loadData, type PortfolioData } from "./portfolio-data";

export function usePortfolio() {
  const [data, setData] = useState<PortfolioData>(loadData);

  useEffect(() => {
    setData(loadData());
    const refresh = () => setData(loadData());
    window.addEventListener("portfolio:updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("portfolio:updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return data;
}
