import { Tool } from "../tool/tool";

export const getTimeTool: Tool = {
  name: "get_time",
  description:
    "Get the current date, time, timezone, and day of the week on the device",
  parameters: {
    type: "object",
    properties: {},
    required: [],
  },
  execute: async () => {
    const now = new Date();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return {
      date: now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
      timezone,
      unixTimestamp: Math.floor(now.getTime() / 1000),
      iso: now.toISOString(),
    };
  },
};
