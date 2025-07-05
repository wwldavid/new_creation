"use client";
import ActivitiesManager from "@/components/ActivitiesManager";

export default function Connect() {
  return (
    <ActivitiesManager
      showApplicationForm={true}
      onApplicationSuccess={() => {
        console.log("有活动数据变更了");
      }}
    />
  );
}
