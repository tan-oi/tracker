
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {

  return (
    <header className="w-full border-b border-border/40 fixed top-0 z-50 backdrop-blur-md bg-background/80">
      <div className="container flex items-center justify-between mx-auto h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tight animate-fade-in">
            Contest<span className="text-primary">Tracker</span>
          </h1>
        </div>
        
        <ModeToggle/>
      </div>
    </header>
  );
};

export default Navbar;
