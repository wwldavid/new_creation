import Guestbook from "@/components/Guestbook";

export default function Connect() {
  return (
    <div className="min-h-screen py-8 bg-[#f8f4e6]">
      <div className="p-4 max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">联系我们</h2>
        <p className="mb-3 bg-white p-3 rounded w-full">
          电邮: canadanclm@gmail.com
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-center mb-2">留言簿</h2>
      <Guestbook />
    </div>
  );
}
