import { useEffect, useState } from "react";

export const useCharacterAnimation = (actions, mixer) => {
    const [anim, setAnim] = useState("Idle");

    useEffect(() => {
        if (!anim || !actions) return;

        // 현재 실행 중인 모든 애니메이션 페이드아웃
        Object.values(actions).forEach((action) => action.fadeOut(0.2).stop());

        const currentAction = actions[`CharacterArmature|CharacterArmature|CharacterArmature|${anim}`];
        if (!currentAction) return;

        currentAction.fadeIn(0.2).play();

        if (anim !== "Idle" && anim !== "Walk" && anim !== "Run") {
            currentAction.setLoop(false);
            currentAction.clampWhenFinished = true;
            currentAction.repetitions = 1;
        }

        const onFinish = () => {
            setAnim("Idle");
            mixer.removeEventListener("finished", onFinish);
        };

        mixer.addEventListener("finished", onFinish);

        return () => currentAction.stop();
    }, [actions, anim, mixer]);

    return { anim, setAnim };
};
