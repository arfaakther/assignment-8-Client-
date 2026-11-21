
"use client";

import { useEffect, useState } from "react";

const useToday = () => {
  const [today, setToday] = useState("");

  useEffect(() => {
    const date = new Date();

    date.setMinutes(
      date.getMinutes() - date.getTimezoneOffset()
    );

    setToday(date.toISOString().split("T")[0]);
  }, []);

  return today;
};

export default useToday;
