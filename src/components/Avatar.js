import React, { useEffect } from "react";
import styled from "styled-components";
import * as ImagePicker from "expo-image-picker";
import { Button, Avatar } from "react-native-paper";
import * as ImageManipulator from "expo-image-manipulator";

const Container = styled.View`
  align-items: center;
  margin-bottom: 20;
`;

const AvatarPhoto = styled(Avatar.Image)`
  width: 210;
  height: 210;
  justify-content: center;
  align-items: center;
`;

const Profile = ({ photoURL, handleOnChange }) => {
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

  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    const resizedPhoto = await ImageManipulator.manipulateAsync(result.uri, [
      { resize: { height: 250 } },
    ]);

    handleOnChange(resizedPhoto);
  };

  return (
    <Container>
      <AvatarPhoto
        size={200}
        source={
          photoURL
            ? {
                uri: photoURL,
              }
            : require("../../assets/avatar.jpeg")
        }
      />
      <Button mode="text" onPress={pickImage}>
        {`${photoURL ? "Change" : "Upload"} photo`}
      </Button>
    </Container>
  );
};

export default Profile;
