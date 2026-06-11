type Props = {
  label: string;
  value: string | undefined;
  as?: "div" | "li";
};

export default function InfoItem({ label, value, as: Tag = "div" }: Props) {
  return (
    <Tag className="text-sm">
      <span className="font-semibold text-foreground">{label}: </span>
      <span className="text-muted">{value || "—"}</span>
    </Tag>
  );
}
