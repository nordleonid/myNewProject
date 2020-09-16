import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View} from "react-native";
import { styles } from "./styles/styleSheet";


export class AddNewNote extends Component {

    static titleOptions =
        {
            title: 'Add New Note',
        };

    constructor(props) {

        super(props)

        this.state = {

            title: '',
            content: ''

        }

    }

    Add_Note_To_Server = () =>{

        fetch('http://localhost:8080/api/notes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title : this.state.title,
                content : this.state.content
            })

        }).catch((error) => {
            console.error(error);
        });

    }

    Show_List_Notes = () =>
    {
        this.props.navigation.navigate('ShowListNotes');

    }

    render() {
        return (

            <View style={styles.MainContainer}>


                <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Add new note </Text>

                <TextInput

                    placeholder="title"

                    onChangeText={ TextInputValue => this.setState({ title : TextInputValue }) }

                    underlineColorAndroid='transparent'

                    style={styles.TextInputStyleClass}
                />

                <TextInput

                    placeholder="content"

                    onChangeText={ TextInputValue => this.setState({ content : TextInputValue }) }

                    underlineColorAndroid='transparent'

                    style={styles.TextInputStyleClass}
                />

                <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.Add_Note_To_Server} >

                    <Text style={styles.TextStyle}> Send Data </Text>

                </TouchableOpacity>

                <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.Show_List_Notes} >

                    <Text style={styles.TextStyle}> Show List Of Notes </Text>

                </TouchableOpacity>


            </View>

        );
    }
}
