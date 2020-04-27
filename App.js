import React, {useState, useRef} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
} from 'react-spring';
import data from './data';

const AnimatedView = animated(View);
const AnimatedTouchableOpacity = animated(TouchableOpacity);

export default function App() {
  const [open, set] = useState(true);

  const springRef = useRef();
  const {width, height, backgroundColor} = useSpring({
    ref: springRef,
    config: config.stiff,
    from: {width: '30%', height: '15%', backgroundColor: 'hotpink'},
    to: {
      width: open ? '100%' : '30%',
      height: open ? '100%' : '15%',
      backgroundColor: open ? 'white' : 'hotpink',
    },
  });

  const transRef = useRef();
  const transitions = useTransition(open ? data : [], item => item.name, {
    ref: transRef,
    unique: true,
    trail: 400 / data.length,
    from: {opacity: 0, backgroundColor: 'white'},
    enter: {opacity: 1, backgroundColor: 'green'},
    leave: {opacity: 0, backgroundColor: 'white'},
  });

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(open ? [springRef, transRef] : [transRef, springRef], [
    0,
    open ? 0.1 : 0.6,
  ]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <AnimatedTouchableOpacity
        style={{
          backgroundColor,
          width,
          height,
          borderRadius: 5,
        }}
        onPress={() => set(open => !open)}>
        <AnimatedView
          style={{
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            top: 200,
          }}>
          {transitions.map(({item, key, props}) => (
            <AnimatedView
              key={key}
              style={{
                ...props,
                width: 70,
                height: 70,
                margin: 5,
                borderRadius: 5,
              }}
            />
          ))}
        </AnimatedView>
      </AnimatedTouchableOpacity>
    </View>
  );
}
