import { CenterModal, ThemeText, Button } from '../chunk-IGGCYN5N.mjs';
import '../chunk-TCUDEVCQ.mjs';
import '../chunk-FOUCWFCB.mjs';
import { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform, Linking, View } from 'react-native';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/hooks/usePermission/getPermissionInfo.ts
function getPermissionInfo(permission) {
  if (Object.prototype.hasOwnProperty.call(PERMISSIONS_INFO, permission))
    return PERMISSIONS_INFO[permission];
  return {
    title: "Permission Required",
    description: "This app needs permission to function properly."
  };
}
var PERMISSIONS_INFO = {
  // Storage permissions
  "android.permission.READ_EXTERNAL_STORAGE": {
    title: "Storage Access",
    description: "To scan and play your local music files, this app requires access to your device's storage. This allows us to automatically find and organize your audio library so you can enjoy your music seamlessly."
  },
  "android.permission.WRITE_EXTERNAL_STORAGE": {
    title: "Storage Access",
    description: "This app needs permission to save files to your device's storage. This allows you to download and store content locally."
  },
  "android.permission.READ_MEDIA_AUDIO": {
    title: "Audio Files Access",
    description: "To scan and play your local music files, this app requires access to your audio files. This allows us to automatically find and organize your music library."
  },
  "android.permission.READ_MEDIA_VIDEO": {
    title: "Video Files Access",
    description: "This app needs access to your video files to display and play them. Your privacy is important, we only access videos you choose to interact with."
  },
  "android.permission.READ_MEDIA_IMAGES": {
    title: "Photos Access",
    description: "This app needs access to your photos to display and share them. Your privacy is important, we only access images you choose to interact with."
  },
  // Camera and Microphone
  "android.permission.CAMERA": {
    title: "Camera Access",
    description: "This app needs access to your camera to capture photos and videos. No images are stored without your permission."
  },
  "android.permission.RECORD_AUDIO": {
    title: "Microphone Access",
    description: "This app needs access to your microphone to record audio. Audio is only recorded when you actively choose to do so."
  },
  // Location permissions
  "android.permission.ACCESS_FINE_LOCATION": {
    title: "Location Access",
    description: "This app needs access to your precise location to provide location-based features and services."
  },
  "android.permission.ACCESS_COARSE_LOCATION": {
    title: "Location Access",
    description: "This app needs access to your approximate location to provide location-based features and services."
  },
  "android.permission.ACCESS_BACKGROUND_LOCATION": {
    title: "Background Location",
    description: "This app needs access to your location in the background to continue providing location-based services when the app is not actively in use."
  },
  // Contacts
  "android.permission.READ_CONTACTS": {
    title: "Contacts Access",
    description: "This app needs access to your contacts to help you connect and share with your friends."
  },
  "android.permission.WRITE_CONTACTS": {
    title: "Contacts Access",
    description: "This app needs permission to save contacts to your device."
  },
  // Calendar
  "android.permission.READ_CALENDAR": {
    title: "Calendar Access",
    description: "This app needs access to your calendar to display and manage your events."
  },
  "android.permission.WRITE_CALENDAR": {
    title: "Calendar Access",
    description: "This app needs permission to create and modify calendar events."
  },
  // Phone
  "android.permission.READ_PHONE_STATE": {
    title: "Phone State Access",
    description: "This app needs access to your phone state to improve your experience and provide better functionality."
  },
  "android.permission.CALL_PHONE": {
    title: "Phone Call Access",
    description: "This app needs permission to make phone calls on your behalf."
  },
  "android.permission.READ_CALL_LOG": {
    title: "Call Log Access",
    description: "This app needs access to your call history."
  },
  "android.permission.WRITE_CALL_LOG": {
    title: "Call Log Access",
    description: "This app needs permission to modify your call history."
  },
  // SMS
  "android.permission.SEND_SMS": {
    title: "SMS Access",
    description: "This app needs permission to send text messages."
  },
  "android.permission.RECEIVE_SMS": {
    title: "SMS Access",
    description: "This app needs permission to receive text messages."
  },
  "android.permission.READ_SMS": {
    title: "SMS Access",
    description: "This app needs access to read your text messages."
  },
  // Sensors
  "android.permission.BODY_SENSORS": {
    title: "Body Sensors Access",
    description: "This app needs access to your body sensors (like heart rate monitors) to track your fitness and health data."
  },
  "android.permission.ACTIVITY_RECOGNITION": {
    title: "Activity Recognition",
    description: "This app needs permission to recognize your physical activity (like walking, running) to provide better fitness tracking."
  },
  // Bluetooth
  "android.permission.BLUETOOTH_CONNECT": {
    title: "Bluetooth Access",
    description: "This app needs permission to connect to Bluetooth devices."
  },
  "android.permission.BLUETOOTH_SCAN": {
    title: "Bluetooth Scan",
    description: "This app needs permission to discover and pair with nearby Bluetooth devices."
  },
  // Notifications
  "android.permission.POST_NOTIFICATIONS": {
    title: "Notifications",
    description: "This app would like to send you notifications to keep you updated with important information."
  }
};
function PermissionModal({ permission, requestPermission, onDeny, permissionStatus, description, renderModalUI, ...props }) {
  const info = getPermissionInfo(permission);
  if (renderModalUI) {
    return renderModalUI({
      requestPermission,
      permissionStatus,
      content: info,
      setIsModalVisible: props.setVisible,
      permission
    });
  }
  return /* @__PURE__ */ jsx(
    CenterModal,
    {
      ...props,
      preventCloseRequest: true,
      style: { borderRadius: 20, padding: 8 },
      children: /* @__PURE__ */ jsxs(View, { style: { gap: 24 }, children: [
        /* @__PURE__ */ jsxs(View, { style: { alignItems: "center", width: "100%", gap: 8 }, children: [
          /* @__PURE__ */ jsx(ThemeText, { style: { fontSize: 24, fontWeight: "600" }, children: "Permission Required" }),
          /* @__PURE__ */ jsx(ThemeText, { color: "text-secondary", style: { fontSize: 16, textAlign: "center", paddingHorizontal: 8 }, children: description ?? info.description })
        ] }),
        /* @__PURE__ */ jsxs(View, { style: { flexDirection: "row", gap: 8, alignItems: "center", justifyContent: "flex-end", width: "100%" }, children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              color: "primary",
              variant: "solid",
              title: permissionStatus === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ? "Settings" : "Allow",
              onPress: requestPermission
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              title: "Deny",
              onPress: onDeny,
              variant: "outlined",
              color: "text"
            }
          )
        ] })
      ] })
    }
  );
}
function usePermission({ permission, autoRequest = false, onDeny, onGrant, modalDescription, renderModalUI }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState(PermissionsAndroid.RESULTS.DENIED);
  async function requestPermission() {
    if (Platform.OS !== "android") return;
    try {
      const result = await PermissionsAndroid.request(permission);
      setPermissionStatus(result);
      handlePermission(result);
    } catch (error) {
      console.error(error);
      setIsModalVisible(false);
    }
  }
  function handlePermission(result) {
    switch (result) {
      case PermissionsAndroid.RESULTS.GRANTED:
        onGrant?.();
        return setIsModalVisible(false);
      case PermissionsAndroid.RESULTS.DENIED:
        return setIsModalVisible(true);
      case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
        return isModalVisible ? Linking.openSettings() : setIsModalVisible(true);
    }
  }
  function Modal() {
    function handleDeny() {
      if (onDeny) return onDeny();
      setIsModalVisible(false);
    }
    return /* @__PURE__ */ jsx(
      PermissionModal,
      {
        visible: isModalVisible,
        setVisible: setIsModalVisible,
        permission,
        permissionStatus,
        requestPermission,
        description: modalDescription,
        onDeny: handleDeny,
        renderModalUI
      }
    );
  }
  useEffect(() => {
    if (autoRequest) {
      requestPermission();
    }
  }, []);
  return {
    requestPermission,
    permissionStatus,
    PermissionModal: Modal
  };
}

export { usePermission };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map