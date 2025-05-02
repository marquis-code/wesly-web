/**
 * Safely formats a number with locale settings and fallbacks for undefined/null values
 * @param {number|string|null|undefined} value - The value to format
 * @param {string} locale - The locale to use for formatting (defaults to 'en-US')
 * @param {object} options - Formatting options for toLocaleString()
 * @param {string} fallback - What to return if value is null/undefined (defaults to '0')
 * @returns {string} - The formatted number as a string
 */
export function formatNumber(value, locale = 'en-US', options = {}, fallback = '0') {
    // Return fallback if value is null or undefined
    if (value === null || value === undefined) {
      return fallback;
    }
    
    // Convert string to number if needed
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    // Handle NaN after conversion
    if (isNaN(numValue)) {
      return fallback;
    }
    
    // Format with locale
    try {
      return numValue?.toLocaleString(locale, options);
    } catch (error) {
      console.warn('Error formatting number:', error);
      return fallback;
    }
  }
  
  /**
   * Safely accesses nested object properties without causing null/undefined errors
   * @param {object} obj - The object to access properties from
   * @param {string} path - Dot notation path to the property
   * @param {any} defaultValue - Value to return if path doesn't exist
   * @returns {any} - The value at the path or the default value
   */
  export function safeGet(obj, path, defaultValue = null) {
    if (obj === null || obj === undefined) {
      return defaultValue;
    }
    
    const keys = path.split('.');
    let result = obj;
    
    for (const key of keys) {
      if (result === null || result === undefined || typeof result !== 'object') {
        return defaultValue;
      }
      result = result[key];
    }
    
    return result !== undefined ? result : defaultValue;
  }