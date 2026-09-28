import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="font-mono text-sm text-[var(--foreground-muted)]">404</p>
      <h1 className="text-2xl font-medium">Page not found</h1>
      <p className="max-w-md text-[var(--foreground-muted)]">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Button href="/" variant="primary" className="mt-2">
        Back to home
      </Button>
    </Container>
  );
}
