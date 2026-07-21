export type Tool = {
    name: string;
    description: string;
  
    parameters: {
      type: "object";
      properties: Record<
        string,
        {
          type: "string" | "number" | "boolean";
          description: string;
        }
      >;
      required: string[];
    };
  
    execute: (args: Record<string, any>) => Promise<any>;
  };

//Example of a tool that can be used by the AI to perform specific tasks    

// const weatherTool: Tool = {
//     name: "get_weather",
//     description: "Get the weather for a city",
  
//     parameters: {
//       type: "object",
//       properties: {
//         city: {
//           type: "string",
//           description: "City name",
//         },
//       },
//       required: ["city"],
//     },
  
//     async execute(args) {
//       return {
//         temperature: 30,
//         city: args.city,
//       };
//     },
//   };