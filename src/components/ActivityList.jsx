import Image from "next/image";

export default function ActivityList({ activities = [] }) {
  if (!activities.length) {
    return <p className="text-gray-500">暂无活动</p>;
  }
  const base = `https://${process.env.NEXT_PUBLIC_R2_ENDPOINT}`;

  return (
    <div className="space-y-6">
      {activities.map((act) => (
        <div key={act.id} className="p-4 border rounded-md hover:shadow">
          {/* 活动标题 */}
          <h3 className="text-xl font-bold mb-4">{act.name}</h3>

          {/* 活动详情项 */}
          <div className=" space-y-2">
            <div className="flex gap-6">
              <div>
                <span className="font-semibold">开始时间：</span>
                {new Date(act.startAt).toLocaleString()}
              </div>
              <div>
                <span className="font-semibold">结束时间：</span>
                {new Date(act.endAt).toLocaleString()}
              </div>
            </div>
            <div className="flex gap-6">
              <div>
                <span className="font-semibold">组织者：</span>
                {act.organizer}
              </div>
              <div>
                <span className="font-semibold">联系方式：</span>
                {act.contact}
              </div>
            </div>
            <div>
              <span className="font-semibold">地点：</span>
              {act.location}
            </div>

            {/* 宣传图片 */}
            {act.promoImage && (
              <div>
                <div className="relative w-full h-64 my-2">
                  <Image
                    src={`${base}/${act.promoImage}`}
                    alt={`${act.name} 宣传图`}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              </div>
            )}
            {/* 详细描述 */}
            <div>
              <span className="font-semibold">具体细节：</span>
              <span className="text-sm text-gray-600">
                {act.detail || "无"}
              </span>
            </div>
            {/* 其他事项 */}
            <div>
              <span className="font-semibold">其他事项：</span>
              <span className="text-sm text-gray-600">{act.other || "无"}</span>
            </div>
            <div>
              <span className="font-semibold">收费方式：</span>
              {act.feeType}
            </div>
            {/* 附件列表 */}
            {act.attachments && act.attachments.length > 0 && (
              <div>
                <span className="font-semibold">附件：</span>
                <ul className="list-disc list-inside text-sm text-blue-600">
                  {act.attachments.map((key) => (
                    <li key={key}>
                      <a
                        href={`${base}/${key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {key.split("/").pop()}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
