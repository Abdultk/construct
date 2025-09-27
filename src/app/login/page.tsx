
'use client';
import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { Eye, EyeOff, ShieldCheck } from "lucide-react"
import * as msal from "@azure/msal-browser";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Logo } from "@/components/logo"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID", // This should be replaced with your actual Client ID
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID", // This should be replaced with your Tenant ID
    redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : '/auth/callback',
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

export default function LoginPage() {
  const loginHeroImage = PlaceHolderImages.find(p => p.id === 'login-hero');
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleMicrosoftSignIn = async () => {
    try {
      await msalInstance.loginPopup({
        scopes: ["Files.ReadWrite.All", "offline_access"],
      });
      // On successful login, you would typically handle the token and user info.
      // For this prototype, we'll just redirect to the dashboard.
       toast({
        title: "Login Successful",
        description: "You have successfully signed in with Microsoft.",
      });
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Could not sign in with Microsoft. Please try again.",
      });
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
       <div className="hidden bg-muted lg:block relative">
        {loginHeroImage && (
          <Image
            src={loginHeroImage.imageUrl}
            alt="Image"
            width="1920"
            height="1080"
            data-ai-hint={loginHeroImage.imageHint}
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-8 text-white">
          <h2 className="text-3xl font-bold font-headline">AI-Powered Schedule Optimization</h2>
          <p className="mt-2">Predict delays, optimize resources, and keep your projects on track.</p>
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <Logo />
            <h1 className="text-3xl font-bold font-headline mt-4">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2 relative">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type={showPassword ? "text" : "password"} required />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-7 h-7 w-7"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
                <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember-me" />
              <Label htmlFor="remember-me" className="text-sm font-normal">Remember Me</Label>
            </div>
            <Button type="submit" className="w-full font-bold">
              Sign In
            </Button>
            <Button variant="outline" className="w-full" onClick={handleMicrosoftSignIn}>
              Sign In with Microsoft
            </Button>
            <div className="flex items-center justify-center">
                <Badge variant="secondary" className="gap-1">
                    <ShieldCheck className="h-3 w-3 text-ai-accent"/>
                    <span className="text-muted-foreground">AI-Powered Security</span>
                </Badge>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
          <div className="text-center text-xs text-muted-foreground mt-6">
            <Link href="#" className="underline">Support</Link> ・ <Link href="#" className="underline">Terms of Service</Link> ・ <Link href="#" className="underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
