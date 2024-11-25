import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cl.duoc.asistenciaduoc',
  appName: 'registro-app',
  webDir: 'www',
  plugins: {
    CapacitorSQLite: {
    iosDatabaseLocation: 'Library/CapacitorDatabase',
    iosIsEncryption: false,
    iosKeychainPrefix: 'YOUR_APP_NAME',
    iosBiometric: {
        biometricAuth: false,
        biometricTitle : "Biometric login for capacitor sqlite"
    },
    androidIsEncryption: false,
    androidBiometric: {
        biometricAuth : false,
        biometricTitle : "Biometric login for capacitor sqlite",
        biometricSubTitle : "Log in using your biometric"
    },
    electronIsEncryption: false,
    electronWindowsLocation: "C:\\ProgramData\\CapacitorDatabases",
    electronMacLocation: "/Volumes/Development_Lacie/Development/Databases",
    electronLinuxLocation: "Databases"
    }
  }
};

export default config;
