    import React from "react";
    import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
    import { MaterialIcons } from '@expo/vector-icons';
 
    const EtpList = [
    {
        Title: "Select your company",
        Etp: ["Amazon", "Apple", "Facebook", "Google", "Microsoft", "Netflix", "Twitter", "Uber", "Yahoo"],
    },
    ];

    const App = () => {
    const handleCompanySelection = (company) => {
        console.log(`User selected ${company}`);
        
    
    }

   
    return (
        <View style={styles.container}>
        <ScrollView>
            <View style={styles.content}>
            <Text style={styles.title}>StockManager!</Text>
            <Text style={styles.subtitle}>Select your company</Text>
            <View style={styles.etpContainer}>
                
                {EtpList[0].Etp.map((company) => (
                <TouchableOpacity

                    key={company}
                    onPress={() => handleCompanySelection(company)}
                    
                    style={styles.etpButton}
                >
                    <View style={styles.etpTile}>
                    <Text style={styles.text}>{company}</Text>
                    <MaterialIcons name="chevron-right" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                ))}
            </View>
            </View>
            
        </ScrollView>
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    content: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
        marginTop: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
        marginTop: 20,
    },
    etpContainer: {
        marginTop: 20,
        alignItems: "center",
    },
    etpButton: {
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 10,
    },
    etpTile: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: 300,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        textAlign: "left",
    },
    });

    export default App;
