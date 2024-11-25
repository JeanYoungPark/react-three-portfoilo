import React, { useState } from "react";

export const useChestAction = () => {
    const [chestOpen, setChestOpen] = useState(false);

    return { chestOpen, setChestOpen };
};
