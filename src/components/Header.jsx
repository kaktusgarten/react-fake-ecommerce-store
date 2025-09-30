import { NavLink, Link } from "react-router";

export default function Header() {
  const title = "React FakeStore";

  return (
    <>
      <header className="border p-4 bg-black">
        <h1 className="text-3xl mb-4">{title}</h1>
        <p>
          Vite, React, TailwindCss, DailyUiCss, React-Router, ApiCalls,
          localStorage
        </p>
        <hr></hr>
        {/* Navigation! */}
        <nav className="my-5">
          Navigation:
          <ul className="flex gap-3">
            <li>
              <NavLink to="/" className="">
                Home
              </NavLink>
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
