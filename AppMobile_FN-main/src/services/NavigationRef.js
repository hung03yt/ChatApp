import { createNavigationContainerRef } from '@react-navigation/native';

export const NavigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
