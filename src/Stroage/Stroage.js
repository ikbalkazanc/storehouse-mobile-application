import AsyncStorage from '@react-native-community/async-storage';

export async function Set(key, value,callback) {
  if(typeof callback !== "undefined"){
    try {
      await AsyncStorage.setItem('@' + key, value)
      callback()
    } catch (e) {
      console.log("DataStroage set Error => " + e)
    }
  }
  else{
    try {
      await AsyncStorage.setItem('@' + key, value)
    } catch (e) {
      console.log("DataStroage set Error => " + e)
    }
  }
}

export async function Get(key, callback) {
  try {
    const value = await AsyncStorage.getItem('@' + key)
    callback(value)
  } catch (e) {
    console.log("DataStroage get Error => " + e)
  }
}

export async function Gets(keys, callback) {
  let values
  try {
    values = await AsyncStorage.multiGet(keys)
    callback(values)
  } catch (e) {
    console.log("DataStroage gets Error => " + e)
  }
}

export async function Remove(key) {
  try {
    await AsyncStorage.removeItem('@' + key)
  } catch (e) {
    console.log("DataStroage remove Error => " + e)
    return false
  }
  return true
}

export async function PrintKeys() {
  let keys = []
  try {
    debugger
    keys = await AsyncStorage.getAllKeys()
  } catch (e) {
    console.log("DataStroage print Error => " + e)
  }
  console.log(keys)
}

export async function Clear() {
  try {
    await AsyncStorage.clear()
  } catch (e) {
    console.log("DataStroage clear Error => " + e)
  }
}

