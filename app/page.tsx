"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import UserForm from "../components/UserForm";
import { UserFormData } from "../types";

export default function Home() {
  const searchParams = useSearchParams();
  const [initialData, setInitialData] = useState<UserFormData | undefined>(
    undefined
  );

  useEffect(() => {
    const dataParam = searchParams.get("data");
    if (dataParam) {
      try {
        const parsedData = JSON.parse(dataParam);
        setInitialData(parsedData);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [searchParams]);

  return <UserForm initialData={initialData} />;
}
