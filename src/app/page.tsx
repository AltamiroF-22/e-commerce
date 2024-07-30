"use client";

import Container from "./components/Container";
import UseLoginModal from "./hooks/useLogingModal";

export default function Home() {
  const loginModal = UseLoginModal();

  const handleLoginModal = () => {
    loginModal.onOpen();
  };
  return (
    <Container>
      <nav className="flex justify-between items-center p-5 px-20 border-b">
        <ul className="flex gap-3">
          <li>products</li>
          <li>products</li>
          <li>products</li>
        </ul>

        <div className="">logo</div>

        <button
          className=" bg-slate-950 text-white py-2 px-8 rounded-full"
          onClick={handleLoginModal}
        >
          Login
        </button>
      </nav>
    </Container>
  );
}
