"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
function Line({ from, to, rem_thickness, color, }) {
    const this_element = (0, react_1.useRef)(null);
    const [window_height, setWindowHeight] = (0, react_1.useState)(0);
    const [window_width, setWindowWidth] = (0, react_1.useState)(0);
    function changeSize() {
        const bounding_box = this_element.current.getBoundingClientRect();
        setWindowWidth(bounding_box.width);
        setWindowHeight(bounding_box.height);
    }
    (0, react_1.useEffect)(() => {
        changeSize();
    });
    (0, react_1.useEffect)(() => {
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
    }
    else {
        if (from[1] > to[1]) {
            swap_cardinity = true;
        }
    }
    const side_indent = window_width * from[0] / 100;
    const top_indent = window_height * from[1] / 100;
    console.log(`WINDOW HEIGHT: ${window_height}`);
    const adjacent = Math.abs(window_width * (to[0] - from[0]) / 100);
    const opposite = Math.abs(window_height * (to[1] - from[1]) / 100);
    const hypotenuse = Math.sqrt(Math.pow(adjacent, 2) + Math.pow(opposite, 2));
    const incidence = Math.atan(opposite / adjacent);
    const theta = (swap_cardinity) ?
        "-" + incidence :
        "" + incidence;
    return (react_1.default.createElement("div", { ref: this_element, style: {
            position: `absolute`,
            width: `100%`,
            height: `100%`,
            border: `0rem solid white`,
        } },
        react_1.default.createElement("div", { style: {
                position: `absolute`,
                width: `${hypotenuse}px`,
                height: `0px`,
                backgroundColor: `${color}`,
                borderTop: `${rem_thickness / 2}rem solid ${color}`,
                borderBottom: `${rem_thickness / 2}rem solid ${color}`,
                borderRadius: `3rem`,
                transform: `translate(${side_indent}px, ${top_indent}px) rotate(${theta}rad)`,
                transformOrigin: `0.0rem ${rem_thickness / 2}rem`,
                margin: `-${rem_thickness / 2}rem 0rem -${rem_thickness / 2}rem -0rem`,
            } })));
}
exports.default = Line;
//# sourceMappingURL=line.js.map