export default function Button(Props) {
  return (
    <button
      title={Props.title}
      onClick={Props.onClick}
      className={`btn ${Props.className}`}
    >
      {Props.value}
    </button>
  );
}
