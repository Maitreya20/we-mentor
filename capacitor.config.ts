
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.f79ed97d26ac4b8fb9927127f50e7943',
  appName: 'liquid-lift-helper',
  webDir: 'dist',
  server: {
    url: 'https://f79ed97d-26ac-4b8f-b992-7127f50e7943.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
      signingType: undefined,
    }
  },
  plugins: {
    // Add plugin configurations here if needed
  }
};

export default config;
