import React, { Component } from 'react';
import {ActivityIndicator, ListView, Text, View} from "react-native";
import { styles } from "./styles/styleSheet";


export class ShowListNotes extends Component {

    constructor(props) {

        super(props);

        this.state = {

            isLoading: true

        }
    }

    static titleOptions = { title: 'list of notes' };

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

    GetNoteID=(id, title, content)=>{

        this.props.navigation.navigate('EditNote', {
            id : id,
            title : title,
            content : content
        });

    }


    ListViewItem = () => {
        return (
            <View
                style={{
                    height: .5,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (

            <View style={styles.MainContainer_For_List_Of_Notes}>

                <ListView

                    dataSource={this.state.dataSource}
                    renderSeparator= {this.ListViewItem}
                    renderRow={ (rowData) => <Text style={styles.rowViewContainer}
                                                   onPress={this.GetNoteID.bind(
                                                       this, rowData.id,
                                                       rowData.title,
                                                       rowData.content
                                                   )} >
                        {rowData.title}
                        {rowData.content}
                    </Text> }

                />

            </View>
        );
    }

}
