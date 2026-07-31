import { Directory, File, Paths } from "expo-file-system";

const MODEL_URL =
  "https://huggingface.co/unsloth/Qwen3.5-4B-GGUF/resolve/main/Qwen3.5-4B-Q4_K_M.gguf";

const MODELS_DIR = new Directory(Paths.document, "models");

const MODEL_FILE = new File(MODELS_DIR, "Qwen3.5-4B-Q4_K_M.gguf");

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
  onProgress?: (progress: number) => void,
  signal?: AbortSignal
): Promise<File> {
  // Already exists on disk — skip the network step.
  if (MODEL_FILE.exists) {
    return MODEL_FILE;
  }

  // Create directory if needed (idempotent so it's safe to call even if it exists).
  if (!MODELS_DIR.exists) {
    await MODELS_DIR.create({
      intermediates: true,
      idempotent: true,
    });
  }

  try {
    // idempotent: true overwrites any leftover partial file from a previous
    // failed/interrupted download instead of rejecting with DestinationAlreadyExists.
    const downloadedFile = await File.downloadFileAsync(MODEL_URL, MODEL_FILE, {
      idempotent: true,
      onProgress: ({ bytesWritten, totalBytes }) => {
        if (totalBytes <= 0) return;
        onProgress?.(bytesWritten / totalBytes);
      },
      signal,
    });

    return downloadedFile;
  } catch (error) {
    // On Android, a failed/interrupted download can leave a partial file behind.
    // Delete it so isModelDownloaded() does not return a false positive later.
    try {
      if (MODEL_FILE.exists) {
        await MODEL_FILE.delete();
      }
    } catch {
      // best-effort cleanup; ignore secondary errors
    }
    throw error;
  }
}