# Mobile Agent (v1.0 — Device Awareness)

A privacy-first, on-device AI agent that runs entirely on your phone — no cloud, no API keys, no data leaving your device. Built with Expo 57, React Native, and [llama.rn](https://github.com/nicklausw/llama.rn) for local LLM inference.

## Overview

Mobile Agent downloads and runs a quantized LLM (Qwen 3.5 4B Q4_K_M) directly on-device via `llama.rn`. The model operates in an **agentic loop** — it can reason, respond, and call device-native tools (like reading battery level, checking storage, fetching GPS location, or adjusting screen brightness) autonomously, without ever hitting a server.

### Key Features (v1.0)

- **Fully offline inference** — runs locally via `llama.rn` with a 4096-token context window
- **8 Built-in Device Tools** — battery, device specs, storage space, network status, screen brightness control, location (GPS), and time/timezone
- **Dynamic System Prompt** — auto-generates tool capabilities into the LLM system context so the agent proactively calls tools
- **Conversation Persistence** — save, switch, and delete multiple chat sessions stored locally as JSON files
- **Real-time Thinking Indicator** — visual feedback while the agent is processing or calling tools
- **In-app model management** — download, track progress, and load the GGUF model from Settings
- **Extensible tool system** — add new capabilities by dropping a `.tool.ts` file and registering it
- **Dark-mode, glassmorphic UI** — custom design system with Geist, Inter, and JetBrains Mono typography

## Registered Tools (v1.0)

| Tool Name | Description | Source Package |
| --- | --- | --- |
| `get_battery_level` | Get current battery percentage & charging status | `react-native-device-info` |
| `get_device_info` | Model, brand, OS version, total memory, hardware specs | `react-native-device-info` |
| `get_storage_info` | Free, used, and total disk space in GB | `react-native-device-info` |
| `get_network_status` | Connection type (WiFi/cellular/none) and internet status | `@react-native-community/netinfo` |
| `get_brightness` | Read current screen brightness level (0–1) | `expo-brightness` |
| `set_brightness` | Adjust screen brightness level (0–1) | `expo-brightness` |
| `get_location` | Get current GPS latitude, longitude, and altitude | `expo-location` |
| `get_time` | Get local date, time, timezone, and Unix timestamp | Built-in `Date` |

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/) / React Native 0.86 |
| Navigation | Expo Router (file-based, typed routes) |
| LLM Runtime | [llama.rn](https://github.com/nicklausw/llama.rn) (GGUF, CPU) |
| State | [Zustand](https://github.com/pmndrs/zustand) |
| Device APIs | Expo Brightness, Expo Location, React Native Device Info, NetInfo |
| Styling | [NativeWind](https://www.nativewind.dev/) v5 + Tailwind CSS 4 + [GlueStack UI](https://gluestack.io/) |
| Animations | [Legend Motion](https://legendapp.com/open-source/motion/) + Reanimated 4 |
| Lists | [@shopify/flash-list](https://shopify.github.io/flash-list/) |

## Project Structure

```
src/
├── ai/
│   ├── agent.ts              # Agentic loop (reason → tool-call → repeat)
│   ├── chat.ts               # Chat completion helper
│   ├── llama.ts              # llama.rn context initialisation
│   ├── modelDownloader.ts    # HuggingFace GGUF download + file mgmt
│   ├── systemPrompt.ts       # Dynamic system prompt generator
│   ├── useDownloadModel.tsx  # React hook for download lifecycle
│   ├── tool/
│   │   ├── tool.ts           # Tool type definition
│   │   ├── registry.ts       # Runtime tool registry
│   │   ├── executor.ts       # Safe tool executor with error boundary
│   │   └── initialize.ts     # Auto-registers all tools on startup
│   └── tools/
│       ├── getBatteryLevel.tool.ts
│       ├── getBrightness.tool.ts
│       ├── getDeviceInfo.tool.ts
│       ├── getLocation.tool.ts
│       ├── getNetworkStatus.tool.ts
│       ├── getStorageInfo.tool.ts
│       ├── getTime.tool.ts
│       └── setBrightness.tool.ts
├── app/
│   ├── _layout.tsx           # Root layout
│   └── (tabs)/
│       ├── _layout.tsx       # Tab bar (Home, Chat, Profile, Settings)
│       ├── index.tsx         # Home screen with quick prompts & conversation history
│       ├── chat.tsx          # Chat interface with active session & live status
│       ├── profile.tsx       # Profile screen
│       └── settings.tsx      # Model download & management
├── stores/
│   ├── conversationStore.ts  # Multi-conversation lifecycle & index persistence
│   ├── messagestore.ts       # Chat message state & JSON file persistence
│   └── modelstore.ts         # Model download / load / thinking / inference state
└── theme/
    ├── index.ts              # Design tokens (colors, typography, spacing)
    ├── provider.tsx          # Theme context provider
    └── useTheme.ts           # Hook to consume the theme

components/
├── chat/
│   ├── ChatInput.tsx         # Input field with thinking protection & session creation
│   ├── ChatMessages.tsx      # Message bubbles with tool execution & error cards
│   └── ChatView.tsx          # Scrollable message list with auto-scroll & thinking indicator
├── settings/
│   └── ModelDownloader.tsx   # Model download card & progress UI
└── ui/                       # GlueStack primitives (Box, Button, Card, etc.)
```

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **bun** or **npm**
- An Android or iOS device / emulator with enough storage (~2.5 GB for the model)

### Install & Run

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Start the Expo dev server
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

## License

[MIT](./LICENSE)
