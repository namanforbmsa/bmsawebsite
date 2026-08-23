/**
 * API Configuration
 *
 * Prefer an environment variable in production and fall back to localhost in development.
 */

export const getApiBaseUrl = (): string => {
  const configuredUrl = (import.meta.env.VITE_API_URL ?? '').trim();

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, '');
  }

  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5001';
  }

  return window.location.origin;
};

export const API_BASE_URL = getApiBaseUrl();

/**
 * API endpoint helpers
 */
export const apiEndpoints = {
  // Admin
  login: () => `${API_BASE_URL}/api/admin/login`,
  verify: () => `${API_BASE_URL}/api/admin/verify`,
  
  // Settings
  settings: () => `${API_BASE_URL}/api/settings`,
  settingsTeamMembers: () => `${API_BASE_URL}/api/settings/team-members`,
  settingsFleetStats: () => `${API_BASE_URL}/api/settings/fleet-stats`,
  settingsPolicies: () => `${API_BASE_URL}/api/settings/policies`,
  settingsCopyrightYear: () => `${API_BASE_URL}/api/settings/copyright-year`,
  
  // Services
  services: () => `${API_BASE_URL}/api/services`,
  serviceDetail: (slug: string) => `${API_BASE_URL}/api/services/${slug}`,
  
  // Uploads
  uploadTeamPhoto: () => `${API_BASE_URL}/api/upload/team-photo`,
  deleteTeamPhoto: (assetKey: string) => `${API_BASE_URL}/api/upload/team-photo?key=${encodeURIComponent(assetKey)}`,
  uploadServiceImage: () => `${API_BASE_URL}/api/upload/service-image`,
  deleteServiceImage: (assetKey: string) => `${API_BASE_URL}/api/upload/service-image?key=${encodeURIComponent(assetKey)}`,
  
  // Contact
  contact: () => `${API_BASE_URL}/api/contact`,
};
