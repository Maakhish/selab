import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  // here this is to 
  // When a user clicks "Sign in with Google" on your React login page
  // redirect them to the backend's OAuth2 login page.
  const handleGoogleSignIn = () => {
    // Redirect to the backend's OAuth2 login URL
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };
  

  return (
    <div 
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/image/img1.png')" }} 
    >
      <div className="bg-black/80 backdrop-blur-md p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-white">PhD Connect</h2>
        <p className="text-sm text-gray-300 text-center mb-4">
          Platform for PhD student's Progress tracker
        </p>

        {/* Role Selection */}
        <Tabs defaultValue="student" className="w-full mb-4">
          <TabsList className="flex bg-gray-700/50 p-1 rounded-md w-full">
            <TabsTrigger 
              value="student" 
              className="w-1/2 py-2 text-lg font-medium transition 
                         data-[state=active]:bg-white/90 data-[state=active]:shadow 
                         data-[state=active]:text-black data-[state=inactive]:text-gray-300"
            >
              Student
            </TabsTrigger>
            <TabsTrigger 
              value="Admin" 
              className="w-1/2 py-2 text-lg font-medium transition 
                         data-[state=active]:bg-white/90 data-[state=active]:shadow 
                         data-[state=active]:text-black data-[state=inactive]:text-gray-300"
            >
              Admin
            </TabsTrigger>
          </TabsList>

          {/* Student Login (Google Sign-In Only) */}
          <TabsContent value="student">
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2 border-gray-500 bg-gray-800 text-white hover:bg-gray-700"
                onClick={handleGoogleSignIn} // Navigate on click
              >
                <FcGoogle className="text-lg" /> Sign in with Google
              </Button>
            </div>
          </TabsContent>

          {/* Admin Login (Email & Password) */}
          <TabsContent value="Admin">
            <div className="space-y-3">
              <label className="text-sm font-medium text-white">Username</label>
              <Input type="text" placeholder="Enter your Admin Username" className="border-gray-500 bg-gray-800 text-white placeholder-gray-400" />

              <label className="text-sm font-medium text-white">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="border-gray-500 bg-gray-800 text-white placeholder-gray-400 pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Login</Button>
            </div>
          </TabsContent>
        </Tabs>

        <p className="text-xs text-gray-400 text-center mt-4">
          For students of National Institute of Technology Calicut
        </p>
      </div>
    </div>
  );
}
