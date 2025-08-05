import CampComponent from "@/components/CampComponent";

export default function Camp({ params }) {
  const { lang } = params;
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f4e6" }}>
      <CampComponent lang={lang} />
    </div>
  );
}
