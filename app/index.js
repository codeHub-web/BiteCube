import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState('Maqhawe');
  const [lastName, setLastName] = useState('Mashiyi');
  const [bio, setBio] = useState('Dreamer. Builder. Tech explorer.');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/120');
  const [mood, setMood] = useState('normal');

  const handleImagePick = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }

    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!image.canceled && image.assets?.[0].uri) {
      setProfileImage(image.assets[0].uri);
    }
  };

  const getMoodColors = () => {
    switch (mood) {
      case 'happy': return ['#fff1a8', '#ffb347'];
      case 'chill': return ['#d0f0c0', '#a8e6cf'];
      case 'dark': return ['#232526', '#414345'];
      default: return ['#ffffff', '#d3d3d3'];
    }
  };

  const getTextColor = () => (mood === 'dark' ? '#fff' : '#333');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient colors={getMoodColors()} style={styles.container}>
        <ScrollView
          contentContainerStyle={[styles.innerContainer, { flexGrow: 1 }]}
          keyboardShouldPersistTaps="handled"
        >
          {/* Profile Picture */}
          <View style={styles.profilePicBox}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            {editMode && (
              <TouchableOpacity style={styles.cameraIcon} onPress={handleImagePick}>
                <Ionicons name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            )}
          </View>

          {/* Edit Button */}
          <TouchableOpacity style={styles.editBtn} onPress={() => setEditMode(!editMode)}>
            <Ionicons name={editMode ? 'checkmark-circle' : 'create-outline'} size={24} color="#000" />
            {!editMode && <Text style={styles.editLabel}>Edit</Text>}
          </TouchableOpacity>

          {/* Input Fields */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: getTextColor() }]}>First Name</Text>
            {editMode ? (
              <TextInput value={firstName} onChangeText={setFirstName} style={styles.input} />
            ) : (
              <Text style={[styles.displayText, { color: getTextColor() }]}>{firstName}</Text>
            )}

            <Text style={[styles.label, { color: getTextColor() }]}>Last Name</Text>
            {editMode ? (
              <TextInput value={lastName} onChangeText={setLastName} style={styles.input} />
            ) : (
              <Text style={[styles.displayText, { color: getTextColor() }]}>{lastName}</Text>
            )}

            <Text style={[styles.label, { color: getTextColor() }]}>Bio</Text>
            {editMode ? (
              <TextInput
                value={bio}
                onChangeText={setBio}
                style={[styles.input, { height: 60 }]}
                multiline
              />
            ) : (
              <Text style={[styles.displayText, { color: getTextColor() }]}>{bio}</Text>
            )}
          </View>

          <Text style={[styles.label, { color: getTextColor(), marginTop: 30 }]}>Interests</Text>
          <View style={styles.interests}>
            <FontAwesome5 name="code" size={28} color={getTextColor()} />
            <Ionicons name="planet" size={30} color={getTextColor()} />
            <FontAwesome5 name="gamepad" size={28} color={getTextColor()} />
            <Ionicons name="book" size={30} color={getTextColor()} />
          </View>

          {/* Mood Section */}
          <Text style={[styles.label, { color: getTextColor(), marginTop: 20 }]}>Today's Mood</Text>
          <View style={styles.moodContainer}>
            <TouchableOpacity onPress={() => setMood('normal')}>
              <FontAwesome5 name="user" size={28} color={mood === 'normal' ? '#000' : '#999'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMood('happy')}>
              <Ionicons name="sunny" size={30} color={mood === 'happy' ? '#f5a623' : '#999'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMood('chill')}>
              <Ionicons name="leaf" size={30} color={mood === 'chill' ? '#6ab04c' : '#999'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMood('dark')}>
              <Ionicons name="moon" size={30} color={mood === 'dark' ? '#fff' : '#999'} />
            </TouchableOpacity>
          </View>
          
        </ScrollView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 60,
  },
  profilePicBox: {
    width: 130,
    height: 130,
    borderRadius: 20,
    backgroundColor: '#ccc',
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15,
    padding: 5,
  },
  editBtn: {
    position: 'absolute',
    top: 40,
    right: 30,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  editLabel: {
    fontSize: 12,
    color: '#000',
    marginTop: 2,
  },
  inputGroup: {
    width: '85%',
    marginTop: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    backgroundColor: 'rgba(200, 200, 200, 0.3)',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    fontSize: 16,
  },
  displayText: {
    fontSize: 16,
    paddingVertical: 8,
  },
  moodContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  interests: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
    justifyContent: 'center',
  },
});
