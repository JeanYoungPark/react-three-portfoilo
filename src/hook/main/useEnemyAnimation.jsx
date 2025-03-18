import { useEffect, useState } from "react";
import { LoopOnce } from "three";

export const useEnemyAnimation = (actions, mixer) => {
    const [anim, setAnim] = useState("Idle");

    useEffect(() => {
        if (!anim || !actions) return;

        // 현재 실행 중인 모든 애니메이션 페이드아웃
        Object.values(actions).forEach((action) => action.fadeOut(0.2).stop());

        const currentAction = actions[`EnemyArmature|EnemyArmature|EnemyArmature|${anim}`];
        if (!currentAction) return;

        const randomTimeScale = Math.random() * 1.5;
        mixer.timeScale = randomTimeScale;
        currentAction.fadeIn(0.2).play();

        // Jump_Start 애니메이션 처리
        if (anim !== "Idle") {
            if (anim === "Death" || anim === "HitRecieve") {
                currentAction.repetitions = 1;
            } else {
                currentAction.repetitions = 2;
            }

            currentAction.setLoop(LoopOnce);
            currentAction.clampWhenFinished = true;
        }

        const onFinish = () => {
            if (anim === "Death") {
                setAnim("Death");
                mixer.removeEventListener("finished", onFinish);
            } else {
                setAnim("Idle");
                mixer.removeEventListener("finished", onFinish);
            }
        };

        mixer.addEventListener("finished", onFinish);

        return () => currentAction.stop();
    }, [actions, anim, mixer]);

    return { anim, setAnim };
};
