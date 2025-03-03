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

  // 其他設備
  return 'Other';
}

// 根據設備顯示下載按鈕
const device = detectDevice();
const iosButton = document.getElementById('ios-button');
const androidButton = document.getElementById('android-button');
const unsupportedDevice = document.getElementById('unsupported-device');

if (device === 'iOS') {
  iosButton.style.display = 'block';
} else if (device === 'Android') {
  androidButton.style.display = 'block';
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
