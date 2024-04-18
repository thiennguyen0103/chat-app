interface ChatWelcomeProps {
  name: string;
}

export const ChatWelcome = ({ name }: ChatWelcomeProps) => {
  return (
    <div className="mb-4 space-y-2 px-4">
      <p className="text-xl font-bold md:text-3xl">{`Welcome to ${name}`}</p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {`This is the start of your conversation with ${name}`}
      </p>
    </div>
  );
};
