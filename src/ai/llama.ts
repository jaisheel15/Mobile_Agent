import { initLlama } from "llama.rn";

export async function loadLlama(modelPath: string) {
  // Strip 'file://' prefix since native C++ (fopen) doesn't support URI schemas
  const cleanPath = modelPath.startsWith('file://') ? modelPath.slice(7) : modelPath;
  console.log("Attempting to load model from path:", cleanPath);

  return await initLlama({
    model: cleanPath,
    n_ctx: 4096,
    n_threads: 4,
    // Set to 0 to force CPU mode. GPU (Metal/OpenCL) often crashes on Android emulators or low-memory devices.
    n_gpu_layers: 0, 
  });
}