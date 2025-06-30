import React, { useState, useEffect } from 'react';
import { RefreshCw, Download } from 'lucide-react';

const PWAUpdater: React.FC = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        setRegistration(reg);
        
        // Listen for updates
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setUpdateAvailable(true);
              }
            });
          }
        });
      });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
          setUpdateAvailable(true);
        }
      });
    }
  }, []);

  const handleUpdate = () => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  };

  if (!updateAvailable) return null;

  return (
    <div className="fixed top-20 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-slideInRight">
      <div className="dark-card rounded-2xl p-4 shadow-2xl border border-blue-500/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl">
            <Download className="h-5 w-5 text-white" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white mb-1">Update Available</h3>
            <p className="text-xs text-gray-400">A new version of Bloomy is ready</p>
          </div>
          
          <button
            onClick={handleUpdate}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-3 py-2 rounded-xl font-medium transition-all duration-300 btn-interactive flex items-center gap-2 text-sm"
          >
            <RefreshCw className="h-4 w-4" />
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAUpdater;