import * as Location from "expo-location";
import { Tool } from "../tool/tool";

export const getLocationTool: Tool = {
  name: "get_location",
  description:
    "Get the current GPS location of the device (latitude, longitude, altitude). Requires location permission from the user.",
  parameters: {
    type: "object",
    properties: {},
    required: [],
  },
  execute: async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return {
        error: "Location permission was denied by the user",
        suggestion:
          "The user has not granted location access. Ask them to enable it in Settings if they want location-based features.",
      };
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      altitude: location.coords.altitude,
      accuracy: location.coords.accuracy,
      timestamp: new Date(location.timestamp).toISOString(),
    };
  },
};
