import Calendar from "../../components/Calendar";

function Home() {
  return (
    <main className="flex flex-col items-center justify-center py-2 w-full">
      <h1 className="text-4xl mb-4 justify-center flex w-full">
        Calendrier culturel associatif de Oupsiclou
      </h1>
      <section className="flex items-center justify-center w-full border">
        <div>bonjour</div>
        <Calendar dataApp="Helooooooooooo" />
        <div>coucou</div>
      </section>
    </main>
  );
}

export default Home;
