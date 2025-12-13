import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { successToast, errorToast, infoToast } from "../utils/toast";
import { Trash2, Save, UploadCloud, Lock } from "lucide-react";



const SettingDashboard = () => {
  const { user, setUser, logout } = useAuth(); // assume setUser exists to update local auth state
  const [loading, setLoading] = useState(false);

  // Profile
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || ""); // read-only
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(""); // dataURL or remote URL

  // Reminders
  const [remindersEnabled, setRemindersEnabled] = useState(user?.remindersEnabled ?? true);
  const [reminderIn, setReminderIn] = useState(user?.reminderIn || "2H");

  // Password change
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Delete
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const deleteConfirmRef = useRef("");

  useEffect(() => {
    // set initial avatarPreview from user profile if exists
    if (user?.avatarUrl) setAvatarPreview(user.avatarUrl);
  }, [user]);

  // Avatar chooser
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Basic client-side validation
    if (!file.type.startsWith("image/")) {
      errorToast("Please choose a valid image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      errorToast("Image too large. Use file < 2MB");
      return;
    }
    setAvatarFile(file);

    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 grid gap-6 md:grid-cols-2">

        {/* Left column - Profile & Reminder */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="border rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Profile</h2>

            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center border">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover"/>
                ) : (
                  <div className="text-sm text-gray-400">No avatar</div>
                )}
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Full name</label>
                <input
                  className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label className="block mt-3 text-sm font-medium text-gray-700">Email</label>
                <input
                  className="mt-1 w-full px-3 py-2 bg-gray-50 border rounded-lg"
                  value={email}
                  disabled
                />
              </div>
            </div>

            {/* Avatar Upload */}
            <div className="mt-4 flex items-center gap-3">
              <label className="inline-flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border bg-white hover:bg-slate-50">
                <UploadCloud size={18}/>
                <span className="text-sm">Change Avatar</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>

              <button
                className="ml-auto inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                onClick={handleSaveProfile}
                disabled={loading}
              >
                <Save size={16} />
                Save Profile
              </button>
            </div>
          </div>

          {/* Reminder Card */}
          <div className="border rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Reminders</h2>

            <div className="flex items-center gap-4 mb-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remindersEnabled}
                  onChange={() => setRemindersEnabled((v) => !v)}
                />
                <span className="text-sm">Enable reminders</span>
              </label>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {["2H", "4H", "6H"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setReminderIn(opt)}
                  className={`px-3 py-2 rounded-lg border ${
                    reminderIn === opt ? "bg-indigo-600 text-white" : "bg-white"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                onClick={handleSaveReminder}
                disabled={loading}
              >
                Save Reminder
              </button>
            </div>
          </div>
        </div>

        {/* Right column - Security & Danger */}
        <div className="space-y-6">
          {/* Change Password */}
          <div className="border rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2"><Lock size={18}/> Change Password</h2>

            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              className="mt-1 w-full px-3 py-2 border rounded-lg"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />

            <label className="block text-sm font-medium text-gray-700 mt-3">New Password</label>
            <input
              type="password"
              className="mt-1 w-full px-3 py-2 border rounded-lg"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <label className="block text-sm font-medium text-gray-700 mt-3">Confirm New Password</label>
            <input
              type="password"
              className="mt-1 w-full px-3 py-2 border rounded-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="mt-4 flex justify-end">
              <button
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                onClick={handleChangePassword}
                disabled={loading}
              >
                Change Password
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="border rounded-xl p-4 bg-red-50">
            <h3 className="text-lg font-semibold text-red-700 mb-2">Danger Zone</h3>
            <p className="text-sm text-red-600 mb-4">Deleting your account is permanent. All data will be lost.</p>

            <div className="flex flex-col gap-3">
              <button
                className="inline-flex items-center gap-2 justify-center w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 size={16} /> Delete Account
              </button>

              {/* confirmation modal area */}
              {showDeleteConfirm && (
                <div className="mt-2 p-3 bg-white border rounded-lg shadow">
                  <p className="text-sm mb-2">Type <strong>DELETE</strong> to confirm:</p>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg mb-2"
                    placeholder='Type "DELETE" here'
                    onChange={(e) => (deleteConfirmRef.current = e.target.value.trim())}
                  />
                  <div className="flex gap-2">
                    <button
                      className="flex-1 bg-gray-200 px-3 py-2 rounded-lg"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg"
                      onClick={handleDeleteAccount}
                      disabled={loading}
                    >
                      Confirm Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SettingDashboard;
