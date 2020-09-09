import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import cssClasses from './Burger.module.css';

const Burger = (props) => {
  return (
    <div className={cssClasses.burger}>
      <BurgerIngredient type="bread-top" />
      <BurgerIngredient type="cheese" />
      <BurgerIngredient type="meat" />
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
