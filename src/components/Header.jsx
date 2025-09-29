export default function Header() {
  const title = "Ich bin der Header";

  return (
    <>
      <header className="border p-4">
        <h1 className="text-3xl">{title}</h1>
      </header>
    </>
  );
}
