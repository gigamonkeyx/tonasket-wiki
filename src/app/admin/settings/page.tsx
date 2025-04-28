'use client';

import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ApiKeyManager from '@/components/admin/settings/ApiKeyManager';
import EnvironmentSettings from '@/components/admin/settings/EnvironmentSettings';

export default function AdminSettingsPage() {
  return (
    <AdminLayout
      title="Settings"
      description="Configure application settings and API keys"
    >
      <div className="space-y-8">
        {/* API Key Management */}
        <ApiKeyManager />
        
        {/* Environment Settings */}
        <EnvironmentSettings />
      </div>
    </AdminLayout>
  );
}
