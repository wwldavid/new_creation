import SermonPlayer from "@/components/Sermonplayer";

export default function Sermons() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-3">
      <div className="w-full">
        <SermonPlayer />
      </div>
    </div>
  );
}
