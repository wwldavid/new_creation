export default function MaskedCell({ type = "text", value = "" }) {
  if (!value) return <span>—</span>;

  if (type === "name") {
    const len = value.length;
    if (len <= 2) return <span>{value}</span>;
    return <span>{value[0] + "*".repeat(len - 2) + value[len - 1]}</span>;
  }

  return <span>{"***"}</span>;
}
