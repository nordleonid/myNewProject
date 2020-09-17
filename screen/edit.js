import React, { Component } from 'react';
import {ListView, Text, TextInput, TouchableOpacity, View} from "react-native";
import { styles } from "./styles/styleSheet";


export class EditNote extends Component {

    componentDidMount() {

        return fetch('http://192.168.0.147:8080/api/notes')
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson),
                }, function() {

                });
            })
            .catch((error) => {
                console.error(error);
            });
    }


    constructor(props) {
        super(props)
        this.state = {
            id : this.props.route.params.id,
            title : this.props.route.params.title,
            content : this.props.route.params.content
        }
    }

    componentDidMount(){

        this.setState({

            id : this.props.route.params.id,
            title : this.props.route.params.title,
            content : this.props.route.params.content
        })

    }
    OnSubmitNavigate(){
        this.props.navigation.navigate('ShowListNotes');
    }

    static titleOptions = { title: 'Edit Note' };

    UpdateNote = () =>{

        fetch('http://192.168.0.147:8080/api/notes/' + this.props.route.params.id, {
            method: 'PUT',
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

        this.OnSubmitNavigate()

    }


    DeleteNote = () =>{

        fetch('http://192.168.0.147:8080/api/notes/' + this.props.route.params.id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).catch((error) => {
            console.error(error);
        });

        this.OnSubmitNavigate()

    }

    render() {

        return (

            <View style={styles.MainContainer}>

                <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Edit Note </Text>

                <TextInput

                    placeholder=''

                    value={this.state.title}

                    onChangeText={ TextInputValue => this.setState({ title : TextInputValue }) }

                    underlineColorAndroid='transparent'

                    style={styles.TextInputStyleClass}
                />

                <TextInput

                    placeholder="Note Content"

                    value={this.state.content}

                    onChangeText={ TextInputValue => this.setState({ content : TextInputValue }) }

                    underlineColorAndroid='transparent'

                    style={styles.TextInputStyleClass}
                />

                <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.UpdateNote} >

                    <Text style={styles.TextStyle}> UPDATE NOTE </Text>

                </TouchableOpacity>

                <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.DeleteNote} >

                    <Text style={styles.TextStyle}> DELETE NOTE </Text>

                </TouchableOpacity>


            </View>

        );
    }

}
