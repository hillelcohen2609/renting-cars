import axios from "axios";
import { useEffect, useState } from "react";

export const fetchDataHook = (url, dps) => {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch(setData(null));
  }, [url, dps]);

  return data;
};
