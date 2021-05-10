import firebase from "../../firebase";
import * as types from "./types";

async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  const ref = firebase.storage().ref().child(`uploads/${Date.now()}`);
  const snapshot = await ref.put(blob);
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

export const changePhoto = ({ uri }) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_CHANGE_PHOTO_LOADING });
    const photo = await uploadImageAsync(uri);

    const user = await firebase.auth().currentUser;
    await user.updateProfile({ photoURL: photo });

    dispatch({ type: types.USER_CHANGE_PHOTO_COMPLETED, payload: user });
  } catch ({ message }) {
    dispatch({ type: types.USER_CHANGE_PHOTO_ERROR, payload: message });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_LOG_IN_LOADING });
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    dispatch({ type: types.USER_LOG_IN_COMPLETED, payload: user });
  } catch ({ message }) {
    dispatch({ type: types.USER_LOG_IN_ERROR, payload: message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: types.USER_LOG_OUT_LOADING });
    dispatch({ type: types.USER_LOG_OUT_COMPLETED });
  } catch ({ message }) {
    dispatch({ type: types.USER_LOG_OUT_ERROR, payload: message });
  }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_REGISTER_LOADING });
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await user.updateProfile({
      displayName: name,
    });

    dispatch({ type: types.USER_REGISTER_COMPLETED, payload: user });
  } catch ({ message }) {
    dispatch({ type: types.USER_REGISTER_ERROR, payload: message });
  }
};

export const edit = ({ name, email, password }) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_EDIT_LOADING });
    const user = await firebase.auth().currentUser;

    name && (await user.updateProfile({ displayName: name }));
    email && (await user.updateEmail(email));
    password && (await user.updatePassword(password));

    dispatch({ type: types.USER_EDIT_COMPLETED, payload: user });
  } catch ({ message }) {
    dispatch({ type: types.USER_EDIT_ERROR, payload: message });
  }
};

export const deleteUser = () => async (dispatch) => {
  try {
    dispatch({ type: types.USER_DELETE_LOADING });
    const user = await firebase.auth().currentUser;
    user.delete();
    dispatch({ type: types.USER_DELETE_COMPLETED });
  } catch ({ message }) {
    dispatch({ type: types.USER_DELETE_ERROR, payload: message });
  }
};
