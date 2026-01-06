import React, { useState } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileInfo from '../components/profile/ProfileInfo';
import SecuritySection from '../components/profile/SecuritySection';
import WishlistSection from '../components/profile/WishlistSection';
import { User, Heart, Lock } from 'lucide-react';

const ProfilePage = () => {
  // Mock user data
  const [userData, setUserData] = useState({
    uid: "FPSnIvibgwYalzJIYtzbsmKCogz1",
    email: "shivamsahotra3@gmail.com",
    name: "Shivam Sahotra",
    profileImg: "https://lh3.googleusercontent.com/a/ACg8ocI2iXJIL5ui_YEOAu2jfonZmhqCdz4Qglk5vkMZlDP5bVhwyg=s96-c",
    provider: "google.com",
    emailVerified: true,
    createdAt: "Sun, 09 Nov 2025 17:20:32 GMT",
    lastLoginAt: "Sun, 28 Dec 2025 06:21:40 GMT"
  });

  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <ProfileHeader userData={userData} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation Tabs */}
          <div className="glass-card rounded-2xl p-2 mb-8 inline-flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-xl font-medium
                    transition-all duration-300
                    ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground shadow-glow'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'profile' && (
              <ProfileInfo userData={userData} setUserData={setUserData} />
            )}
            {activeTab === 'wishlist' && <WishlistSection />}
            {activeTab === 'security' && <SecuritySection />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;