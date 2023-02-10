export default function UnderConstruction(props) {
  return (
    <section className="underConstruction">
      <h1>
        Following page <br /> {props.name} <br />
        is under construction.
      </h1>
      <h2>Do not worry!</h2>
      <p>Main function of the application is working correctly.</p>
      <p>You can download application and start automate dialing.</p>
    </section>
  );
}
