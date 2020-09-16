import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import {ShowListNotes} from "./screen/list";
import {AddNewNote} from "./screen/create";
import {EditNote} from "./screen/edit";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="AddNewNote" component={AddNewNote} />
                <Stack.Screen name="ShowListNotes" component={ShowListNotes} />
                <Stack.Screen name="EditNote" component={EditNote} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
