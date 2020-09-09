import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import cssClasses from './Burger.module.css';

const Burger = (props) => {
  // return array of arrays is acceptable
  const ingredientComponents = Object.entries(props.ingredients).map(([ingName, amount]) =>
    [...Array(amount)].map((x, i) => <BurgerIngredient key={ingName + i} type={ingName} />)
  );

  return (
    <div className={cssClasses.burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientComponents}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
