import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <h2>Welcome to Meet AI</h2>
      <p className="text-muted-foreground max-w-sm">
        This is a simple app that lets you connect, chat, and collaborate with
        high-quality video calls. Experience seamless meetings, screen sharing,
        and real-time chat—just like Google Meet.
      </p>
      <strong>Server says:</strong> {hello.greeting}
    </HydrateClient>
  );
}
