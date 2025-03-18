
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";


import { toast } from "sonner"
const Navbar = () => {

  const [loading,setLoading] = useState(false);
  const [code,setCode] = useState("");
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false)

  const changeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setCode(e.target.value);
  }

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true)
    
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/access`,{
          method: "POST",
          headers: {
              "Content-Type": "application/json", 
            },
          body: JSON.stringify({
              secretCode : code
          })
      })
      const data = await response.json();
      console.log(data);
      if(data.success) {
          localStorage.setItem("authToken",data.token);
          console.log("Authenticated");
          toast.success("Authenticated");
          setOpen(false)
        
          
      }
      else {
          setError(data.error);
          toast.error(data.error)
      }
      setLoading(false)
      setCode("")
    }
  
  return (
    <header className="w-full border-b border-border/40 fixed top-0 z-50 backdrop-blur-md bg-background/80">
      <div className="container flex items-center justify-between mx-auto h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tight animate-fade-in">
            Contest<span className="text-primary">Tracker</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">

        <ModeToggle/>

        
        <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button variant="default">
          Add videos
        </Button>
      </DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black backdrop-blur-lg"/>

      <DialogContent className="rounded-lg">
        <DialogHeader>
          <DialogTitle>Enter the secret code</DialogTitle>
          <DialogDescription>
          Please enter your secret code to able to submit videos.
          </DialogDescription>
        </DialogHeader>
       <form onSubmit={handleSubmit}>
          <div className="space-y-4 flex flex-col justify-start items-start">
        <div className="space-y-2 w-full">
          <Label htmlFor="secretCode">
            Secret Code
          </Label>
          <Input
          id="secretCode"
          name="secretCode"
          placeholder="Enter the secret code"
          required
          value={code}
          onChange={changeCode}
          />
          {error && (
                    <div className="text-sm font-medium text-destructive">
                      {error}
                    </div>
                  )}
        </div>
        <DialogFooter>
        <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Authenticating..." : "Authenticate"}
                </Button>
        </DialogFooter>
          </div>
       </form>
      </DialogContent>
    </Dialog>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
