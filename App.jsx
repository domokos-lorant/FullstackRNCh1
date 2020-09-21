import React from "react";
import {
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  View,
  StatusBar,
  ActivityIndicator,
  // eslint-disable-next-line import/no-unresolved
} from "react-native";
import { fetchLocationId, fetchWeather } from "./utils/api";

import SearchInput from "./components/SearchInput";
import getImageForWeather from "./utils/getImageForWeather";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34495E",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  detailsContainer: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
    color: "white",
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
});

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      loading: false,
      error: false,
      temperature: 0,
      weather: "",
      time: "",
    };
  }

  componentDidMount() {
    this.handleUpdateLocation("San Francisco");
  }

  handleUpdateLocation = (newLocation) => {
    if (!newLocation) {
      return;
    }

    this.setState({ loading: true }, async () => {
      try {
        const locationId = await fetchLocationId(newLocation);
        const { location, weather, temperature, time } = await fetchWeather(
          locationId
        );

        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature,
          time,
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: false,
        });
      }
    });
  };

  render() {
    const { location, loading, error, weather, temperature, time } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />
            {!loading && (
              <>
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Could not load weather, please try a different city.
                  </Text>
                )}

                {!error && (
                  <>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {location}
                    </Text>
                    <Text style={[styles.smallText, styles.textStyle]}>
                      {weather}
                    </Text>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {`${Math.round(temperature)}°`}
                    </Text>
                    <Text style={[styles.smallText, styles.textStyle]}>
                      {`Local time: ${time}`}
                    </Text>

                    <SearchInput
                      placeholder="Search any city"
                      onSubmit={this.handleUpdateLocation}
                    />
                  </>
                )}
              </>
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}
