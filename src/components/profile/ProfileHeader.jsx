import React from 'react';
import { Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';

export const ProfileHeader = ({ userData }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Background with subtle gradient */}
      <div className="h-64 sm:h-80 bg-gradient-to-br from-card via-card to-muted relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJoc2woMjE1IDIyJSAxOCUgLyAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-32 sm:-mt-40">
          <div className="glass-card rounded-3xl p-8 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
              {/* Avatar */}
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-300" />
                <Avatar className="w-32 h-32 border-4 border-background relative shadow-2xl">
                  <AvatarImage src={userData.profileImg} alt={userData.name} />
                  <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
                    {userData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                  <h1 className="text-3xl sm:text-4xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {userData.name}
                  </h1>
                  {userData.emailVerified && (
                    <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-base mb-4">{userData.email}</p>
                
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Member since:</span>
                    <span className="text-foreground font-medium">
                      {new Date(userData.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-border" />
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Last active:</span>
                    <span className="text-foreground font-medium">
                      {new Date(userData.lastLoginAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;