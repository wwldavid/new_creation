export default function SubmittedApplication({ data }) {
  return (
    <div className="flex space-x-4 items-center p-2 border rounded bg-gray-50">
      <span className="font-medium">{data.name}</span>
      <span>{data.phone}</span>
      <span>{data.email}</span>
      {data.other && (
        <span className="text-sm text-gray-600">{data.other}</span>
      )}
      {data.attachments.length > 0 && (
        <span className="text-sm text-green-600">
          附件：{data.attachments.join(", ")}
        </span>
      )}
    </div>
  );
}
