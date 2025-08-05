import SermonPlayer from "@/components/Sermonplayer";

export default function Sermons({ params }) {
  const { lang } = params;
  return (
    <div className="min-h-screen py-4" style={{ backgroundColor: "#f8f4e6" }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-3">
        <SermonPlayer lang={lang} />
      </div>
    </div>
  );
}
