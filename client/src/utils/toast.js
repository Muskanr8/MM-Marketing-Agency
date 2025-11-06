let toastContainer = null;

const createToastContainer = () => {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
    `;
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
};

export const showToast = (message, type = 'info', duration = 3000) => {
  const container = createToastContainer();

  const toast = document.createElement('div');
  const bgColor = {
    success: '#10b981',
    error: '#ef4444',
    info: '#3b82f6',
    warning: '#f59e0b',
  }[type] || '#3b82f6';

  toast.style.cssText = `
    background-color: ${bgColor};
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    font-size: 14px;
    font-weight: 500;
    animation: slideIn 0.3s ease-in-out;
    display: flex;
    align-items: center;
    gap: 8px;
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(400px); opacity: 0; }
    }
  `;
  if (!document.head.querySelector('style[data-toast]')) {
    style.setAttribute('data-toast', 'true');
    document.head.appendChild(style);
  }

  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-in-out';
    setTimeout(() => toast.remove(), 300);
  }, duration);
};
