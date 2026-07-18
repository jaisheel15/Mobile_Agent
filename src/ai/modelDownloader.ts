import { Directory, File, Paths } from "expo-file-system";

const MODEL_URL =
  "https://huggingface.co/unsloth/Qwen3.5-4B-GGUF/resolve/main/Qwen3.5-4B-Q4_K_M.gguf";

const MODELS_DIR = new Directory(Paths.document, "models");

const MODEL_FILE = new File(
  MODELS_DIR,
  "Qwen3.5-4B-Q4_K_M.gguf"
);

export function getModelFile() {
  return MODEL_FILE;
}

export function getModelPath() {
  return MODEL_FILE.uri;
}

export function isModelDownloaded() {
  return MODEL_FILE.exists;
}

export async function downloadModel(
  onProgress?: (progress: number) => void
): Promise<File> {
  // Already exists
  if (MODEL_FILE.exists) {
    return MODEL_FILE;
  }

  // Create directory if needed (idempotent so it's safe to call even if it exists)
  if (!MODELS_DIR.exists) {
    MODELS_DIR.create({
      intermediates: true,
      idempotent: true,
    });
  }

  const task = File.createDownloadTask(
    MODEL_URL,
    MODEL_FILE,
    {
      onProgress: ({ bytesWritten, totalBytes }) => {
        if (totalBytes <= 0) return;

        onProgress?.(bytesWritten / totalBytes);
      },
    }
  );

  const downloadedFile = await task.downloadAsync();

  // downloadAsync returns File on success or null if paused — never returns an invalid File
  if (!downloadedFile) {
    throw new Error("Download was paused or failed to complete");
  }

  return downloadedFile;
}