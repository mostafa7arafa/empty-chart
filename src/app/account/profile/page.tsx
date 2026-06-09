"use client";

import { User, Camera } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
      <h2 className="font-bold text-lg mb-6">Profile Settings</h2>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-20 h-20 rounded-full bg-navy-900 dark:bg-gold-500 flex items-center justify-center">
          <User className="w-8 h-8 text-white dark:text-navy-900" />
          <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center border-2 border-white">
            <Camera className="w-3.5 h-3.5 text-navy-900" />
          </button>
        </div>
        <div>
          <p className="font-bold">Demo User</p>
          <p className="text-sm text-[var(--muted-foreground)]">demo@emptychartpro.com</p>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input type="text" defaultValue="Demo" className="w-full h-10 px-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input type="text" defaultValue="User" className="w-full h-10 px-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" defaultValue="demo@emptychartpro.com" className="w-full h-10 px-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input type="tel" defaultValue="+20 123 456 7890" className="w-full h-10 px-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]" />
          </div>
        </div>
        <div className="border-t border-[var(--border)] pt-4">
          <h3 className="font-medium text-sm mb-3">Change Password</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Current Password</label>
              <input type="password" className="w-full h-10 px-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">New Password</label>
              <input type="password" className="w-full h-10 px-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]" />
            </div>
          </div>
        </div>
        <button type="submit" className="px-6 h-10 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-xl font-medium text-sm hover:opacity-90">
          Save Changes
        </button>
      </form>
    </div>
  );
}
