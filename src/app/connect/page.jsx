"use client";
import { useState, useEffect } from "react";
import ActivityCreator from "@/components/ActivityCreater";
import ActivityList from "@/components/ActivityList";
import ApplicationForm from "@/components/ApplicationForm";

export default function Connect() {
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    try {
      const res = await fetch("/api/activities");
      if (!res.ok) throw new Error("网络错误");
      const data = await res.json();
      setActivities(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 my-8">
      <section>
        <h2 className="text-xl font-semibold mb-4"> 活动列表</h2>
        <ActivityList activities={activities} />
      </section>

      <ActivityCreator onSuccess={fetch} />
      {activities.length > 0 && (
        <ApplicationForm
          activityId={activities[0].id}
          onSuccess={() => alert("报名成功！")}
        />
      )}
    </div>
  );
}
