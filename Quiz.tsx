import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, Modal, Animated } from 'react-native';
import data from './data/QuizData';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const QuizScreen = ({ navigation }: { navigation: any }) => {
    const allQuestions = data;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);
    const [progress, setProgress] = useState(new Animated.Value(0));

    const validateAnswer = (selectedOption: string) => {
        const correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        //@ts-ignore
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        if (selectedOption === correct_option) {
            setScore(score + 1);
        }
        setShowNextButton(true);
    };

    const handleNext = () => {
        if (currentQuestionIndex === allQuestions.length - 1) {
            setShowScoreModal(true);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex + 1,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    };

    const restartQuiz = () => {
        setShowScoreModal(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
        setShowNextButton(false);
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    };

    const renderQuestion = () => (
        <View style={{ marginVertical: 40 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Text style={{ color: "#000000", fontSize: 20, opacity: 0.6, marginRight: 2 }}>
                    {currentQuestionIndex + 1}
                </Text>
                <Text style={{ color: "#000000", fontSize: 18, opacity: 0.6 }}>/ {allQuestions.length}</Text>
            </View>
            <Text style={{ color: '#000000', fontSize: 30 }}>{allQuestions[currentQuestionIndex]?.question}</Text>
        </View>
    );

    const renderOptions = () => (
        <View>
            {allQuestions[currentQuestionIndex]?.options.map((option: string) => (
                <TouchableOpacity
                    key={option}
                    onPress={() => validateAnswer(option)}
                    disabled={isOptionsDisabled}
                    style={{
                        borderWidth: 3,
                        borderColor:
                            option === correctOption
                                ? "#00C851"
                                : option === currentOptionSelected
                                ? "#ff4444"
                                : `${"#5DB075"}50`,
                        backgroundColor:
                            option === correctOption
                                ? `${"#00C851"}20`
                                : option === currentOptionSelected
                                ? `${"#ff4444"}20`
                                : `${"#5DB075"}10`,
                        height: 60,
                        borderRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        marginVertical: 10,
                    }}
                >
                    <Text style={{ fontSize: 20, color: '#000000' }}>{option}</Text>
                    {option === correctOption ? (
                        <View
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 30 / 2,
                                backgroundColor: "#00C851",
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <MaterialCommunityIcons name="check" style={{ color: "#FFFFFF", fontSize: 20 }} />
                        </View>
                    ) : option === currentOptionSelected ? (
                        <View
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 30 / 2,
                                backgroundColor: "#ff4444",
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <MaterialCommunityIcons name="close" style={{ color: "#FFFFFF", fontSize: 20 }} />
                        </View>
                    ) : null}
                </TouchableOpacity>
            ))}
        </View>
    );

    const renderNextButton = () =>
        showNextButton ? (
            <TouchableOpacity
                onPress={handleNext}
                style={{ marginTop: 20, width: '100%', backgroundColor: "#00C851", padding: 20, borderRadius: 18 }}
            >
                <Text style={{ fontSize: 20, color: '#000000', textAlign: 'center' }}>Next</Text>
            </TouchableOpacity>
        ) : null;

    const renderProgressBar = () => (
        <View style={{ width: '100%', height: 20, borderRadius: 20, backgroundColor: '#00000020' }}>
            <Animated.View
                style={[
                    {
                        height: 20,
                        borderRadius: 20,
                        backgroundColor: "#5DB075",
                    },
                    {
                        width: progress.interpolate({
                          inputRange: [0, allQuestions.length],
                          outputRange: ['0%','100%']
                      }),
                    },
                ]}
            />
        </View>
    );

    const renderScoreModal = () => (
        <Modal animationType="slide" transparent={true} visible={showScoreModal}>
            <View style={{ flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
                <View
                    style={{
                        backgroundColor: '#FFFFFF',
                        width: '90%',
                        borderRadius: 20,
                        padding: 20,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                        {score > allQuestions.length / 2 ? 'Congratulations!' : 'Oops!'}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 20 }}>
                        <Text style={{ fontSize: 30, color: score > allQuestions.length / 2 ? "#00C851" : "#ff4444" }}>
                            {score}
                        </Text>
                        <Text style={{ fontSize: 20, color: "#000000" }}>/ {allQuestions.length}</Text>
                    </View>
                    {score > allQuestions.length / 2 && (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Home")}
                            style={{ backgroundColor: "#00C851", padding: 20, width: '100%', borderRadius: 20 }}
                        >
                            <Text style={{ textAlign: 'center', color: "#000000", fontSize: 20 }}>Exit back to app</Text>
                        </TouchableOpacity>
                    )}

                    {score <= allQuestions.length / 2 && (
                      <TouchableOpacity
                        onPress={restartQuiz}
                        style={{ backgroundColor: "#00C851", padding: 20, width: '100%', borderRadius: 20 }}
                      >
                        <Text style={{ textAlign: 'center', color: "#000000", fontSize: 20 }}>Retry Quiz</Text>
                      </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    flex: 1,
                    paddingVertical: 40,
                    paddingHorizontal: 16,
                    backgroundColor: '#FFFFFF',
                    position: 'relative',
                }}
            >
                {renderProgressBar()}
                {renderQuestion()}
                {renderOptions()}
                {renderNextButton()}
                {renderScoreModal()}
            </View>
        </SafeAreaView>
    );
};

export default QuizScreen;
