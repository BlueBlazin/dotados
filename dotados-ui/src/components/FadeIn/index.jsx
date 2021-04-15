import React from "react";
import { useSpring, animated } from "react-spring";

function FadeIn({ children, mass }) {
  const props = useSpring({
    config: { mass },
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return <animated.div style={props}>{children}</animated.div>;
}

export default FadeIn;
