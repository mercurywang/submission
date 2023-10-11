import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
    this.authKey = namespace + 'token';
  }

  getAccessToken() {
    AsyncStorage.getItem(this.authKey);
  }

  setAccessToken(accessToken) {
    AsyncStorage.setItem(this.authKey, accessToken);
  }

  removeAccessToken() {
    AsyncStorage.removeItem(this.authKey);
  }
}

export default AuthStorage;
