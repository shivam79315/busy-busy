import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Edit2, Save, X, Mail, Calendar, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../ui/badge';

export const ProfileInfo = ({ userData, setUserData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(userData.name);

  const handleSave = () => {
    setUserData({ ...userData, name: editedName });
    setIsEditing(false);
    toast.success('Profile updated successfully!', {
      description: 'Your display name has been updated.',
    });
  };

  const handleCancel = () => {
    setEditedName(userData.name);
    setIsEditing(false);
  };

  return (
    <div className="grid gap-6">
      {/* Personal Information Card */}
      <Card className="glass-card border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Personal Information
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-1">
              Manage your personal details and profile settings
            </CardDescription>
          </div>
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="sm"
              className="gap-2 border-primary/30 hover:bg-primary/10"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleCancel}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                size="sm"
                className="gap-2 bg-primary hover:bg-primary/90 shadow-glow"
              >
                <Save className="w-4 h-4" />
                Save
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Display Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Display Name
            </Label>
            {isEditing ? (
              <Input
                id="name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="bg-muted/50 border-border focus:border-primary"
              />
            ) : (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                <span className="text-foreground font-medium">{userData.name}</span>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </Label>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
              <span className="text-foreground">{userData.email}</span>
              {userData.emailVerified && (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Email cannot be changed</p>
          </div>

          {/* Account Details Grid */}
          <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-border/50">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Account Created
              </Label>
              <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                <p className="text-foreground">
                  {new Date(userData.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Last Login
              </Label>
              <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                <p className="text-foreground">
                  {new Date(userData.lastLoginAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Provider Info */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Sign-in Provider</Label>
            <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
              <span className="text-foreground capitalize">{userData.provider.replace('.com', '')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileInfo;
