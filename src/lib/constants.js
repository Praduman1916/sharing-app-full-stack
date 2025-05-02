export const PLATFORMS = [
    { value: 'GitHub', label: 'GitHub' },
    { value: 'Twitter', label: 'Twitter' },
    { value: 'LinkedIn', label: 'LinkedIn' },
    // Add all platforms from Figma
  ];
  
  export const URL_PATTERNS = {
    GitHub: /^(https?:\/\/)?(www\.)?github\.com\/.+/i,
    Twitter: /^(https?:\/\/)?(www\.)?twitter\.com\/.+/i,
    // Add regex for other platforms
  };