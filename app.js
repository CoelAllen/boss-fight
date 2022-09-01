// @ts-nocheck

const heroes = [
  {
    name: "jimbob",
    damage: 8,
    gold: 0,
    potion: 1,
    maxHitPoints: 100,
    hitPoints: 100,
  },
  {
    name: "duke",
    damage: 10,
    gold: 0,
    potion: 0,
    maxHitPoints: 150,
    hitPoints: 150,
  },
];

const boss = {
  name: "Minos",
  damage: 2,
  hitPoints: 200,
  maxHitPoints: 200,
  level: 1,
};

function damageBoss() {
  for (let hero of heroes) {
    if (hero.hitPoints > 0) {
      boss.hitPoints -= hero.damage;
      changeHealthBar();
    }
    if (boss.hitPoints <= 0) {
      getPaid();
      levelUpBoss();
    }
  }
  // NOTE insert level up code

  console.log("boss got hit", boss.hitPoints);
}

// combines hero.damage and lowers boss.health onclick NOTE remember to stop at 0hp

function damagePlayer() {
  for (const hero of heroes) {
    hero.hitPoints -= boss.damage;
    if (hero.hitPoints < 0) {
      hero.hitPoints = 0;
    }
    console.log(hero.hitPoints);
    document.getElementById(`${hero.name}-health`).innerText = hero.hitPoints;
  }
}
// probably use some interval so damage is done automatically NOTE remember to stop at 0hp
function getPaid() {
  for (const hero of heroes) {
    hero.gold += boss.level * 10;
    document.getElementById(`${hero.name}-gold`).innerText = hero.gold;
    console.log;
  }
}
// #region
function usePotion(name) {
  let hero = heroes.find((hero) => hero.name == name);
  if (hero.potion > 0 && hero.hitPoints > 0) {
    hero.hitPoints = hero.maxHitPoints;
    hero.potion--;
    document.getElementById(`${hero.name}-health`).innerText = hero.hitPoints;
    document.getElementById(`${hero.name}-potion`).innerText = hero.potion;
    // NOTE draw potion decrease
    console.log("potion used");
  }
}
function levelUpBoss() {
  boss.level++;
  boss.damage++;
  boss.maxHitPoints *= 1.25;
  boss.hitPoints = boss.maxHitPoints;
}
function buyPotion() {
  for (const hero of heroes) {
    if (hero.gold >= 20) {
      hero.gold -= 20;
      hero.potion++;
      document.getElementById(`${hero.name}-potion`).innerText = hero.potion;
      document.getElementById(`${hero.name}-gold`).innerText = hero.gold;
    }
  }
}

function resetGame() {
  boss.damage = 2;
  boss.level = 1;
  boss.hitPoints = 200;
  boss.maxHitPoints = 200;
  console.log(boss.level);

  for (const hero of heroes) {
    hero.hitPoints = hero.maxHitPoints;
    hero.gold = 0;
    hero.potion = 0;
  }
  changeHealthBar();
}
// #endregion
// probably linked to health = 0, increases hp and damage

function changeHealthBar() {
  let healthPercentage = (boss.hitPoints / boss.maxHitPoints) * 100;
  document.getElementById(
    "maxHealthBar"
  ).innerHTML = `<div id="currentHealthBar" style="width: ${healthPercentage}%; background-color: "></div>`;
  document.getElementById(
    "red-filter"
  ).style.backgroundColor = `rgba(255, 0, 0, ${
    (100 - healthPercentage) / 100
  })`;
}

// buyHealth(){}
// maybe a separate button that changes an array quantity, add "potion" as array quantity

setInterval(damagePlayer, 1000);
