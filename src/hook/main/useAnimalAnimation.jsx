import { useEffect, useState } from "react";

export const useAnimalAnimation = (actions, mixer) => {
    const [anim, setAnim] = useState("Idle");

    useEffect(() => {
        if (!anim || !actions) return;

        // 현재 실행 중인 모든 애니메이션 페이드아웃
        Object.values(actions).forEach((action) => action.fadeOut(0.2).stop());

        const currentAction = actions[`AnimalArmature|AnimalArmature|AnimalArmature|${anim}`];
        if (!currentAction) return;

        const randomTimeScale = Math.random() * 1.5;
        mixer.timeScale = randomTimeScale;
        currentAction.fadeIn(0.2).play();

        // Jump_Start 애니메이션 처리
        if (anim !== "Idle") {
            currentAction.setLoop(false);
            currentAction.clampWhenFinished = true;
            currentAction.repetitions = 2;
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
