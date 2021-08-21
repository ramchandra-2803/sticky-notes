export default function Input(Props) {
  return (
    <input
      type={Props.type}
      title={Props.title}
      name={Props.id}
      id={Props.id}
      autoComplete="off"
      placeholder={Props.placeholder}
      onChange={Props.onChange}
      value={Props.value}
      className={`input ${Props.className ? Props.className : ""}`}
    />
  );
}
