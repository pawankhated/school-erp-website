import { Button, Container } from '@/components/ui';

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="font-display text-7xl text-sea-300">404</p>
      <h1 className="mt-4 font-display text-3xl">This page took a day off</h1>
      <p className="mt-3 text-muted">The page you are looking for does not exist.</p>
      <div className="mt-8 flex justify-center">
        <Button href="/">Back to home</Button>
      </div>
    </Container>
  );
}
