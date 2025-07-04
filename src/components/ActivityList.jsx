import Image from "next/image";

export default function ActivityList({ activities = [] }) {
  if (!activities.length) {
    return <p className="text-gray-500">暂无活动</p>;
  }
  const base = `https://${process.env.NEXT_PUBLIC_R2_ENDPOINT}`;

  return (
    <div className="space-y-4">
      {activities.map((act) => {
        console.log("activity object:", act);
        return (
          <div key={act.id} className="p-4 border rounded-md hover:shadow">
            <h3 className="text-lg font-bold">{act.name}</h3>

            {/* 宣传图片 */}
            {act.promoImage && (
              <div className="relative w-full h-64 my-2">
                <Image
                  src={`${base}/${act.promoImage}`}
                  alt={`${act.name} 宣传图`}
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}
            <p>
              时间：{new Date(act.startAt).toLocaleString()} –{" "}
              {new Date(act.endAt).toLocaleString()}
            </p>
            <p>
              地点：{act.location}，组织者：{act.organizer}
            </p>
            <p className="text-sm text-gray-600 mt-1">{act.detail}</p>
            {/* 其他事项 */}
            {act.other && (
              <p className="text-sm text-gray-600 mt-1">其他：{act.other}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
