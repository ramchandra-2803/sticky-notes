import Button from "../shared/Button";

export default function NavBar(Props) {
  return (
    <div className="navBar">
      <h3 className="heading">ramchandra</h3>
      <Button
        className="light"
        value={`${Props.appearnace ? "Light" : "Dark"} Mode`}
        onClick={Props.mode}
      />
    </div>
  );
}
