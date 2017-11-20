import React from 'react';
import PropTypes from 'prop-types';
import { Image, ActivityIndicator, View, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';

class SquareImage extends React.Component {
  static propTypes = {
    isShowActivity: PropTypes.bool,
  };

  static defaultProps = {
    isShowActivity: true,
	};

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isError: false
    };
  }

  onError(){
    this.setState({
      isError: true
    });
  }

  onLoad(){
    this.setState({
      isLoaded: true
    });    
  }

  render() {
    const {
      style, source, resizeMode, borderRadius, backgroundColor, children,
      loadingStyle, placeholderSource, placeholderStyle,
      customImagePlaceholderDefaultStyle, onPress, radius, borderColor, circleBorderWidth, circleColor, disabled
    } = this.props;

    const styles = {
      view: {
        alignItems: 'center', 
      },
      circle: {
        width: radius*2,
        height: radius*2,
        borderRadius: radius,
        overflow: 'hidden',
      },
      fixCircleClipping: {
        position: 'absolute',
        top: -radius,
        bottom: -radius,
        right: -radius,
        left: -radius,
        borderRadius: radius + radius/2,
        borderWidth: radius,
        borderColor: borderColor || 'white',
      },
      border: {
        position: 'absolute',
        width: radius*2,
        height: radius*2,
        borderRadius: radius,
        borderWidth: circleBorderWidth || 0 ,
        borderColor: circleColor || 'transparent',
      },
      backgroundImage: {
        position: 'relative',
        width: radius*2,
        height: radius*2
      },
      activityIndicator: {
        position: 'absolute',
        margin: 'auto',
        zIndex: 9,
      },
      viewImageStyles: {
        flex: 1,
        backgroundColor: '#e9eef1',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
      },
      imagePlaceholderStyles: {
        width: radius*2,
        height: radius*2
      },
      viewChildrenStyles: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        backgroundColor: 'transparent'
      }
    }

    return(
      <TouchableWithoutFeedback onPress={ onPress }>
        <View style={styles.view}>
          <FastImage
            onError={this.onError.bind(this)}
            onLoad={this.onLoad.bind(this)}
            style={[styles.backgroundImage, style]}
            source={source}
            resizeMode={resizeMode}
            borderRadius={borderRadius}
          >
          </FastImage>
          { !this.state.isLoaded &&
          <View 
            style={styles.viewImageStyles}
          >
            {
              (this.props.isShowActivity && !this.state.isError) &&
              <ActivityIndicator
                style={styles.activityIndicator}
                size={loadingStyle ? loadingStyle.size : 'small'}
                color={loadingStyle ? loadingStyle.color : 'gray'}
              />
            }
            <Image
              style={placeholderStyle ? placeholderStyle : [styles.imagePlaceholderStyles, customImagePlaceholderDefaultStyle]}
              source={placeholderSource ? placeholderSource : require('./Images/empty-image.png')}
            >
            </Image>
          </View>
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default SquareImage;
