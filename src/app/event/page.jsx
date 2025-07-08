"use client";
import ActivitiesManager from "@/components/ActivitiesManager";

export default function Event() {
  return (
    <div className="min-h-screen py-4" style={{ backgroundColor: "#f8f4e6" }}>
      <ActivitiesManager
        showApplicationForm={true}
        onApplicationSuccess={() => {
          console.log("有活动数据变更了");
        }}
      />
    </div>
  );
}
