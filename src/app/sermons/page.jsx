import SermonPlayer from "@/components/Sermonplayer";
import VideoPlayer from "@/components/VideoPlayer";

export default function Sermons() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-3">
      <div className="w-full">
        <VideoPlayer />
      </div>

      <div className="w-full">
        <SermonPlayer />
      </div>
    </div>
  );
}
