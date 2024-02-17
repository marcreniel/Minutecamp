// BottomSheetComponent.js
import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';

const BottomSheetComponent = ({ modalRef, snapPoints, handleSheetChanges}: { modalRef: any, snapPoints: any, handleSheetChanges: any}) => {
    const navigation = useNavigation();
    
    const handlePress = () => {
        // Add your logic for the press here
        console.log("Pressable Pressed");

        // Navigate to the Quiz screen
        //@ts-expect-error
        navigation.navigate("Quiz")
        
        // Close the bottom sheet
        modalRef.current?.dismiss();
        
    };

    return (
        <BottomSheetModal
            ref={modalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
        >
            <View style={styles.contentContainer}>
                <Text style={styles.titleText}>Tutorial Complete! 🎉</Text>
                <Text style={styles.descriptionText}>Now, let's take a short quiz on what you watched in order to earn your minute.</Text>
                <Pressable
                    style={({ pressed }) => [
                        styles.pressable,
                        { backgroundColor: pressed ? '#499E49' : '#6CDE6C' }, // Darker green color when pressed, slightly lighter when not pressed
                    ]}
                    onPress={handlePress}
                >
                    <Text style={styles.buttonText}>Take Quiz</Text>
                </Pressable>
            </View>
        </BottomSheetModal>
    );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  pressable: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#6CDE6C', // Darker green color
  },
  buttonText: {
    color: '#FFFFFF', // White text color
  },
});

export default BottomSheetComponent;
