import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { Stack } from 'expo-router';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { ThemeProvider } from '../theme/provider';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <KeyboardProvider>
        <GluestackUIProvider mode="system">
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </GluestackUIProvider>
      </KeyboardProvider>
    </ThemeProvider>
  );
}
