import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import ModelDownloader from "../../../components/settings/ModelDownloader";
import { useTheme } from "@/src/theme";

export default function Settings() {
    const { colors, typography, spacing } = useTheme();

    return (
        <SafeAreaView 
            className="flex-1" 
            style={{ backgroundColor: colors.background }}
        >
            <ScrollView
                contentContainerStyle={{ 
                    paddingTop: 24, 
                    paddingBottom: 48,
                }}
                showsVerticalScrollIndicator={false}
            >
                <VStack style={{ gap: spacing[3] }}>
                    {/* ── Page header ── */}
                    <Box className="px-6 mb-2">
                        <Text 
                            style={{ 
                                color: colors.text, 
                                fontFamily: typography.displayMobile.fontFamily,
                                fontSize: typography.displayMobile.fontSize,
                                fontWeight: typography.displayMobile.fontWeight,
                                letterSpacing: typography.displayMobile.letterSpacing,
                            }}
                        >
                            Settings
                        </Text>
                        <Text 
                            className="mt-1"
                            style={{ 
                                color: colors.textMuted, 
                                fontFamily: typography.body.fontFamily,
                                fontSize: typography.body.fontSize,
                            }}
                        >
                            Manage your local model
                        </Text>
                    </Box>

                    {/* ── Section label ── */}
                    <Text 
                        className="px-6 mb-1"
                        style={{ 
                            color: colors.textMuted,
                            fontFamily: typography.label.fontFamily,
                            fontSize: typography.label.fontSize,
                            letterSpacing: typography.label.letterSpacing,
                            textTransform: "uppercase"
                        }}
                    >
                        Local Model
                    </Text>

                    {/* ── Model card ── */}
                    <Box className="px-6">
                        <ModelDownloader />
                    </Box>
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}
