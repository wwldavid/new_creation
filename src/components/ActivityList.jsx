import Image from "next/image";

export default function ActivityList({ lang, activities = [] }) {
  if (!activities.length) {
    return <p className="text-gray-500">暂无活动</p>;
  }
  const base = `https://${process.env.NEXT_PUBLIC_R2_ENDPOINT}`;

  return (
    <div className="space-y-6">
      {activities.map((act) => (
        <div key={act.id} className="p-4 hover:shadow">
          {/* 活动标题 */}
          <h3 className="text-xl font-bold mb-4">{act.name}</h3>

          {/* 活动详情项 */}
          <div className=" space-y-2">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <div>
                <span className="font-semibold">
                  {lang === "zh" ? "开始时间" : "Start Time"}:
                </span>
                {new Date(act.startAt).toLocaleString()}
              </div>
              <div>
                <span className="font-semibold">
                  {" "}
                  {lang === "zh" ? "结束时间" : "End Time"}:
                </span>
                {new Date(act.endAt).toLocaleString()}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <div>
                <span className="font-semibold">
                  {lang === "zh" ? "组织者" : "Organizer"}:
                </span>
                {act.organizer}
              </div>
              <div>
                <span className="font-semibold">
                  {lang === "zh" ? "联系方式" : "Contact Info"}:
                </span>
                {act.contact}
              </div>
            </div>
            <div>
              <span className="font-semibold">
                {lang === "zh" ? "地点" : "Address"}:
              </span>
              {act.location}
            </div>

            {/* 宣传图片 */}
            {act.promoImage && (
              <div>
                <div className="relative w-full h-64 my-2 overflow-hidden">
                  <Image
                    src={`${base}/${act.promoImage}`}
                    alt={`${act.name} 宣传图`}
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </div>
            )}
            {/* 详细描述 */}
            <div>
              <span className="font-semibold">
                {lang === "zh" ? "具体细节" : "Other details"}:
              </span>
              <span className="text-sm text-gray-600">
                {act.detail || "无"}
              </span>
            </div>
            {/* 其他事项 */}
            <div>
              <span className="font-semibold">
                {lang === "zh" ? "其他事项" : "Others"}:
              </span>
              <span className="text-sm text-gray-600">{act.other || "无"}</span>
            </div>
            <div>
              <span className="font-semibold">
                {lang === "zh" ? "收费方式" : "Payment Method"}:
              </span>
              {act.feeType}
            </div>
            {/* 附件列表 */}
            {act.attachments && act.attachments.length > 0 && (
              <div>
                <span className="font-semibold">
                  {lang === "zh" ? "附件" : "Attachment"}:
                </span>
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
