import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchCurrencyInfo = async () => {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json`
        );

        const result = await response.json();
        console.log("result", result.eur);
        setData(result.eur);
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };

    fetchCurrencyInfo();
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
