import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#666',
    height: 40,
    marginTop: 20,
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    color: 'white',
    flex: 1,
  },
});

const defaultState = {text: ''};

// eslint-disable-next-line react/prefer-stateless-function
export default class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  handleChangeText = (text) => {
    this.setState({text});
  }

  handleSubmitEditing = () => {
    const {onSubmit} = this.props;
    const {text} = this.state;

    if (!text) {
      return;
    }

    onSubmit(text);
    this.setState(defaultState);
  }

  render() {
    const {placeholder} = this.props;
    const {text} = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          autoCorrect={false}
          value={text}
          placeholder={placeholder}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          style={styles.textInput}
          clearButtonMode="always"
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmitEditing}
        />
      </View>
    );
  }
}
