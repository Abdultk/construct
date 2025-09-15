
'use client';
import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { ShieldCheck, Mail, MessageSquare, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Logo } from "@/components/logo"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function MfaPage() {
  const loginHeroImage = PlaceHolderImages.find(p => p.id === 'login-hero');
  const [resendDisabled, setResendDisabled] = React.useState(true);
  const [countdown, setCountdown] = React.useState(30);

  React.useEffect(() => {
    if (resendDisabled) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendDisabled]);

  const handleResendCode = () => {
    setResendDisabled(true);
    setCountdown(30);
  }

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
          <h2 className="text-3xl font-bold font-headline">Secure Your Account</h2>
          <p className="mt-2">Multi-factor authentication adds an extra layer of protection.</p>
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] gap-6">
          <div className="grid gap-2 text-center">
            <Logo />
            <h1 className="text-3xl font-bold font-headline mt-4">Security Verification</h1>
            <p className="text-balance text-muted-foreground">
              Please enter the 6-digit code sent to your selected method.
            </p>
          </div>
          <div className="grid gap-4">
            <RadioGroup defaultValue="email" className="grid grid-cols-3 gap-4">
                <div>
                    <RadioGroupItem value="sms" id="sms" className="peer sr-only" />
                    <Label htmlFor="sms" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        <MessageSquare className="mb-3 h-6 w-6" />
                        SMS
                    </Label>
                </div>
                <div>
                    <RadioGroupItem value="email" id="email" className="peer sr-only" />
                    <Label htmlFor="email" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        <Mail className="mb-3 h-6 w-6" />
                        Email
                    </Label>
                </div>
                <div>
                    <RadioGroupItem value="authenticator" id="authenticator" className="peer sr-only" />
                    <Label htmlFor="authenticator" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        <Smartphone className="mb-3 h-6 w-6" />
                        App
                    </Label>
                </div>
            </RadioGroup>
            <div className="grid gap-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input id="code" type="text" inputMode="numeric" maxLength={6} required autoFocus />
            </div>

            <div className="flex items-center justify-between">
                <Button onClick={handleResendCode} variant="link" size="sm" disabled={resendDisabled} className="p-0">
                  Resend code {resendDisabled && `in ${countdown}s`}
                </Button>
                <Link href="/login" className="text-sm underline">
                    Use a different method
                </Link>
            </div>
            
            <Button type="submit" className="w-full font-bold">
              Verify
            </Button>
            
          </div>
          <div className="mt-4 text-center text-sm">
            Having trouble?{" "}
            <Link href="#" className="underline">
              Contact Support
            </Link>
          </div>
          <div className="text-center text-xs text-muted-foreground mt-6">
            <Link href="#" className="underline">Terms of Service</Link> ・ <Link href="#" className="underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
