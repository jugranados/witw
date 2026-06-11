type Props = {
  flags?: { svg?: string; png?: string };
  name?: string;
  className?: string;
  loading?: "lazy" | "eager";
};

export default function FlagImage({ flags, name, className, loading }: Props) {
  const src = flags?.svg || flags?.png || "";
  if (!src) return null;

  return (
    <img
      src={src}
      alt={name ? `${name} flag` : "Country flag"}
      className={className}
      loading={loading}
    />
  );
}
