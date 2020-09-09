import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import cssClasses from './Burger.module.css';

const Burger = (props) => {
  const ingredientComponents = Object.entries(props.ingredients).flatMap(([ingName, amount]) =>
    [...Array(amount)].map((x, i) => <BurgerIngredient key={ingName + i} type={ingName} />)
  );

  return (
    <div className={cssClasses.burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientComponents.length ? ingredientComponents : <p>Please start adding ingredients</p>}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
