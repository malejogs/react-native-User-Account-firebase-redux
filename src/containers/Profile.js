import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button, Paragraph, Dialog } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components";

import UserForm from "../components/UserForm";
import Avatar from "../components/Avatar";

import {
  logout,
  edit,
  deleteUser,
  changePhoto,
} from "../state/reducers/actions";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 10px;
`;

const Profile = ({ navigation }) => {
  const [isEditForm, setIsEditForm] = useState(false);
  const [visibleDialogDelete, setvisibleDialogDelete] = React.useState(false);

  const showDialog = () => setvisibleDialogDelete(true);

  const hideDialog = () => setvisibleDialogDelete(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const { data } = useSelector(({ userReducer }) => userReducer);
  const { displayName: name, email, password, photoURL } = data || {};

  const dispatch = useDispatch();

  const toggleEditForm = () => setIsEditForm((isEdit) => !isEdit);

  const uploadPhoto = (photo) => {
    dispatch(changePhoto(photo));
  };

  return (
    <Container>
      <Avatar photoURL={photoURL} handleOnChange={uploadPhoto} />

      <UserForm
        isEUpdateForm
        initialValues={{ name, email, password }}
        buttonText="save"
        handleSubmit={(data) => dispatch(edit(data))}
        readonly={!isEditForm}
        onReset={toggleEditForm}
      />

      {isEditForm ? (
        <Button style={{ marginTop: 30 }} mode="text" onPress={showDialog}>
          Delete account
        </Button>
      ) : (
        <>
          <Button
            style={{ marginTop: 10 }}
            mode={isEditForm ? "outlined" : "contained"}
            onPress={toggleEditForm}
          >
            Edit account
          </Button>
          <Button
            style={{ marginTop: 50 }}
            mode="outlined"
            onPress={() => dispatch(logout())}
          >
            Log Out
          </Button>
        </>
      )}

      <Dialog visible={visibleDialogDelete} onDismiss={hideDialog}>
        <Dialog.Title>DELETE ACCOUNT</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Are you sure you want to delete your account?</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button
            onPress={() => {
              dispatch(deleteUser());
              hideDialog();
            }}
          >
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Container>
  );
};

export default Profile;
