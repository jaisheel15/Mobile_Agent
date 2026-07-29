# Mobile Agent

A privacy-first, on-device AI agent that runs entirely on your phone — no cloud, no API keys, no data leaving your device. Built with Expo 57, React Native, and [llama.rn](https://github.com/nicklausw/llama.rn) for local LLM inference.

## Overview

Mobile Agent downloads and runs a quantized LLM (Qwen 3.5 4B Q4_K_M) directly on-device via `llama.rn`. The model operates in an **agentic loop** — it can reason, respond, and call device-native tools (like reading battery level) autonomously, without ever hitting a server.

### Key Features

- **Fully offline inference** — the model runs locally via `llama.rn` with a 4096-token context window
- **Agentic tool calling** — the AI can invoke registered device tools and loop until the task is complete
- **In-app model management** — download, track progress, and load the GGUF model from Settings
- **Extensible tool system** — add new capabilities by dropping a `.tool.ts` file and registering it
- **Dark-mode, glassmorphic UI** — custom design system with Geist, Inter, and JetBrains Mono typography

## Tech Stack

| Layer       | Technology                                                                                            |
| ----------- | ----------------------------------------------------------------------------------------------------- |
| Framework   | [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/) / React Native 0.86                            |
| Navigation  | Expo Router (file-based, typed routes)                                                                |
| LLM Runtime | [llama.rn](https://github.com/nicklausw/llama.rn) (GGUF, CPU)                                         |
| State       | [Zustand](https://github.com/pmndrs/zustand)                                                          |
| Styling     | [NativeWind](https://www.nativewind.dev/) v5 + Tailwind CSS 4 + [GlueStack UI](https://gluestack.io/) |
| Animations  | [Legend Motion](https://legendapp.com/open-source/motion/) + Reanimated 4                             |
| Lists       | [@shopify/flash-list](https://shopify.github.io/flash-list/)                                          |

## Project Structure

```
src/
├── ai/
│   ├── agent.ts              # Agentic loop (reason → tool-call → repeat)
│   ├── chat.ts               # Chat completion helper
│   ├── llama.ts              # llama.rn context initialisation
│   ├── modelDownloader.ts    # HuggingFace GGUF download + file mgmt
│   ├── useDownloadModel.tsx  # React hook for download lifecycle
│   ├── tool/
│   │   ├── tool.ts           # Tool type definition
│   │   ├── registry.ts       # Runtime tool registry
│   │   ├── executor.ts       # Safe tool executor with error boundary
│   │   └── initialize.ts    # Auto-registers all tools on startup
│   └── tools/
│       └── getBatteryLevel.tool.ts   # Example: reads device battery
├── app/
│   ├── _layout.tsx           # Root layout
│   └── (tabs)/
│       ├── _layout.tsx       # Tab bar (Home, Chat, Profile, Settings)
│       ├── index.tsx         # Home screen
│       ├── chat.tsx          # Chat interface
│       ├── profile.tsx       # Profile screen
│       └── settings.tsx      # Model download & management
├── stores/
│   ├── messagestore.ts       # Chat message state
│   └── modelstore.ts         # Model download / load / inference state
└── theme/
    ├── index.ts              # Design tokens (colors, typography, spacing)
    ├── provider.tsx          # Theme context provider
    └── useTheme.ts           # Hook to consume the theme

components/
├── chat/
│   ├── ChatInput.tsx
│   ├── ChatMessages.tsx
│   └── ChatView.tsx
├── settings/
│   └── ModelDownloader.tsx
└── ui/                        # GlueStack primitives (Box, Button, Card, etc.)
```

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **bun** (used as the package manager — see `bun.lock`)
- An Android or iOS device / emulator with enough storage (~2.5 GB for the model)

### Install & Run

```bash
# 1. Install dependencies
bun install

# 2. Start the Expo dev server
bun start
# or
npx expo start
```

Then press **`a`** for Android or **`i`** for iOS in the terminal, or scan the QR code with Expo Go.

### Download the Model

1. Open the app and navigate to the **Settings** tab.
2. Tap **Download Model** — this pulls `Qwen3.5-4B-Q4_K_M.gguf` (~2.5 GB) from HuggingFace and stores it on-device.
3. Once downloaded, the model loads automatically and the **Chat** tab becomes active.

## Adding a New Tool

1. Create a file in `src/ai/tools/` following the naming convention `<name>.tool.ts`:

```typescript
import { Tool } from "../tool/tool";

export const myTool: Tool = {
  name: "my_tool",
  description: "Describe what this tool does",
  parameters: {
    type: "object",
    properties: {
      arg1: { type: "string", description: "First argument" },
    },
    required: ["arg1"],
  },
  execute: async (args) => {
    // Your logic here
    return { result: args.arg1 };
  },
};
```

2. Register it in `src/ai/tool/initialize.ts`:

```typescript
import { myTool } from "../tools/myTool.tool";
registerTool(myTool);
```

The agent loop will automatically discover and offer the tool to the LLM.

## Scripts

| Command           | Description               |
| ----------------- | ------------------------- |
| `bun start`       | Start the Expo dev server |
| `bun run android` | Build and run on Android  |
| `bun run ios`     | Build and run on iOS      |
| `bun run web`     | Start the web version     |
| `bun run lint`    | Run ESLint via Expo       |

## License

[MIT](./LICENSE)
