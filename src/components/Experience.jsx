import { FirstScene } from "./FirstScene";
import { SecondScene } from "./SecondScene";
import { ThirdScene } from "./ThirdScene";

export const Experience = ({ rb, position }) => {
    return (
        <group position={position}>
            <FirstScene />
            <SecondScene position={[-4, -20, 30]} />
            <ThirdScene position={[36, -40, 22]} rb={rb} />
        </group>
    );
};
