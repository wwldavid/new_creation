import SermonVideoPlayer from "@/components/SermonVideoPlayer";

export default function Sermons() {
  return (
    <div className="max-w-6xl mx-auto gap-3">
      <div className="flex-2 ">
        <SermonVideoPlayer />
      </div>
      <div className="flex-1 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg mt-5 mb-5">
        Audio sermon
      </div>
    </div>
  );
}
