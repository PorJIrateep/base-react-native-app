# i18n Migration from react-native-i18n to react-i18next

This project has been migrated from the deprecated `react-native-i18n` to the modern `react-i18next` library while maintaining the same API interface.

## What Changed

- **Library**: Changed from `react-native-i18n` to `react-i18next`
- **API**: **NO CHANGE** - You can still use `I18n.t("key")` exactly as before
- **Configuration**: Updated to use react-i18next's configuration system

## Usage

The API remains exactly the same as before:

```javascript
import I18n from '../i18n';

// Translate a key
const text = I18n.t('Login'); // Returns "Login" or "เข้าสู่ระบบ"

// Change language
I18n.changeLanguage('th'); // Switch to Thai
I18n.changeLanguage('en'); // Switch to English

// Get current language
const currentLang = I18n.language; // Returns current language code
```

## Available Languages

- **English (en)**: Default fallback language
- **Thai (th)**: Thai translations

## Language Files

Translation files are located in:
- `app/i18n/locales/en.js` - English translations
- `app/i18n/locales/th.js` - Thai translations

## Example Usage in Components

```javascript
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import I18n from '../i18n';

export default function MyComponent() {
  return (
    <>
      <Text>{I18n.t('greeting')}</Text>
      <TouchableOpacity onPress={() => I18n.changeLanguage('th')}>
        <Text>{I18n.t('Continue')}</Text>
      </TouchableOpacity>
    </>
  );
}
```

## Language Switching with App Restart

The app now supports automatic restart when changing languages to ensure all components update properly:

```javascript
// Change language and restart app (recommended)
I18n.changeLanguage('th'); // App will restart automatically

// Change language without restart (some components may not update)
I18n.changeLanguageWithoutRestart('th');
```

### Language Persistence

The selected language is automatically saved and restored when the app starts:

```javascript
// Get stored language preference
const storedLang = await I18n.getStoredLanguage();

// Clear stored language (reset to default)
await I18n.clearStoredLanguage();
```

### Language Switching Options

1. **With Restart (Recommended)**: 
   - Ensures all components update
   - Saves language preference
   - App restarts automatically
   ```javascript
   I18n.changeLanguage('th'); // Will restart app
   ```

2. **Without Restart**:
   - Faster switching
   - Some components may not update immediately
   - Good for quick previews
   ```javascript
   I18n.changeLanguageWithoutRestart('th');
   ```

## Available Translation Keys

Some commonly used keys include:
- `Login` / `Log_Out`
- `Password` / `Username`
- `greeting` / `Menu`
- `Continue` / `Back` / `Next`
- `Save` / `Cancel` / `OK`
- `Home` / `Profile` / `Settings`

See the complete list in the locale files.

## Benefits of react-i18next

- **Modern**: Actively maintained and up-to-date
- **Performance**: Better performance and memory usage
- **Features**: More advanced features like namespaces, interpolation, etc.
- **React Integration**: Better React integration with hooks
- **Compatibility**: Backward compatible with your existing code

## Advanced Features (Optional)

While maintaining the old API, you can also use advanced react-i18next features:

```javascript
// Using interpolation
I18n.t('welcome_message', { name: 'John' });

// Using hooks in functional components (optional)
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <Text>{t('Login')}</Text>;
}
```

## Migration Complete ✅

Your existing code will continue to work without any changes. Just import from the new location and use `I18n.t()` as before!