import { Navbar } from "@/components/layout/navbar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="container mx-auto py-8 px-4">
          {children}
        </div>
      </main>
    </div>
  );
}
