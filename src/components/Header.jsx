import { NavLink } from "react-router";

export default function Header() {
  const title = "Ich bin der Header";

  return (
    <>
      <header className="border p-4">
        <h1 className="text-3xl">{title}</h1>
        {/* Navigation! */}
        <nav className="my-5">
          <ul className="flex gap-3">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/card">Card</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
