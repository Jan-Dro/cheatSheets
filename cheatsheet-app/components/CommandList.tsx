interface Command {
    command: string;
    description: string;
  }
  
  interface CommandListProps {
    commands: Command[];
  }
  
  const CommandList: React.FC<CommandListProps> = ({ commands }) => {
    return (
      <div>
        {commands.map((cmd, index) => (
          <div key={index}>
            <p><strong>{cmd.command}</strong></p>
            <p>{cmd.description}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default CommandList;