// 檢測用戶設備
function detectDevice() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // 檢測是否為 iOS 設備
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS';
  }

  // 檢測是否為 Android 設備
  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  // 檢測是否為 Windows 或 macOS 設備
  if (/Win|Mac/i.test(userAgent)) {
    return 'Desktop';
  }

  // 其他設備
  return 'Other';
}

// 根據設備顯示下載按鈕
const device = detectDevice();
const iosButton = document.getElementById('ios-button');
const androidButton = document.getElementById('android-button');
const desktopButton = document.getElementById('desktop-button');
const unsupportedDevice = document.getElementById('unsupported-device');

if (device === 'iOS') {
  iosButton.style.display = 'block';
} else if (device === 'Android') {
  androidButton.style.display = 'block';
} else if (device === 'Desktop') {
  desktopButton.style.display = 'block';
} else {
  unsupportedDevice.style.display = 'block';
}

// iOS 按鈕點擊事件
iosButton.addEventListener('click', () => {
  alert('請點擊分享按鈕，然後選擇「添加到主屏幕」來安裝此應用程式。');
});

// Android 按鈕點擊事件
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;

  androidButton.addEventListener('click', () => {
    deferredPrompt.prompt(); // 顯示安裝提示
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('用戶接受了安裝提示');
      } else {
        console.log('用戶拒絕了安裝提示');
      }
      deferredPrompt = null;
    });
  });
});

// 桌面按鈕點擊事件
desktopButton.addEventListener('click', () => {
  alert('請使用瀏覽器的「添加到主屏幕」或「安裝應用程式」功能來安裝此應用程式。');
});
