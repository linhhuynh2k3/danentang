// Imports
import { StyleSheet, Text, TouchableOpacity, Vibration, View } from "react-native";
import { useState } from "react";

// Calculator Component
const Calculator = () => {
    // State for dark mode and colors
    const [darkMode, setDarkMode] = useState(false);
    const bgColorFunction = darkMode ? "#414853" : "#ededed";
    const bgColorNumber = darkMode ? "#303946" : "#fff";
    const bgColorResult = darkMode ? "#282f3b" : "#f5f5f5";
    const bgColorThemeButton = darkMode ? "#7b8084" : "#e5e5e5";
    const textColorHistory = darkMode ? "#858B8B" : "#757C7C";
    const colorIcon = darkMode ? "white" : "black";

    // State for calculation
    const [currentNumber, setCurrentNumber] = useState("");
    const [lastNumber, setLastNumber] = useState("");

    // Button arrays
    const buttonsLeft = [
        ["C", "DEL"],
        ["7", "8", "9"],
        ["4", "5", "6"],
        ["1", "2", "3"],
        ["0", "."],
    ];

    const buttonsRight = ["÷", "×", "-", "+", "="];

    // Handle input for buttons
    const handleInput = (buttonPress) => {
        switch (buttonPress) {
            case "+":
            case "-":
            case "×":
            case "÷":
                setCurrentNumber(currentNumber + buttonPress);
                break;
            case "DEL":
                setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
                break;
            case "C":
                setCurrentNumber("");
                setLastNumber("");
                break;
            case "=":
                setLastNumber(currentNumber);
                calculate();
                break;
            default:
                setCurrentNumber(currentNumber + buttonPress);
                break;
        }
    };

    // Calculate result
    const calculate = () => {
        try {
            let result = eval(currentNumber.replace("×", "*").replace("÷", "/"));
            setCurrentNumber(result.toString());
        } catch (error) {
            setCurrentNumber("Error");
        }
    };

    // Styles
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        containerResult: {
            flex: 1,
            justifyContent: "space-around",
            alignItems: "flex-end",
            backgroundColor: bgColorResult,
        },
        containerButton: {
            flex: 3,
            flexDirection: "row",
        },
        containerButtonLeft: {
            flex: 3,
        },
        containerButtonRight: {
            flex: 1,
            backgroundColor: bgColorFunction,
        },
        containerRow: {
            flex: 1,
            flexDirection: "row",
        },
        button: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: bgColorNumber,
        },
        buttonText: {
            fontSize: 30,
            fontWeight: "bold",
        },
        themeButton: {
            marginTop: 50,
            marginLeft: 20,
            borderRadius: 90,
            height: 60,
            width: 60,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: bgColorThemeButton,
        },
        themeButtonText: {
            fontSize: 30,
            color: colorIcon,
        },
        historyText: {
            fontSize: 20,
            marginRight: 10,
            color: textColorHistory,
        },
        resultText: {
            fontSize: 35,
            margin: 15,
            color: "#00B9D6",
        },
    });

    // Render GUI
    return (
        <View style={styles.container}>
            <View style={styles.containerResult}>
                <TouchableOpacity
                    style={styles.themeButton}
                    onPress={() => setDarkMode(!darkMode)}
                >
                    <Text style={styles.themeButtonText}>
                        {darkMode ? "☀️" : "🌙"}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.historyText}>{lastNumber}</Text>
                <Text style={styles.resultText}>{currentNumber}</Text>
            </View>
            <View style={styles.containerButton}>
                <View style={styles.containerButtonLeft}>
                    {buttonsLeft.map((row, index) => (
                        <View key={index} style={styles.containerRow}>
                            {row.map((item) => (
                                <TouchableOpacity
                                    key={item}
                                    style={[styles.button, { backgroundColor: bgColorNumber }]}
                                    onPress={() => handleInput(item)}
                                >
                                    <Text style={styles.buttonText}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </View>
                <View style={styles.containerButtonRight}>
                    {buttonsRight.map((item) => (
                        <TouchableOpacity
                            key={item}
                            style={[styles.button, { backgroundColor: bgColorFunction }]}
                            onPress={() => handleInput(item)}
                        >
                            <Text style={[styles.buttonText, { color: "#fff" }]}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default Calculator;