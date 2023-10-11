import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
    this.authKey = namespace + 'token';
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(this.authKey);
    return token;
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(this.authKey, accessToken);
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(this.authKey);
  }
}

export default AuthStorage;
