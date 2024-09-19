export function Header() {
  return (
    <header className="fixed inset-x-0 py-4 px-4 bg-white  backdrop-blur-2xl z-in">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <a href="#" className="font-bold text-lg">
            <span>Material Tailwind</span>
          </a>
          <div className="flex gap-3"></div>
        </div>
      </div>
    </header>
  );
}
