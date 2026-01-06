import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Lock, Mail, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '../ui/alert';

export const SecuritySection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handlePasswordReset = (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
      toast.success('Password reset email sent!', {
        description: 'Check your inbox for further instructions.',
      });
      
      // Reset after 5 seconds
      setTimeout(() => {
        setEmailSent(false);
        setEmail('');
      }, 5000);
    }, 1500);
  };

  return (
    <div className="grid gap-6">
      {/* Password Reset Card */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Password & Security
              </CardTitle>
            </div>
          </div>
          <CardDescription className="text-muted-foreground">
            Reset your password or update your security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {emailSent && (
            <Alert className="border-primary/30 bg-primary/10">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <AlertDescription className="text-foreground">
                A password reset link has been sent to <strong>{email}</strong>. Please check your inbox and spam folder.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handlePasswordReset} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email" className="text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading || emailSent}
                  className="bg-muted/50 border-border focus:border-primary"
                />
                <p className="text-xs text-muted-foreground">
                  We'll send you a secure link to reset your password
                </p>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || emailSent}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 shadow-glow"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : emailSent ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Email Sent
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Reset Link
                </>
              )}
            </Button>
          </form>

          {/* Security Tips */}
          <div className="pt-6 border-t border-border/50">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-primary" />
              Security Tips
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Use a strong password with at least 8 characters, including numbers and symbols</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Never share your password with anyone</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Enable two-factor authentication for extra security</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Update your password regularly</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Additional Security Options */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="text-xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Two-Factor Authentication
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted/50">
                <Lock className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Not enabled</p>
              </div>
            </div>
            <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
              Enable
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySection;