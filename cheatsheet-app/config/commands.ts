export const commands = [
    {
      category: "Setup & Config",
      commands: [
        {
          command: "git config --global user.name '[name]'",
          description: "Set your name for commit markers."
        },
        {
          command: "git config --global user.email '[email]'",
          description: "Set your email for commit markers."
        },
      ],
    },
    {
      category: "Basic Commands",
      commands: [
        {
          command: "git init",
          description: "Initialize a local Git repository."
        },
        {
          command: "git clone [url]",
          description: "Clone a repository into a new directory."
        },
      ],
    },
  ];