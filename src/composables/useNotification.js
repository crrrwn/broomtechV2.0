import { ref } from 'vue';

export function useNotification() {
  const notification = ref(null);

  const showNotification = ({ type, title, message, duration = 3000 }) => {
    notification.value = {
      type,
      title,
      message,
      show: true
    };

    // Auto-hide notification after duration
    setTimeout(() => {
      hideNotification();
    }, duration);

    // You can also implement a toast notification system here
    console.log(`${type.toUpperCase()}: ${title} - ${message}`);
  };

  const hideNotification = () => {
    if (notification.value) {
      notification.value.show = false;
    }
  };

  return {
    notification,
    showNotification,
    hideNotification
  };
}