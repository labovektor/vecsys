import { getBaseURL } from "@/axios/axios";
import { useEffect, useState } from "react";

export function useBaseUrl() {
  const [gettingBaseUrl, setLoading] = useState(false);
  let baseUrl = "/";

  useEffect(() => {
    const getUrl = async () => {
      setLoading(true);
      baseUrl = await getBaseURL();
      setLoading(false);
    };
    getUrl();
  }, []);

  return { baseUrl, gettingBaseUrl };
}
