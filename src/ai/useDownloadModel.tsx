import { useCallback, useEffect } from "react";

import { downloadModel, getModelFile, isModelDownloaded } from "./modelDownloader";

import { loadLlama } from "./llama";

import { useModelStore } from "../stores/modelstore";

/**
 * Returns a `startDownload` callback that the UI can call on demand (e.g. a button press).
 * After the download completes it automatically loads the model into llama.rn.
 */
export function useDownloadModel() {
  const store = useModelStore();

  const startDownload = useCallback(async () => {
    // Guard against concurrent calls
    if (store.downloading || store.loading || store.loaded) return;

    try {
      let modelFile;

      if (isModelDownloaded()) {
        // Already on disk — skip the network step
        modelFile = getModelFile();
        store.setDownloaded(true);
        store.setModelPath(modelFile.uri);
      } else {
        store.setDownloading(true);
        store.setError(null);
        store.setProgress(0);

        modelFile = await downloadModel((progress) => {
          store.setProgress(progress);
        });

        store.setDownloading(false);
        store.setDownloaded(true);
        store.setModelPath(modelFile.uri);
      }

      // Load model into llama context
      store.setLoading(true);

      const context = await loadLlama(modelFile.uri);

      store.setContext(context);
      store.setLoading(false);
      store.setLoaded(true);
    } catch (err) {
      console.error(err);
      store.setError(String(err));
      store.setDownloading(false);
      store.setLoading(false);
    }
  }, [store]);

  return { startDownload };
}

/**
 * Auto-loads the model when the component mounts — only if the model is already
 * downloaded and not yet loaded. Suitable for mounting once at the app root
 * after the user has already triggered a download.
 */
export function useLoadModel() {
  const store = useModelStore();
  const { startDownload } = useDownloadModel();

  useEffect(() => {
    // Auto-load if the model is on disk but not yet in memory
    if (
      store.downloaded &&
      store.modelPath &&
      !store.loaded &&
      !store.loading &&
      !store.downloading
    ) {
      startDownload();
    }
  }, [store.downloaded, store.modelPath, store.loaded, store.loading, store.downloading]);
}