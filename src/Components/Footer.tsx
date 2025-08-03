import { Container } from './ui';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <Container className="py-6">
        <div className="text-center text-sm text-gray-500">
          <p>Built with React, TypeScript, and the GitHub API</p>
        </div>
      </Container>
    </footer>
  );
}