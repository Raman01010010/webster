import React from 'react';
import { ReactionBarSelector } from '@charkour/react-reactions';
import { FacebookCounter } from '@charkour/react-reactions';
export const Reactions = () => {
  return <ReactionBarSelector reactions={[{label: "like", node: <div>👍</div>, key: "like"},{label: "congrats", node: <div>🎉</div>, key: "congrats"},{label: "Celebrate", node: <div>🎊</div>, key: "Celebrate"},{label: "Love", node: <div>💓</div>, key: "Love"}]} />;
};


export  const Counter = () => {
  return <FacebookCounter />;
};