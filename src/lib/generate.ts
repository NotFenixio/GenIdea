console.log('🪄🦕 https://github.com/hackclub/wizard-orpheus')

interface Variable {
  value: any;
  description: string;
}

interface Message {
  role: string;
  content?: string;
  tool_calls?: ToolCall[];
  tool_call_id?: string; // Add this line
}

interface ToolCall {
  id: string;
  function: {
    name: string;
    arguments: string;
  };
}

interface Tool {
  type: string;
  function: {
    name: string;
    description: string;
    parameters: {
      type: string;
      properties: {
        [key: string]: {
          response: {
            type: string;
            description: string;
          };
        };
      };
      required: string[];
    };
  };
}

class WizardOrpheus {
  private apiHost: string;
  private apiKey: string;
  private prompt: string;
  private model: string;
  private variables: { [key: string]: Variable };
  private messages: Message[];
  private tools: Tool[];
  private outputFunctions: { [key: string]: Function };

  constructor(openAiApiKey: string, prompt: string) {
    if (openAiApiKey && !prompt) {
      prompt = openAiApiKey;
      openAiApiKey = '';
    }

    this.apiHost = 'https://wizard-orpheus.hackclub.dev/api';
    this.apiKey = openAiApiKey;
    this.prompt = prompt;
    this.model = "gpt-4-turbo-preview";
    this.variables = {};
    this.messages = [
      {
        role: 'system',
        content: `${this.prompt}

You MUST call a function. Do not reply with a message under any circumstance.`
      }
    ];
    this.tools = [];

    this.outputFunctions = {};
  }

  variable(name: string, description: string, defaultValue: any): void {
    this.variables[name] = {
      value: defaultValue,
      description
    };
  }
  // @ts-ignore: yes, typescript, it is indeed neccesary
  createUserAction({ name, parameters, howBotShouldHandle }: { name: string; parameters: string[]; howBotShouldHandle: string }): void {
    this[name as keyof WizardOrpheus] = (...args: any[]) => {
      let inputObj: { [key: string]: any } = {};

      args.forEach((arg, i) => {
        inputObj[parameters[i]] = arg;
      });

      this.messages.push({
        role: 'user',
        content: `The user used the '${name}' action with the following user-provided input: ${JSON.stringify(inputObj)}"

Determine your next action and pick the most appropriate tool to call. You MUST call a tool, and not reply a message.

Update the values of currentVariables with your latest state and include them in your call to the tool. These are the current values of currentVariables: ${JSON.stringify(this.variables)}
`
      });

      fetch(`${this.apiHost}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Wizard-Orpheus-URL': window.location.href,
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey} `,
        },
        body: JSON.stringify({
          model: this.model,
          temperature: 1.3,
          messages: this.messages,
          tools: this.tools,
          tool_choice: 'auto'
        })
      })
        .then(resp => resp.json())
        .then(body => {
          let botReply = body.choices[0].message;
          this.messages.push({
            "role": "assistant",
            "tool_calls": botReply.tool_calls
          });

          botReply.tool_calls.forEach((botAction: ToolCall) => {
            this.messages.push({
              "role": "tool",
              "tool_call_id": botAction.id,
              "content": 'ok'
            });

            this.outputFunctions[botAction.function.name](JSON.parse(botAction.function.arguments));
          });
        });
    };
  }

  botAction(type: string, prompt: string, args: { [key: string]: string }, callback: Function): void {
    args['currentVariables'] = `A JSON list of all currentVariables, with their current values, modified as needed based on the action taken by ChatGPT. In this format: ${JSON.stringify(this.variables)}`;

    let props: { [key: string]: { response: { type: string; description: string } } } = {};

    for (let key in args) {
      props[key] = {
        response: {
          type: 'string',
          description: args[key]
        }
      };
    }

    this.tools.push({
      type: 'function',
      function: {
        name: type,
        description: prompt,
        parameters: {
          type: 'object',
          properties: props,
          required: Object.keys(args)
        }
      }
    });

    this.outputFunctions[type] = callback;
  }
}

export async function generateIdea(): Promise<string> {
  const prompt = `You're a smart idea generator.
    You must generate simple ideas for projects, like a website, app, platform, service, gadget, etc.
    Simple as in they take little time to do, don't suggest rewritting Google.
    The ideas should be simple, short, and silly, really silly, and random too. 
    Use fun things like 'what if you...', 'what about', 'oh, oh! a...', etc.
    Your answers should be in lowercase.`;
  return new Promise((resolve) => {
    const wizard = new WizardOrpheus("", prompt);

    wizard.createUserAction({
      name: "generateIdea",
      parameters: [],
      howBotShouldHandle: "Generate an idea and send a message back"
    });

    wizard.botAction("sendMessage", "Send a message back to the user, with the generated idea", { idea: "the generated idea" }, (data: { idea: string }) => {
      return resolve(data.idea);
    });

    (wizard as any).generateIdea();
  });
}