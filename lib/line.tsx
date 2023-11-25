import { React, useEffect, useRef, useState } from 'react';

export default function Line({
    from,
    to,
    rem_thickness,
    color,
    Style,
} : {
    from: any,
    to: any,
    rem_thickness: any,
    color: any,
    Style?: any,
}) {
    const this_element = useRef(null);
    const [window_height, setWindowHeight] = useState(0);
    const [window_width, setWindowWidth] = useState(0);

    function changeSize() {
        const bounding_box = this_element.current.getBoundingClientRect();
        setWindowWidth(bounding_box.width);
        setWindowHeight(bounding_box.height);
        console.log(`${bounding_box.width} !! ${bounding_box.height}`);
    }
    useEffect(() => {
        changeSize();
    })
    useEffect(() => {
        addEventListener('resize', changeSize);
    }, []);

    let swap_cardinity = false;
    if (from[0] > to[0]) {
        if (from[1] <= to[1]) {
            swap_cardinity = true;
        }
        const temp = from;
        from = to;
        to = temp;
    } else {
        if (from[1] > to[1]) {
            swap_cardinity = true;
        }
    }

    const side_indent = window_width * from[0] / 100; 
    const top_indent = window_height * from[1] / 100;
    const adjacent = Math.abs(window_width * (to[0] - from[0]) / 100);
    const opposite = Math.abs(window_height * (to[1] - from[1]) / 100);
    const hypotenuse = Math.sqrt(Math.pow(adjacent, 2) + Math.pow(opposite, 2));
    const incidence = Math.atan(opposite / adjacent);
    const theta = 
        (swap_cardinity) ? 
        "-" + incidence : 
        "" + incidence;
    return (
        <div 
            ref={this_element}
            style={{
                position: `absolute`,
                width: `100%`,
                height: `100%`,
                border: `0rem solid white`,
                padding: `${top_indent}px 0px 0px ${side_indent}px`
            }}
        >
            <div style={{
                position: `absolute`,
                width: `${hypotenuse}px`,
                height: `0px`,
                backgroundColor: `${color}`,
                borderTop: `${rem_thickness/2}rem solid ${color}`,
                borderBottom: `${rem_thickness/2}rem solid ${color}`,
                borderRadius: `3rem`,
                transform: `rotate(${theta}rad)`,
                transformOrigin: `0.0rem ${rem_thickness / 2}rem`,
                margin: `-${rem_thickness / 2}rem 0rem -${rem_thickness / 2}rem -0rem`,
            }}>
            </div>
        </div>
    )
}