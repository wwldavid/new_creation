import SermonPlayer from "@/components/Sermonplayer";
import VideoPlayer from "@/components/VideoPlayer";

export default function Sermons() {
  return (
    <div className="max-w-6xl mx-auto gap-3">
      <div className="flex-2 ">
        <VideoPlayer />
        <SermonPlayer />
      </div>
    </div>
  );
}
