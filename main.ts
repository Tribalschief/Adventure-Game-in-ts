#!/usr/bin/env node

import inquirer from "inquirer";

const welcome = () => {
    console.log("Welcome to Dungeon");
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
};

welcome();

let num:number = Math.random() * 10
// Game Variable
let  enemies:string[]=["skeleton","zombie","Warrior","Assassin"]
let maxEnemiesHealth:number = 75
let enemyAttackDamage:number = 25     
// Player Variable
let health:number = 100
let attackDamage:number = 50
let numHealthPotions = 3
let healthPotionHealAmount = 30
let healthPotionDropChance = 50
async function askQuestion() {
   
  let enemyHealth = Math.floor(Math.random() * maxEnemiesHealth) + 1
  let enemy :string = enemies[Math.floor(Math.random() * enemies.length)]
  console.log(`\t ${enemy} has appeared!\n`)
  while(enemyHealth > 0){
    console.log(`\t Your HP: ${health}\n`)
    console.log(`\t ${enemy} Hp: ${enemyHealth}\n`)
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "input",
            message: "What would you like to do",
            choices : ["Attack", "Drink Health Potion", "Run"]
        }
    ])
    switch(answers.input){
        case "Attack":
            let damageDealt:number = Math.floor(Math.random() * attackDamage) + 1
            let damageTaken:number = Math.floor(Math.random() * enemyAttackDamage) + 1
            enemyHealth -= damageDealt 
            health -= damageTaken;           
            console.log(`\t You Strike the ${enemy} for ${damageDealt} damage`)
            console.log(`\t you recieve ${damageTaken} in retaliation`)
            if(health < 1){
                console.log(`\t You have taken too much damage you are too weak to go on !`)
                break;
            }
            if(enemyHealth<0){
                console.log(`\t# ${enemy} was defeated! #\n`)
            }

            break
        case "Drink Health Potion":
            if(numHealthPotions > 0){
                health += healthPotionHealAmount;
                numHealthPotions--;
                console.log(`\t You drink a health potion, healing yourself ${healthPotionHealAmount} . \n\t now you have ${health} HP. \n\t now you have ${numHealthPotions} health potions left`)
            } else {
                console.log(`you have no health Potion left`)
            }
            break;
        case "Run":
            console.log(`You run away`)
            return;
        }
    if(health < 1){
        console.log('You are limp out of the dungeon, weak from battle')
        break;
    }
    console.log(`-----------------------------------------------------`)
    
    console.log(`\tYou have ${health} HP left\n.`)
    if(Math.floor(Math.random() * 100) < healthPotionDropChance){
        numHealthPotions++;
        console.log(`\tThe ${enemy} dropped a health potion! #\n`)
        console.log(`\tYou now have ${numHealthPotions} health potions\n`)
    }
    console.log(`\n-----------------------------------------------------`)
  }
  
}

async function repeatedly() {
    do {
        await askQuestion();
        var action = await inquirer.prompt([
            {
                type: "list",
                name: "input",
                message: "What would you like to do",
                choices : ["Continue Fighting", "Exit Dungeon"]
            }
        ])
        switch(action.input){
            case "Continue Fighting":
                console.log(`You continue on your adventure`)
                break;
            case "Exit dungeon":
                console.log(`You exit the dungeon, successfully from your adventure`)
                break;
        }
    } while(action.input === 'Continue Fighting');
    console.log(`##############################`)
      console.log(`Thanks for playing`)
      console.log(`###############################`)
}

await repeatedly();