import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '404 - Page Not Found | CODEER',
    description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-4 uppercase" style={{ fontFamily: 'var(--font-gugi)' }}>
                    404
                </h1>
                <p className="text-xl text-gray-400 mb-8">Page not found</p>
                <a
                    href="/"
                    className="bg-white text-black px-6 py-3 rounded font-medium hover:bg-gray-200 transition-colors"
                >
                    Go back to CODEER
                </a>
            </div>
        </div>
    );
}
