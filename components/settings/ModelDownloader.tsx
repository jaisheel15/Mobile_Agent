import React, { useEffect } from "react";
import { useModelStore } from "../../src/stores/modelstore";
import { useDownloadModel } from "../../src/ai/useDownloadModel";
import { isModelDownloaded, getModelPath } from "../../src/ai/modelDownloader";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { useTheme } from "@/src/theme";
import { StyleSheet } from "react-native";

export default function ModelDownloader() {
  const store = useModelStore();
  const { startDownload } = useDownloadModel();
  const { colors, typography, radius } = useTheme();

  const { downloading, downloaded, loading, loaded, progress, error } = store;

  // Check if model already exists on disk when component mounts
  useEffect(() => {
    if (!downloaded && !downloading && !loading && !loaded) {
      if (isModelDownloaded()) {
        store.setDownloaded(true);
        store.setModelPath(getModelPath());
      }
    }
  }, [downloaded, downloading, loading, loaded, store]);

  function getStatusLabel() {
    if (loaded) return "Model loaded — ready to chat";
    if (loading) return "Loading model into memory…";
    if (downloading) return `Downloading… ${Math.round(progress * 100)}%`;
    if (downloaded) return "Downloaded — tap to load";
    if (error) return "Error — tap to retry";
    return "Model not downloaded";
  }

  function getButtonLabel() {
    if (loaded) return "Ready";
    if (loading) return "Loading…";
    if (downloading) return "Downloading…";
    if (downloaded) return "Load model";
    return "Download model";
  }

  const buttonDisabled = downloading || loading || loaded;
  const progressPercent = Math.round(progress * 100);

  // Use StyleSheet just for the complex glassmorphism styling
  const glassStyle = {
    backgroundColor: "rgba(45, 52, 73, 0.6)", // Matches surfaceVariant with opacity
    borderWidth: 1,
    borderColor: "rgba(132, 148, 149, 0.2)", // matches outline with opacity
    borderRadius: radius.card,
  };

  return (
    <Box 
      className="p-6 overflow-hidden" 
      style={glassStyle}
    >
      <VStack space="md">
        {/* ── Header ── */}
        <HStack space="md" className="items-center">
          <Box 
            className="w-12 h-12 items-center justify-center"
            style={{ backgroundColor: colors.cardElevated, borderRadius: radius.image }}
          >
            <Text className="text-2xl">🧠</Text>
          </Box>
          <VStack className="flex-1">
            <Text 
              style={{ 
                color: colors.text, 
                fontFamily: typography.title.fontFamily,
                fontSize: typography.title.fontSize,
                fontWeight: typography.title.fontWeight 
              }}
            >
              Qwen3.5-4B-Q4_K_M
            </Text>
            <Text 
              className="mt-0.5"
              style={{ 
                color: colors.textMuted, 
                fontFamily: typography.caption.fontFamily,
                fontSize: typography.caption.fontSize 
              }}
            >
              ~2.5 GB · Local LLM
            </Text>
          </VStack>
          {loaded && (
            <Box 
              className="px-2.5 py-1"
              style={{ 
                backgroundColor: colors.glowPrimary,
                borderColor: colors.primary,
                borderWidth: 1,
                borderRadius: radius.badge 
              }}
            >
              <Text 
                style={{ 
                  color: colors.primary, 
                  fontFamily: typography.label.fontFamily,
                  fontSize: 10,
                  fontWeight: typography.label.fontWeight,
                  letterSpacing: typography.label.letterSpacing
                }}
              >
                READY
              </Text>
            </Box>
          )}
        </HStack>

        {/* ── Progress bar (only during download) ── */}
        {(downloading || (downloaded && !loaded)) && (
          <HStack space="sm" className="items-center mt-2">
            <Progress value={progressPercent} className="flex-1 h-1.5" style={{ backgroundColor: colors.cardHighest }}>
              <ProgressFilledTrack style={{ backgroundColor: colors.primary }} />
            </Progress>
            <Text 
              className="text-right min-w-8.5"
              style={{ color: colors.textMuted, fontFamily: typography.monoSm.fontFamily, fontSize: typography.monoSm.fontSize }}
            >
              {downloading ? `${progressPercent}%` : "100%"}
            </Text>
          </HStack>
        )}

        {/* ── Status text ── */}
        <Text 
          className="mt-1"
          style={{ 
            color: error ? colors.error : colors.textMuted, 
            fontFamily: typography.bodySm.fontFamily,
            fontSize: typography.bodySm.fontSize 
          }}
        >
          {getStatusLabel()}
        </Text>

        {/* ── Error detail ── */}
        {error && (
          <Text 
            className="mt-1" 
            numberOfLines={2}
            style={{ 
              color: colors.error, 
              opacity: 0.8,
              fontFamily: typography.caption.fontFamily,
              fontSize: typography.caption.fontSize 
            }}
          >
            {error}
          </Text>
        )}

        {/* ── Action button ── */}
        <Button 
            onPress={startDownload}
            isDisabled={buttonDisabled}
            size="lg"
            className="mt-2"
            style={{
              backgroundColor: loaded ? colors.cardElevated : colors.primary,
              borderRadius: radius.button,
            }}
        >
            {(downloading || loading) && <ButtonSpinner color={loaded ? colors.text : colors.primaryForeground} />}
            <ButtonText
              style={{
                color: loaded ? colors.text : colors.primaryForeground,
                fontFamily: typography.title.fontFamily,
                fontSize: typography.title.fontSize,
                fontWeight: typography.title.fontWeight
              }}
            >
                {getButtonLabel()}
            </ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}