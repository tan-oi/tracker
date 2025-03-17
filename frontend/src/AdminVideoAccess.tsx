import Navbar from "./components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useNavigate } from "react-router"

import { toast } from "sonner"

export default function AdminVideoAccess() {
  const navigate = useNavigate();
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const changeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setCode(e.target.value)
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

        navigate("/")
        
    }
    else {
        setError(data.error);
        toast.error(data.error)
    }
    setLoading(false)
    setCode("")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <Navbar />
      </header>
   
      <main className="flex-1 flex items-center justify-center">
        <Card className="w-[400px] mx-auto">
          <CardHeader>
            <CardTitle>Enter the secret code</CardTitle>
            <CardDescription>Please enter your secret code to able to submit videos</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="secretCode">Secret Code</Label>
                    <Input
                      id="secretCode"
                      name="secretCode"
                      placeholder="Enter your secret code"
                      required
                      value={code}
                      onChange={changeCode}
                    />
                  </div>
                  {error && (
                    <div className="text-sm font-medium text-destructive">
                      {error}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Authenticating..." : "Authenticate"}
                </Button>
              </CardFooter>
            </div>
          </form>
        </Card>
      </main>
    </div>
  )
}
