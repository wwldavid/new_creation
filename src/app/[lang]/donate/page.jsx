import DonatePage from "@/components/DonatePage";

export default function Donate({ params }) {
  const { lang } = params;
  return (
    <div className="min-h-screen py-10" style={{ backgroundColor: "#f8f4e6" }}>
      <DonatePage lang={lang} />
    </div>
  );
}
