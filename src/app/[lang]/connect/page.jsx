import Guestbook from "@/components/Guestbook";

export default function Connect({ params }) {
  const { lang } = params;
  return (
    <div className="min-h-screen py-8 bg-[#f8f4e6]">
      <div className="p-4 max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {lang === "zh" ? "联系我们" : "Contact Us"}
        </h2>
        <p className="mb-3 bg-white p-3 rounded w-full">
          {lang === "zh" ? "电邮" : "Email"}: canadanclm@gmail.com
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-center mb-2">
        {lang === "zh" ? "留言簿" : "Guestbook"}
      </h2>
      <Guestbook lang={lang} />
    </div>
  );
}
