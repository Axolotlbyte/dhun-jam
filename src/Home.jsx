import { Outlet, Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/login">Login</Link> */}
      <Outlet />
    </>
  );
}
