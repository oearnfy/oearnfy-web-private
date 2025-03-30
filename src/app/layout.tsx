import './globals.css';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'OEARNFY',
  description: 'Learn how to earn money online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="eth-provider" content="none" />
        <meta name="web3-support" content="false" />
        <meta name="dapp" content="false" />
        <Script
          id="web3-blocker"
          strategy="beforeInteractive"
        >{`
          (function() {
            if (typeof window !== 'undefined') {
              // Store original methods
              const _defineProperty = Object.defineProperty;
              const _Object = Object;

              // Override Object.defineProperty
              Object.defineProperty = function(obj, prop, desc) {
                if (obj === window && (prop === 'ethereum' || prop === 'web3')) {
                  console.log('Blocked attempt to inject ' + prop);
                  return obj;
                }
                return _defineProperty.call(Object, obj, prop, desc);
              };

              // Create empty ethereum object
              const emptyEthereum = {
                isMetaMask: false,
                request: () => Promise.reject(new Error('Web3 is not supported')),
                on: () => {},
                removeListener: () => {},
                providers: [],
                _metamask: {
                  isUnlocked: () => Promise.resolve(false)
                }
              };

              // Pre-define ethereum and web3
              try {
                window.ethereum = emptyEthereum;
                window.web3 = null;
              } catch (e) {
                console.log('Failed to pre-define Web3 objects');
              }

              // Block provider injection
              Object.defineProperties(window, {
                'ethereum': {
                  configurable: false,
                  writable: false,
                  value: emptyEthereum
                },
                'web3': {
                  configurable: false,
                  writable: false,
                  value: null
                }
              });
            }
          })();
        `}</Script>
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 